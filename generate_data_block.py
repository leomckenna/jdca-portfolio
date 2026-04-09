#!/usr/bin/env python3
"""
JDCA data.js generator
-----------------------
Reads the weekly metrics xlsx, generates a new week block (holdings + stats + news),
and prepends it into data.js — with an automatic backup first.

Usage:
    python generate_data_block.py --xlsx jdca_weekly_metrics_asof_2026-04-06.xlsx --data-js ../data.js

Requirements:
    pip install anthropic python-dotenv openpyxl pandas
    ANTHROPIC_API_KEY in a .env file (same folder as this script)
"""

import argparse
import json
import os
import re
import shutil
import sys
from datetime import datetime
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
import anthropic

load_dotenv()

# ── Config ────────────────────────────────────────────────────────────────────

# How many tickers to include in the news section (top N gainers + top N losers)
TOP_N_MOVERS = 3

# Penny stock threshold: market cap below this (in USD) = penny: true
PENNY_THRESHOLD_USD = 300_000_000

# ── Helpers ───────────────────────────────────────────────────────────────────

def fmt_mkt_cap(usd: float) -> str:
    if pd.isna(usd) or usd is None:
        return "N/A"
    if usd >= 1e9:
        return f"${usd/1e9:.1f}B"
    return f"${usd/1e6:.1f}M"


def fmt_pct(val: float, decimals: int = 3) -> str:
    """Format a decimal return (0.05 → 5.000) as a plain number string."""
    return str(round(val * 100, decimals))


def js_null_or(val, decimals=3):
    if val is None or (isinstance(val, float) and pd.isna(val)):
        return "null"
    return str(round(float(val), decimals))


def is_penny(mkt_cap_usd) -> bool:
    if mkt_cap_usd is None or (isinstance(mkt_cap_usd, float) and pd.isna(mkt_cap_usd)):
        return True
    return float(mkt_cap_usd) < PENNY_THRESHOLD_USD


# ── Load xlsx ─────────────────────────────────────────────────────────────────

def load_xlsx(path: str) -> pd.DataFrame:
    df = pd.read_excel(path)
    required = [
        "Ticker", "Company Name", "Market Cap Group", "Market Cap (USD)",
        "Closing Price (USD)", "52 Week Low (USD)", "52 Week High (USD)",
        "1-Week Return (Past 5 Trading Days)", "Excess Weekly Return vs. XLV (ppt)",
        "Total Return (YTD)", "P/E (Trailing)", "Current Ratio",
        "Relative Volume (Last 5D vs 100D)"
    ]
    missing = [c for c in required if c not in df.columns]
    if missing:
        print(f"[ERROR] Missing columns in xlsx: {missing}")
        sys.exit(1)
    return df


# ── Build holdings array ──────────────────────────────────────────────────────

