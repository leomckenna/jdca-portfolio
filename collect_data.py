#!/usr/bin/env python3
"""
JDCA Portfolio — Full Data Collector
======================================
Pulls all available Yahoo Finance data for every portfolio holding and exports
to a multi-sheet Excel workbook.

TIME HORIZON
  Daily prices, dividends, and splits are filtered to [START_DATE, END_DATE].
  Quarterly/annual financials always reflect the most recent filings regardless
  of the date range.

Default: most recent quarter (~90 calendar days ending today).

Usage:
    python collect_data.py                                  # default: last 90 days
    python collect_data.py --start 2026-01-01 --end 2026-03-31
    python collect_data.py --start 2025-01-01 --end 2025-12-31 --out 2025_annual.xlsx

Output sheets
    Info & Ratios       — snapshot of every .info field Yahoo Finance returns
    Daily Prices        — OHLCV + Adj Close + raw Dividends + Split columns
    Dividends           — only days where a dividend was paid (with close price)
    Stock Splits        — only days where a split occurred (with ratio)
    Income Stmt (Q)     — last 4 quarters, all tickers stacked
    Balance Sheet (Q)   — last 4 quarters, all tickers stacked
    Cash Flow (Q)       — last 4 quarters, all tickers stacked

Requirements:
    pip install yfinance pandas openpyxl
"""

import argparse
import warnings
from datetime import datetime, timedelta

import pandas as pd
import yfinance as yf
from openpyxl import load_workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

warnings.filterwarnings("ignore")

# ── PORTFOLIO TICKERS ────────────────────────────────────────────────────────
TICKERS = [
    "LLY", "NVO", "SNY", "VRTX", "OTSKY",
    "CRSP", "SANA", "EVO", "LCTX", "HUMA",
    "GNPX", "IPSC", "SABS", "SEOVF", "NCEL",
    "FLUI.ST", "NXTCL.ST", "IMCR", "CELZ", "ELDN",
    "ADOC.PA", "XLV",
]

# ── TIME HORIZON ─────────────────────────────────────────────────────────────
# Edit here, or pass --start / --end on the command line.
DEFAULT_END   = datetime.today()
DEFAULT_START = DEFAULT_END - timedelta(days=90)   # ~1 quarter
# ─────────────────────────────────────────────────────────────────────────────


# ── HELPERS ──────────────────────────────────────────────────────────────────

def strip_tz(index):
    """Return a tz-naive DatetimeIndex (safe for both tz-aware and naive inputs)."""
    if isinstance(index, pd.DatetimeIndex):
        return index.tz_convert(None) if index.tz is not None else index
    return index


def strip_tz_df(df: pd.DataFrame) -> pd.DataFrame:
    """Strip timezone from every datetime column in a DataFrame."""
    df = df.copy()
    for col in df.columns:
        if pd.api.types.is_datetime64_any_dtype(df[col]):
            try:
                if df[col].dt.tz is not None:
                    df[col] = df[col].dt.tz_convert(None)
            except Exception:
                pass
    if isinstance(df.index, pd.DatetimeIndex) and df.index.tz is not None:
        df.index = df.index.tz_convert(None)
    return df


def flatten_info(ticker: str, info: dict) -> dict:
    """Flatten all scalar-valued fields from yf.Ticker.info into one dict."""
    row = {"Ticker": ticker}
    # Key fields first so they appear in a useful order
    priority = [
        "shortName", "longName", "sector", "industry", "country", "currency",
        "exchange", "quoteType", "marketCap", "enterpriseValue",
        "currentPrice", "previousClose", "open", "dayLow", "dayHigh",
        "fiftyTwoWeekLow", "fiftyTwoWeekHigh", "fiftyDayAverage", "twoHundredDayAverage",
        "volume", "averageVolume", "averageVolume10days",
        "trailingPE", "forwardPE", "priceToBook", "priceToSalesTrailing12Months",
        "trailingEps", "forwardEps", "bookValue",
        "dividendRate", "dividendYield", "exDividendDate", "payoutRatio",
        "fiveYearAvgDividendYield", "trailingAnnualDividendRate",
        "lastSplitFactor", "lastSplitDate",
        "beta", "shortRatio", "shortPercentOfFloat",
        "heldPercentInsiders", "heldPercentInstitutions",
        "sharesOutstanding", "sharesFloat", "impliedSharesOutstanding",
        "totalRevenue", "revenuePerShare", "revenueGrowth",
        "grossProfits", "grossMargins", "operatingMargins", "profitMargins", "ebitdaMargins",
        "ebitda", "operatingCashflow", "freeCashflow",
        "totalCash", "totalCashPerShare", "totalDebt", "debtToEquity",
        "returnOnAssets", "returnOnEquity",
        "earningsGrowth", "earningsQuarterlyGrowth",
        "currentRatio", "quickRatio",
        "targetHighPrice", "targetLowPrice", "targetMeanPrice", "targetMedianPrice",
        "recommendationKey", "numberOfAnalystOpinions",
        "overallRisk", "auditRisk", "boardRisk", "compensationRisk", "shareHolderRightsRisk",
        "fullTimeEmployees", "website", "longBusinessSummary",
    ]
    seen = set()
    for k in priority:
        if k in info:
            v = info[k]
            if isinstance(v, (int, float, str, bool, type(None))):
                row[k] = v
                seen.add(k)
    # Remaining scalar fields in alphabetical order
    for k in sorted(info.keys()):
        if k not in seen:
            v = info[k]
            if isinstance(v, (int, float, str, bool, type(None))):
                row[k] = v
    return row


