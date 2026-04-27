#!/usr/bin/env python3
"""
JDCA weekly metrics script
--------------------------
Fetches Yahoo Finance data for all 21 portfolio tickers and writes an xlsx
alongside an XLV history JSON sidecar.

Usage:
    python metrics.py                        # defaults to most recent Monday
    python metrics.py --as-of 2026-04-20    # explicit date (YYYY-MM-DD)

Requirements:
    pip install yfinance pandas openpyxl
"""

import argparse
import json
import warnings
from datetime import date, timedelta
from pathlib import Path

import pandas as pd
import yfinance as yf

warnings.filterwarnings("ignore")

TICKERS = [
    "LLY", "NVO", "SNY", "VRTX", "OTSKY",
    "CRSP", "SANA", "EVO", "LCTX", "HUMA",
    "GNPX", "IPSC", "SABS", "SEOVF", "NCEL",
    "FLUI.ST", "NXTCL.ST", "IMCR", "CELZ", "ELDN",
    "ADOC.PA"
]

SPX_TICKER    = "^GSPC"
SECTOR_TICKER = "XLV"


def most_recent_monday() -> date:
    today = date.today()
    return today - timedelta(days=today.weekday())


def get_weekly_return(hist: pd.DataFrame):
    if hist is None or hist.empty or len(hist) < 6:
        return None
    last6 = hist.tail(6)
    return last6["Close"].iloc[-1] / last6["Close"].iloc[0] - 1


def get_ytd_return(hist: pd.DataFrame, as_of: pd.Timestamp):
    if hist is None or hist.empty:
        return None
    year = as_of.year
    prior_year = hist[hist.index.year == year - 1]
    current_year = hist[hist.index.year == year]
    if prior_year.empty or current_year.empty:
        return None
    base   = float(prior_year["Close"].iloc[-1])
    latest = float(current_year["Close"].iloc[-1])
    return latest / base - 1


def classify_market_cap(market_cap_usd: float):
    if market_cap_usd is None:
        return None
    if market_cap_usd >= 10e9:
        return "Large-cap"
    elif market_cap_usd >= 2e9:
        return "Mid-cap"
    elif market_cap_usd >= 300e6:
        return "Small-cap"
    return "Micro-cap"


def history_as_of(ticker: yf.Ticker, as_of: pd.Timestamp, end: str, lookback_days: int = 420):
    start = (as_of - pd.Timedelta(days=lookback_days)).strftime("%Y-%m-%d")
    try:
        hist = ticker.history(start=start, end=end, interval="1d")
    except Exception as e:
        print(f"  [WARN] history fetch failed: {e}")
        return pd.DataFrame()
    if hist is None or hist.empty:
        return pd.DataFrame()
    return hist[hist.index <= as_of]


_FX_CACHE: dict = {}

def get_fx_to_usd_asof(ccy: str, as_of: pd.Timestamp, end: str) -> float | None:
    ccy = (ccy or "").upper()
    if ccy in ("USD", ""):
        return 1.0
    if ccy in _FX_CACHE:
        return _FX_CACHE[ccy]
    fx_hist = history_as_of(yf.Ticker(f"{ccy}USD=X"), as_of, end, lookback_days=30)
    if fx_hist is None or fx_hist.empty:
        print(f"  [WARN] FX rate not found for {ccy}, will be None")
        _FX_CACHE[ccy] = None
        return None
    fx = float(fx_hist["Close"].iloc[-1])
    _FX_CACHE[ccy] = fx
    return fx


def to_usd(value, fx) -> float | None:
    if value is None or fx is None:
        return None
    return float(value) * float(fx)


def get_weekly_history_usd(hist: pd.DataFrame, fx_to_usd: float) -> list:
    if hist is None or hist.empty or fx_to_usd is None:
        return []
    hist_52w = hist.tail(365)
    if hist_52w.empty:
        return []
    weekly = hist_52w["Close"].resample("W-FRI").last().dropna()
    result = []
    for ts, price in weekly.items():
        ts_ms = int(ts.timestamp() * 1000)
        result.append([ts_ms, round(float(price) * float(fx_to_usd), 4)])
    return result