def build_holdings(df: pd.DataFrame, sentiments: dict[str, str]) -> str:
    lines = []
    for _, r in df.iterrows():
        ticker  = str(r["Ticker"]).strip()
        name    = str(r["Company Name"]).strip()
        cap     = str(r["Market Cap Group"]).strip()
        mkt     = fmt_mkt_cap(r["Market Cap (USD)"])
        price   = round(float(r["Closing Price (USD)"]), 3)
        low52   = round(float(r["52 Week Low (USD)"]), 3)
        high52  = round(float(r["52 Week High (USD)"]), 3)
        weekly  = round(float(r["1-Week Return (Past 5 Trading Days)"]) * 100, 3)
        exXlv   = js_null_or(r["Excess Weekly Return vs. XLV (ppt)"], 3)
        ytd     = round(float(r["Total Return (YTD)"]) * 100, 3)
        pe      = js_null_or(r["P/E (Trailing)"], 2)
        cr      = js_null_or(r["Current Ratio"], 3)
        rel_vol_raw = r["Relative Volume (Last 5D vs 100D)"]
        rel_vol = "null" if (rel_vol_raw is None or (isinstance(rel_vol_raw, float) and pd.isna(rel_vol_raw))) else str(round(float(rel_vol_raw) * 100))
        sentiment = sentiments.get(ticker, "Neutral")

        # Shorten long names to match existing style
        short_name = name
        name_map = {
            "Vertex Pharmaceuticals Incorporated": "Vertex Pharma",
            "Otsuka Holdings Co. Ltd.": "Otsuka Holdings",
            "CRISPR Therapeutics AG": "CRISPR Therapeutics",
            "Sana Biotechnology, Inc.": "Sana Biotech",
            "Lineage Cell Therapeutics, Inc.": "Lineage Cell",
            "Humacyte, Inc.": "Humacyte",
            "Century Therapeutics, Inc.": "Century Therapeutics",
            "Eledon Pharmaceuticals, Inc.": "Eledon Pharma",
            "SAB Biotherapeutics, Inc.": "SAB Biotherapeutics",
            "Sernova Biotherapeutics": "Sernova",
            "NextCell Pharma AB": "NextCell Pharma",
            "Creative Medical Technology Holdings": "Creative Medical",
        }
        for full, short in name_map.items():
            if full.lower() in name.lower():
                short_name = short
                break

        # Pad for alignment
        t_pad  = f'"{ticker}"'.ljust(12)
        n_pad  = f'"{short_name}"'.ljust(26)
        c_pad  = f'"{cap}"'.ljust(13)
        m_pad  = f'"{mkt}"'.ljust(11)
        sent_pad = f'"{sentiment}"'

        line = (
            f'      {{ ticker:{t_pad}, name:{n_pad}, cap:{c_pad}, mktCap:{m_pad}, '
            f'price:{str(price).rjust(10)}, low52:{str(low52).rjust(9)}, high52:{str(high52).rjust(10)}, '
            f'weekly:{str(weekly).rjust(8)}, excessXlv:{str(exXlv).rjust(8)}, '
            f'ytd:{str(ytd).rjust(9)}, pe:{pe.rjust(6)}, cr:{str(cr).rjust(6)}, '
            f'relVol:{rel_vol.rjust(4)}, sentiment:{sent_pad}  }}'
        )
        lines.append(line)

    return "    holdings: [\n" + ",\n".join(lines) + "\n    ],"


# ── Build stats block ─────────────────────────────────────────────────────────

def build_stats(df: pd.DataFrame, sentiments: dict[str, str], overrides: dict = None) -> tuple[str, dict]:
    overrides = overrides or {}
    df2 = df.copy()
    df2["_weekly"] = df2["1-Week Return (Past 5 Trading Days)"].astype(float) * 100
    df2["_ytd"]    = df2["Total Return (YTD)"].astype(float) * 100

    best_row  = df2.loc[df2["_weekly"].idxmax()]
    worst_row = df2.loc[df2["_weekly"].idxmin()]

    # YTD: use override ticker if provided
    if "highestYtd" in overrides:
        ytd_row = df2[df2["Ticker"] == overrides["highestYtd"]].iloc[0]
    else:
        ytd_row = df2.loc[df2["_ytd"].idxmax()]

    pos = overrides.get("pos", sum(1 for v in sentiments.values() if v == "Positive"))
    neg = overrides.get("neg", sum(1 for v in sentiments.values() if v == "Negative"))
    neu = len(df2) - pos - neg

    best_val  = f"+{best_row['_weekly']:.1f}%"
    worst_val = f"−{abs(worst_row['_weekly']):.1f}%"
    ytd_val   = f"+{ytd_row['_ytd']:.0f}%"

    def short_name(row):
        parts = str(row["Company Name"]).split()
        return parts[0] if len(parts) == 1 else " ".join(parts[:2])

    stats_dict = {
        "best":       {"val": best_val,  "sub": f"{best_row['Ticker']} · {short_name(best_row)}"},
        "worst":      {"val": worst_val, "sub": f"{worst_row['Ticker']} · {short_name(worst_row)}"},
        "highestYtd": {"val": ytd_val,   "sub": f"{ytd_row['Ticker']} · {short_name(ytd_row)}"},
        "positiveSentiment": {"val": str(pos), "sub": f"vs. {neg} Neg · {neu} Neutral"},
    }

    js = (
        f'    stats: {{\n'
        f'      best:       {{ val: "{stats_dict["best"]["val"]}", sub: "{stats_dict["best"]["sub"]}" }},\n'
        f'      worst:      {{ val: "{stats_dict["worst"]["val"]}", sub: "{stats_dict["worst"]["sub"]}" }},\n'
        f'      highestYtd: {{ val: "{stats_dict["highestYtd"]["val"]}",  sub: "{stats_dict["highestYtd"]["sub"]}" }},\n'
        f'      positiveSentiment: {{ val: "{stats_dict["positiveSentiment"]["val"]}", sub: "{stats_dict["positiveSentiment"]["sub"]}" }}\n'
        f'    }},'
    )
    return js, stats_dict