def fmt_sheet(ws, max_col_width: int = 55):
    """Apply header style, freeze top row, and auto-fit column widths."""
    fill  = PatternFill("solid", fgColor="1A2C4E")
    hfont = Font(bold=True, color="FFFFFF", size=9)
    bfont = Font(size=9)
    for cell in ws[1]:
        cell.fill      = fill
        cell.font      = hfont
        cell.alignment = Alignment(wrap_text=False, horizontal="center")
    for row in ws.iter_rows(min_row=2):
        for cell in row:
            cell.font = bfont
    ws.freeze_panes = "B2"
    for col in ws.columns:
        letter  = get_column_letter(col[0].column)
        max_len = max(
            (len(str(c.value)) for c in col if c.value is not None),
            default=8,
        )
        ws.column_dimensions[letter].width = min(max_len + 2, max_col_width)


# ── DATA COLLECTORS ───────────────────────────────────────────────────────────

def collect_daily(
    tickers: list[str], start: str, end: str
) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """
    Fetch daily OHLCV + Adj Close + Dividends + Stock Splits for every ticker.

    Returns
        daily   — one row per (Ticker, Date)
        divs    — rows where a dividend was paid (subset of daily)
        splits  — rows where a split occurred   (subset of daily)
    """
    all_daily, all_divs, all_splits = [], [], []

    for tkr in tickers:
        print(f"  {tkr}...", end=" ", flush=True)
        try:
            raw = yf.Ticker(tkr).history(
                start=start,
                end=end,
                interval="1d",
                auto_adjust=False,   # keep raw Close + separate Adj Close
                actions=True,        # embed Dividends and Stock Splits columns
            )
            if raw is None or raw.empty:
                print("no data")
                continue

            raw.index = strip_tz(raw.index)
            raw.index.name = "Date"
            raw = raw.reset_index()
            raw.insert(0, "Ticker", tkr)

            raw.rename(columns={
                "Adj Close":    "Adj_Close",
                "Dividends":    "Dividend",
                "Stock Splits": "Split_Ratio",
            }, inplace=True)

            for c in ("Dividend", "Split_Ratio"):
                if c not in raw.columns:
                    raw[c] = 0.0

            # Keep only recognised columns in a defined order
            keep = ["Ticker","Date","Open","High","Low","Close","Adj_Close",
                    "Volume","Dividend","Split_Ratio"]
            raw = raw[[c for c in keep if c in raw.columns]]

            all_daily.append(raw)

            # Dividends sub-table
            divs = raw[raw["Dividend"] > 0][
                ["Ticker","Date","Dividend","Close","Adj_Close"]
            ].copy()
            divs.rename(columns={"Dividend": "Dividend_Per_Share"}, inplace=True)
            if not divs.empty:
                all_divs.append(divs)

            # Splits sub-table
            spl = raw[raw["Split_Ratio"] != 0][
                ["Ticker","Date","Split_Ratio","Close"]
            ].copy()
            if not spl.empty:
                all_splits.append(spl)

            n_rows = len(raw)
            n_divs = (raw["Dividend"] > 0).sum()
            n_spl  = (raw["Split_Ratio"] != 0).sum()
            print(f"{n_rows} trading days | {n_divs} dividend(s) | {n_spl} split(s)")

        except Exception as exc:
            print(f"ERROR — {exc}")

    def cat(lst): return pd.concat(lst, ignore_index=True) if lst else pd.DataFrame()
    return cat(all_daily), cat(all_divs), cat(all_splits)


def collect_info(tickers: list[str]) -> pd.DataFrame:
    """Fetch snapshot .info dict for every ticker and flatten to a DataFrame."""
    rows = []
    for tkr in tickers:
        print(f"  {tkr}...", end=" ", flush=True)
        try:
            info = yf.Ticker(tkr).info or {}
            rows.append(flatten_info(tkr, info))
            print(f"{len(info)} fields")
        except Exception as exc:
            rows.append({"Ticker": tkr})
            print(f"ERROR — {exc}")
    return pd.DataFrame(rows)


