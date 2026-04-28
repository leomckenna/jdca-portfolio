#!/usr/bin/env python3
"""
JDCA news fetcher
-----------------
Queries NewsAPI for each portfolio company and upserts articles into the
Supabase news_articles table. Run weekly alongside the metrics pipeline.

Requirements:
    pip install requests supabase python-dotenv
    NEWS_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY in env / .env
"""

import argparse
import os
import time
from datetime import date, timedelta

import requests
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

# ── Company list: (ticker, search query) ─────────────────────────────────────
# Search queries are tuned for relevance — full name returns better results
# than ticker alone for pharma/biotech coverage.
COMPANIES = [
    ("LLY",      "Eli Lilly"),
    ("NVO",      "Novo Nordisk"),
    ("SNY",      "Sanofi"),
    ("VRTX",     "Vertex Pharmaceuticals"),
    ("OTSKY",    "Otsuka Holdings"),
    ("CRSP",     "CRISPR Therapeutics"),
    ("SANA",     "Sana Biotechnology"),
    ("EVO",      "Evotec"),
    ("LCTX",     "Lineage Cell Therapeutics"),
    ("HUMA",     "Humacyte"),
    ("GNPX",     "Genprobe"),
    ("IPSC",     "Century Therapeutics"),
    ("SABS",     "SAB Biotherapeutics"),
    ("SEOVF",    "Sernova"),
    ("NCEL",     "NextCure"),
    ("FLUI.ST",  "Fluicell"),
    ("NXTCL.ST", "NextCell Pharma"),
    ("IMCR",     "Immunocore"),
    ("CELZ",     "Creative Medical Technology"),
    ("ELDN",     "Eledon Pharmaceuticals"),
    ("ADOC.PA",  "Adocia"),
]

NEWS_API_URL = "https://newsapi.org/v2/everything"


def fetch_articles(query: str, from_date: str, api_key: str, page_size: int = 10) -> list[dict]:
    resp = requests.get(NEWS_API_URL, params={
        "q":        f'"{query}"',
        "from":     from_date,
        "sortBy":   "publishedAt",
        "language": "en",
        "pageSize": page_size,
        "apiKey":   api_key,
    }, timeout=20)
    if resp.status_code != 200:
        print(f"  [WARN] NewsAPI error {resp.status_code}: {resp.text[:120]}")
        return []
    data = resp.json()
    if data.get("status") != "ok":
        print(f"  [WARN] NewsAPI status={data.get('status')}: {data.get('message', '')}")
        return []
    return data.get("articles", [])


def main():
    parser = argparse.ArgumentParser(description="Fetch and store portfolio news")
    parser.add_argument("--days",      type=int, default=8,  help="How many days back to fetch (default 8, covers last full week + buffer)")
    parser.add_argument("--page-size", type=int, default=10, help="Articles per company (default 10)")
    parser.add_argument("--keep-days", type=int, default=35, help="Delete articles older than this many days (default 35)")
    args = parser.parse_args()

    api_key    = os.environ.get("NEWS_API_KEY", "")
    supa_url   = os.environ.get("SUPABASE_URL", "")
    supa_key   = os.environ.get("SUPABASE_SERVICE_KEY", "")

    if not api_key:
        print("[ERROR] NEWS_API_KEY not set")
        raise SystemExit(1)
    if not supa_url or not supa_key:
        print("[ERROR] SUPABASE_URL / SUPABASE_SERVICE_KEY not set")
        raise SystemExit(1)

    db = create_client(supa_url, supa_key)

    from_date = (date.today() - timedelta(days=args.days)).isoformat()
    print(f"Fetching news from {from_date} onwards ({args.days} days back)\n")

    total_upserted = 0

    for ticker, query in COMPANIES:
        print(f"  {ticker:12s}  query: \"{query}\"")
        articles = fetch_articles(query, from_date, api_key, args.page_size)
        if not articles:
            print(f"             → 0 articles")
            time.sleep(0.5)
            continue

        rows = []
        for a in articles:
            url = (a.get("url") or "").strip()
            title = (a.get("title") or "").strip()
            if not url or not title or url == "[Removed]" or title == "[Removed]":
                continue
            rows.append({
                "ticker":       ticker,
                "company_name": query,
                "title":        title,
                "description":  (a.get("description") or "").strip() or None,
                "url":          url,
                "source":       (a.get("source") or {}).get("name") or None,
                "published_at": a.get("publishedAt"),
            })

        if rows:
            db.table("news_articles").upsert(rows, on_conflict="url").execute()
            total_upserted += len(rows)
            print(f"             → {len(rows)} articles upserted")

        time.sleep(0.3)  # gentle rate limiting

    # Clean up articles older than keep_days
    cutoff = (date.today() - timedelta(days=args.keep_days)).isoformat()
    db.table("news_articles").delete().lt("published_at", cutoff).execute()
    print(f"\nCleaned up articles older than {cutoff}")
    print(f"\nDone. {total_upserted} articles upserted across {len(COMPANIES)} companies.")


if __name__ == "__main__":
    main()