# ── AI news drafting ──────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You write weekly news entries for a healthcare investment portfolio dashboard (JDCA).
The audience is non-technical — typically a healthcare investor who reads the dashboard on Monday morning.
Style rules:
- Plain, conversational English. No jargon.
- Summaries: 2-4 sentences. What happened, what drove the move. Factual.
- Takeaways: 2-3 sentences. What this means for the portfolio thesis. Honest, not promotional.
- valImpact true only if the news changes long-term fundamental value (approval, data, major partnership) — not macro/sector moves.
- sentiment: "Positive" = fundamentally good news, "Negative" = fundamentally bad, "Neutral" = macro/sector move or no catalyst.
Respond ONLY with a valid JSON object. No markdown fences, no preamble."""


def draft_news_entry(client: anthropic.Anthropic, ticker: str, company: str,
                     side: str, weekly_pct: float, ytd_pct: float,
                     mkt_cap: str, is_penny_stock: bool,
                     user_context: str = "") -> dict:
    prompt = f"""Ticker: {ticker}
Company: {company}
Side: {side} ({'top gainer' if side == 'gainer' else 'top loser'} this week)
Weekly return: {weekly_pct:+.1f}%
YTD return: {ytd_pct:+.1f}%
Market cap: {mkt_cap}
Penny stock: {is_penny_stock}
{f'User-provided context / news:{chr(10)}{user_context}' if user_context.strip() else ''}