def collect_financials(
    tickers: list[str]
) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """
    Fetch the last 4 quarters of income statement, balance sheet, and cash flow
    for every ticker.  Returns three stacked DataFrames (one row = one quarter).
    """
    inc_all, bal_all, cf_all = [], [], []

    statements = [
        ("quarterly_income_stmt",   inc_all, "Income"),
        ("quarterly_balance_sheet", bal_all, "Balance"),
        ("quarterly_cashflow",      cf_all,  "CashFlow"),
    ]

    for tkr in tickers:
        print(f"  {tkr}...", end=" ", flush=True)
        t = yf.Ticker(tkr)
        parts = []
        for attr, store, label in statements:
            try:
                df = getattr(t, attr, None)
                if df is None or df.empty:
                    continue
                # yfinance returns: rows = metrics, cols = quarter-end dates
                df_t = df.T.copy()
                df_t.index = strip_tz(df_t.index)
                df_t.index.name = "Quarter_End"
                df_t = df_t.reset_index()
                df_t.insert(0, "Ticker", tkr)
                for col in df_t.columns:
                    if col not in ("Ticker", "Quarter_End"):
                        df_t[col] = pd.to_numeric(df_t[col], errors="coerce")
                store.append(df_t)
                parts.append(f"{label}({len(df_t)}Q)")
            except Exception as exc:
                parts.append(f"{label}(err:{exc})")
        print(", ".join(parts) if parts else "no financials")

    def cat(lst): return pd.concat(lst, ignore_index=True) if lst else pd.DataFrame()
    return cat(inc_all), cat(bal_all), cat(cf_all)


# ── EXCEL WRITER ──────────────────────────────────────────────────────────────

EMPTY_DIVS   = pd.DataFrame(columns=["Ticker","Date","Dividend_Per_Share","Close","Adj_Close"])
EMPTY_SPLITS = pd.DataFrame(columns=["Ticker","Date","Split_Ratio","Close"])


def write_excel(
    path: str,
    daily:    pd.DataFrame,
    divs:     pd.DataFrame,
    splits:   pd.DataFrame,
    info:     pd.DataFrame,
    income:   pd.DataFrame,
    balance:  pd.DataFrame,
    cashflow: pd.DataFrame,
) -> None:
    sheets = [
        ("Info & Ratios",     info),
        ("Daily Prices",      daily),
        ("Dividends",         divs   if divs   is not None and not divs.empty   else EMPTY_DIVS),
        ("Stock Splits",      splits if splits is not None and not splits.empty else EMPTY_SPLITS),
        ("Income Stmt (Q)",   income),
        ("Balance Sheet (Q)", balance),
        ("Cash Flow (Q)",     cashflow),
    ]

    with pd.ExcelWriter(
        path,
        engine="openpyxl",
        date_format="YYYY-MM-DD",
        datetime_format="YYYY-MM-DD",
    ) as writer:
        for name, df in sheets:
            if df is None or not isinstance(df, pd.DataFrame):
                continue
            df = strip_tz_df(df)
            df.to_excel(writer, sheet_name=name, index=False)

    # Apply formatting after the file is written
    wb = load_workbook(path)
    for ws in wb.worksheets:
        fmt_sheet(ws)
    wb.save(path)


# ── MAIN ──────────────────────────────────────────────────────────────────────

def parse_args():
    p = argparse.ArgumentParser(
        description="Collect Yahoo Finance data for the JDCA portfolio"
    )
    p.add_argument("--start", default=None,
                   help="Start date YYYY-MM-DD  (default: 90 days ago)")
    p.add_argument("--end",   default=None,
                   help="End date   YYYY-MM-DD  (default: today)")
    p.add_argument("--out",   default=None,
                   help="Output .xlsx filename  (auto-generated if omitted)")
    return p.parse_args()


def main():
    args  = parse_args()
    start = datetime.strptime(args.start, "%Y-%m-%d") if args.start else DEFAULT_START
    end   = datetime.strptime(args.end,   "%Y-%m-%d") if args.end   else DEFAULT_END

    # yfinance end date is exclusive, so add one day
    start_str = start.strftime("%Y-%m-%d")
    end_str   = (end + timedelta(days=1)).strftime("%Y-%m-%d")

    outfile = args.out or (
        f"jdca_data_{start.strftime('%Y%m%d')}_to_{end.strftime('%Y%m%d')}.xlsx"
    )

    print("=" * 62)
    print("JDCA Portfolio Data Collector")
    print(f"Period  : {start_str} → {end.strftime('%Y-%m-%d')}")
    print(f"Tickers : {len(TICKERS)}")
    print(f"Output  : {outfile}")
    print("=" * 62)

    print("\n[1/3] Daily prices, dividends & splits")
    daily, divs, splits = collect_daily(TICKERS, start_str, end_str)

    print("\n[2/3] Snapshot info & ratios (all .info fields)")
    info = collect_info(TICKERS)

    print("\n[3/3] Quarterly financials (most recent filings)")
    income, balance, cashflow = collect_financials(TICKERS)

    print(f"\nWriting {outfile} ...")
    write_excel(outfile, daily, divs, splits, info, income, balance, cashflow)

    # Summary
    print("\nDone.")
    print(f"  Daily rows      : {len(daily):>6,}")
    print(f"  Dividend events : {len(divs):>6,}  (in period)")
    print(f"  Split events    : {len(splits):>6,}  (in period)")
    print(f"  Info columns    : {info.shape[1]:>6,}")
    print(f"  Income rows     : {len(income):>6,}")
    print(f"  Balance rows    : {len(balance):>6,}")
    print(f"  CashFlow rows   : {len(cashflow):>6,}")
    print(f"\nSaved → {outfile}")


if __name__ == "__main__":
    main()