def get_metrics(ticker: str, as_of: pd.Timestamp, end: str,
                spx_week_ret: float, xlv_week_ret: float) -> dict:
    print(f"  {ticker}...")
    t = yf.Ticker(ticker)
    try:
        info = t.info or {}
    except Exception as e:
        print(f"  [WARN] {ticker}: info fetch failed ({e})")
        info = {}

    local_ccy = info.get("currency")
    fx_to_usd = get_fx_to_usd_asof(local_ccy, as_of, end)
    hist = history_as_of(t, as_of, end)

    if not hist.empty:
        close_local    = float(hist["Close"].iloc[-1])
        hist_52w       = hist.tail(252)
        low_52w_local  = float(hist_52w["Low"].min())
        high_52w_local = float(hist_52w["High"].max())
        week_ret       = get_weekly_return(hist)
        ytd_ret        = get_ytd_return(hist, as_of)

        vol_series = hist["Volume"].replace(0, pd.NA)
        vol_100d   = vol_series.tail(100).mean()
        vol_week   = vol_series.tail(5).mean()
        rel_vol    = (vol_week / vol_100d) if (pd.notna(vol_100d) and vol_100d > 0) else None

        if ticker in ("FLUI.ST", "NXTCL.ST") and (rel_vol is None or vol_100d < 100):
            print(f"  [WARN] {ticker}: volume data may be unreliable (vol_100d={vol_100d})")
    else:
        print(f"  [WARN] {ticker}: no price history returned")
        close_local = low_52w_local = high_52w_local = None
        week_ret = ytd_ret = None
        vol_100d = vol_week = rel_vol = None

    if week_ret is not None:
        excess_spx = (week_ret - spx_week_ret) * 100
        excess_xlv = (week_ret - xlv_week_ret) * 100
    else:
        excess_spx = excess_xlv = None

    market_cap_local = info.get("marketCap")
    market_cap_usd   = to_usd(market_cap_local, fx_to_usd)
    weekly_hist_usd  = get_weekly_history_usd(hist, fx_to_usd if fx_to_usd else 1.0)

    return {
        "As Of":                                   as_of.strftime("%Y-%m-%d"),
        "Ticker":                                  ticker,
        "Company Name":                            info.get("shortName"),
        "Industry Group":                          info.get("industry"),
        "Local Currency":                          local_ccy,
        "FX to USD (as-of)":                       fx_to_usd,
        "Market Cap (USD)":                        market_cap_usd,
        "Market Cap Group":                        classify_market_cap(market_cap_usd),
        "Closing Price (USD)":                     to_usd(close_local, fx_to_usd),
        "52 Week Low (USD)":                       to_usd(low_52w_local, fx_to_usd),
        "52 Week High (USD)":                      to_usd(high_52w_local, fx_to_usd),
        "1-Week Return (Past 5 Trading Days)":     week_ret,
        "Excess Weekly Return vs. S&P 500 (ppt)":  excess_spx,
        "Excess Weekly Return vs. XLV (ppt)":      excess_xlv,
        "Total Return (YTD)":                      ytd_ret,
        "Average Daily Volume (100D)":             vol_100d,
        "Avg Daily Volume (Last 5 Days)":          vol_week,
        "Relative Volume (Last 5D vs 100D)":       rel_vol,
        "EPS (Basic)":                             info.get("trailingEps"),
        "P/E (Trailing)":                          info.get("trailingPE"),
        "Current Ratio":                           info.get("currentRatio"),
        "Weekly History (USD)":                    weekly_hist_usd,
    }


def main():
    parser = argparse.ArgumentParser(description="Fetch JDCA portfolio weekly metrics")
    parser.add_argument(
        "--as-of",
        help="As-of date in YYYY-MM-DD format (default: most recent Monday)",
    )
    args = parser.parse_args()

    if args.as_of:
        as_of = pd.Timestamp(args.as_of, tz="America/New_York")
    else:
        monday = most_recent_monday()
        as_of = pd.Timestamp(monday.isoformat(), tz="America/New_York")

    end = (as_of + pd.Timedelta(days=1)).strftime("%Y-%m-%d")
    print(f"JDCA weekly metrics — as of {as_of.strftime('%Y-%m-%d')}")

    print("Fetching benchmarks...")
    spx_hist = history_as_of(yf.Ticker(SPX_TICKER), as_of, end)
    xlv_hist = history_as_of(yf.Ticker(SECTOR_TICKER), as_of, end)
    spx_week_ret = get_weekly_return(spx_hist) or 0.0
    xlv_week_ret = get_weekly_return(xlv_hist) or 0.0
    print(f"  S&P 500 weekly: {spx_week_ret*100:.2f}%  |  XLV weekly: {xlv_week_ret*100:.2f}%")

    xlv_weekly_history = get_weekly_history_usd(xlv_hist, 1.0)

    print("\nFetching portfolio metrics...")
    rows = []
    for tkr in TICKERS:
        rows.append(get_metrics(tkr, as_of, end, spx_week_ret, xlv_week_ret))

    df = pd.DataFrame(rows)

    missing = df[df["Closing Price (USD)"].isna()]["Ticker"].tolist()
    if missing:
        print(f"\n[WARN] No price data for: {missing}")
    no_ytd = df[df["Total Return (YTD)"].isna()]["Ticker"].tolist()
    if no_ytd:
        print(f"[WARN] No YTD return for: {no_ytd}")

    date_str = as_of.strftime("%Y-%m-%d")
    outfile = f"jdca_weekly_metrics_asof_{date_str}.xlsx"
    df.to_excel(outfile, index=False)
    print(f"\nDone. Saved to {outfile}")
    print(df[["Ticker", "Closing Price (USD)", "1-Week Return (Past 5 Trading Days)", "Total Return (YTD)"]].to_string(index=False))

    xlv_out = f"jdca_xlv_history_asof_{date_str}.json"
    with open(xlv_out, "w") as f:
        json.dump(xlv_weekly_history, f)
    print(f"\nXLV history ({len(xlv_weekly_history)} weekly points) saved to {xlv_out}")


if __name__ == "__main__":
    main()