Return a JSON object with exactly these fields:
{{
  "topic": "3-8 word title",
  "summary": "2-4 sentence factual summary",
  "takeaway": "2-3 sentence thesis implication",
  "valImpact": true or false,
  "sentiment": "Positive" | "Negative" | "Neutral"
}}"""

    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=600,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}]
    )
    text = response.content[0].text.strip()
    text = re.sub(r"^```json\s*|^```\s*|```$", "", text, flags=re.MULTILINE).strip()
    return json.loads(text)


def build_news(df: pd.DataFrame, client: anthropic.Anthropic, n: int = TOP_N_MOVERS) -> tuple[str, dict[str, str]]:
    df2 = df.copy()
    df2["_weekly"] = df2["1-Week Return (Past 5 Trading Days)"].astype(float) * 100
    df2["_ytd"]    = df2["Total Return (YTD)"].astype(float) * 100

    gainers = df2.nlargest(n, "_weekly")
    losers  = df2.nsmallest(n, "_weekly")
    movers  = list(gainers.iterrows()) + list(losers.iterrows())

    news_entries = []
    sentiments   = {}

    print(f"\n{'─'*60}")
    print(f"NEWS DRAFTING — {len(movers)} tickers ({n} gainers + {n} losers)")
    print(f"{'─'*60}")
    print("For each ticker: paste news context if you have it, or press Enter to let AI draft from numbers alone.")
    print("After each draft you can accept, edit, or regenerate.\n")

    for _, row in movers:
        ticker   = str(row["Ticker"]).strip()
        company  = str(row["Company Name"]).strip()
        weekly   = float(row["_weekly"])
        ytd      = float(row["_ytd"])
        mkt      = fmt_mkt_cap(row["Market Cap (USD)"])
        penny    = is_penny(row["Market Cap (USD)"])
        side     = "gainer" if weekly >= 0 else "loser"

        print(f"{'▲' if side == 'gainer' else '▼'}  {ticker} ({company[:30]})  {weekly:+.1f}% this week  |  {ytd:+.1f}% YTD")
        context = input("   Paste news context (or Enter to skip): ").strip()

        while True:
            print("   Drafting...", end=" ", flush=True)
            try:
                entry = draft_news_entry(client, ticker, company, side, weekly, ytd, mkt, penny, context)
            except Exception as e:
                print(f"\n   [ERROR] AI draft failed: {e}")
                entry = {
                    "topic": "No Catalyst",
                    "summary": f"{ticker} moved {weekly:+.1f}% this week.",
                    "takeaway": "No fundamental update.",
                    "valImpact": False,
                    "sentiment": "Neutral"
                }

            print("done.")
            print(f"   Topic:    {entry['topic']}")
            print(f"   Summary:  {entry['summary']}")
            print(f"   Takeaway: {entry['takeaway']}")
            print(f"   Sentiment: {entry['sentiment']}  |  valImpact: {entry['valImpact']}")

            action = input("   [a]ccept / [e]dit / [r]egenerate: ").strip().lower()
            if action == "r":
                extra = input("   Add more context for the regeneration (or Enter): ").strip()
                if extra:
                    context = (context + "\n" + extra).strip()
                continue
            if action == "e":
                entry["topic"]    = input(f"   Topic [{entry['topic']}]: ").strip() or entry["topic"]
                entry["summary"]  = input(f"   Summary [{entry['summary'][:60]}...]: ").strip() or entry["summary"]
                entry["takeaway"] = input(f"   Takeaway [{entry['takeaway'][:60]}...]: ").strip() or entry["takeaway"]
                sent_in = input(f"   Sentiment [{entry['sentiment']}] (P/N/Neutral): ").strip()
                if sent_in.upper() == "P": entry["sentiment"] = "Positive"
                elif sent_in.upper() == "N": entry["sentiment"] = "Negative"
                vi = input(f"   valImpact [{entry['valImpact']}] (y/n): ").strip().lower()
                if vi == "y": entry["valImpact"] = True
                elif vi == "n": entry["valImpact"] = False
            break

        sentiments[ticker] = entry["sentiment"]

        news_entries.append({
            "side": side,
            "company": company,
            "ticker": ticker,
            "penny": penny,
            **entry
        })
        print()

    # Build JS
    lines = []
    for e in news_entries:
        summary  = e["summary"].replace('"', '\\"')
        takeaway = e["takeaway"].replace('"', '\\"')
        lines.append(
            f'      {{\n'
            f'        side: "{e["side"]}",\n'
            f'        company: "{e["company"]}",\n'
            f'        ticker: "{e["ticker"]}",\n'
            f'        penny: {"true" if e["penny"] else "false"},\n'
            f'        sentiment: "{e["sentiment"]}",\n'
            f'        topic: "{e["topic"]}",\n'
            f'        summary: "{summary}",\n'
            f'        takeaway: "{takeaway}",\n'
            f'        valImpact: {"true" if e["valImpact"] else "false"}\n'
            f'      }}'
        )

    js = "    news: [\n" + ",\n".join(lines) + "\n    ]"
    return js, sentiments


# ── Assemble full week block ──────────────────────────────────────────────────

def build_week_block(df: pd.DataFrame, as_of_date: str,
                     holdings_js: str, stats_js: str, news_js: str) -> str:
    mo, dy, yr = as_of_date.split("/")
    label = f"Week of {mo}/{dy}/{yr}"
    return (
        f'  {{\n'
        f'    label: "{label}",\n'
        f'    asOf: "{as_of_date}",\n'
        f'{stats_js}\n'
        f'{holdings_js}\n'
        f'{news_js}\n'
        f'  }}'
    )


# ── Inject into data.js ───────────────────────────────────────────────────────

def inject_into_data_js(data_js_path: str, new_block: str) -> None:
    path = Path(data_js_path)
    original = path.read_text(encoding="utf-8")

    # Backup
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = path.with_name(f"data.js.bak.{ts}")
    shutil.copy2(path, backup_path)
    print(f"Backup saved → {backup_path}")

    # Find the opening of the WEEKS array and insert after it
    match = re.search(r"(const WEEKS\s*=\s*\[)\s*", original)
    if not match:
        print("[ERROR] Could not find 'const WEEKS = [' in data.js")
        sys.exit(1)

    insert_pos = match.end()
    new_content = (
        original[:insert_pos]
        + "\n"
        + new_block
        + ",\n"
        + original[insert_pos:]
    )

    path.write_text(new_content, encoding="utf-8")
    print(f"data.js updated ✓  ({path})")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Generate and inject a JDCA weekly data block into data.js")
    parser.add_argument("--xlsx",    required=True, help="Path to the weekly metrics xlsx")
    parser.add_argument("--data-js", required=True, help="Path to data.js")
    parser.add_argument("--as-of",   help="Override as-of date (MM/DD/YYYY). Defaults to reading from filename.")
    parser.add_argument("--top-n",   type=int, default=TOP_N_MOVERS, help="Number of top gainers/losers for news (default 3)")
    args = parser.parse_args()

    # Resolve as-of date
    if args.as_of:
        as_of = args.as_of
    else:
        m = re.search(r"(\d{4}-\d{2}-\d{2})", args.xlsx)
        if not m:
            print("[ERROR] Could not parse date from filename. Use --as-of MM/DD/YYYY")
            sys.exit(1)
        y, mo, d = m.group(1).split("-")
        as_of = f"{mo}/{d}/{y}"

    print(f"\nJDCA data.js generator")
    print(f"As-of: {as_of}")
    print(f"xlsx:  {args.xlsx}")
    print(f"data.js: {args.data_js}\n")

    # Load xlsx
    df = load_xlsx(args.xlsx)
    print(f"Loaded {len(df)} tickers.")

    # API client
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("[ERROR] ANTHROPIC_API_KEY not set. Add it to a .env file in this folder.")
        sys.exit(1)
    client = anthropic.Anthropic(api_key=api_key)

    # News drafting (also collects sentiments per ticker)
    news_js, sentiments = build_news(df, client, n=args.top_n)

    # Now build holdings (uses sentiments from news pass)
    holdings_js = build_holdings(df, sentiments)

    # Stats overrides — offer the user a chance to override after seeing the auto values
    print("─" * 60)
    print("STATS BLOCK")
    stats_js, stats_dict = build_stats(df, sentiments)
    print(f"  Best:       {stats_dict['best']['val']} — {stats_dict['best']['sub']}")
    print(f"  Worst:      {stats_dict['worst']['val']} — {stats_dict['worst']['sub']}")
    print(f"  Highest YTD:{stats_dict['highestYtd']['val']} — {stats_dict['highestYtd']['sub']}")
    print(f"  Sentiment:  {stats_dict['positiveSentiment']['val']} pos, {stats_dict['positiveSentiment']['sub']}")

    override_ytd = input("\nOverride highestYtd ticker? (Enter ticker or press Enter to keep): ").strip().upper()
    override_pos = input("Override positive count? (Enter number or press Enter to keep): ").strip()
    override_neg = input("Override negative count? (Enter number or press Enter to keep): ").strip()

    overrides = {}
    if override_ytd: overrides["highestYtd"] = override_ytd
    if override_pos: overrides["pos"] = int(override_pos)
    if override_neg: overrides["neg"] = int(override_neg)

    if overrides:
        stats_js, stats_dict = build_stats(df, sentiments, overrides)
        print("Stats updated.")

    # Assemble and inject
    week_block = build_week_block(df, as_of, holdings_js, stats_js, news_js)

    print(f"\n{'─'*60}")
    print("Ready to write. Here's a preview of the first few lines:\n")
    preview = week_block[:500]
    print(preview + "...\n")

    confirm = input("Write to data.js? [y/N]: ").strip().lower()
    if confirm != "y":
        print("Aborted. Nothing was written.")
        # Save to a temp file so work isn't lost
        out_path = Path(args.data_js).parent / f"new_week_block_{as_of.replace('/', '-')}.js"
        out_path.write_text(week_block, encoding="utf-8")
        print(f"Block saved to {out_path} for manual use.")
        sys.exit(0)

    inject_into_data_js(args.data_js, week_block)

    print("\nAll done. Run: node --check data.js  to validate before pushing.")


if __name__ == "__main__":
    main()
