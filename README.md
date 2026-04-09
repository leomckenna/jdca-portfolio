# JDCA Weekly Update — How to Run It

## What this does

Every Monday, you run two scripts:
1. `metrics.ipynb` — pulls live data from Yahoo Finance → saves an xlsx
2. `generate_data_block.py` — reads that xlsx, drafts news with AI, writes the new week into `data.js`

Then you push to GitHub and the dashboard updates.

---

## One-time setup

### 1. Install Python dependencies
```bash
pip install anthropic python-dotenv openpyxl pandas
```

### 2. Create a `.env` file
In the same folder as `generate_data_block.py`, create a file called `.env` with one line:
```
ANTHROPIC_API_KEY=sk-ant-...
```
Get an API key at https://console.anthropic.com — it costs a few cents per week to run.

---

## Weekly workflow

### Step 1 — Run the metrics notebook
Open `metrics.ipynb` in Jupyter, update the `AS_OF` date at the top to the most recent Monday, run all cells.

This saves a file like `jdca_weekly_metrics_asof_2026-04-13.xlsx`.

### Step 2 — Run the generator
```bash
python generate_data_block.py \
  --xlsx jdca_weekly_metrics_asof_2026-04-13.xlsx \
  --data-js ../data.js
```

The script will walk you through:

**News drafting** (for the top 3 gainers + top 3 losers):
- It shows you the ticker, move, and YTD return
- You can paste a news headline or context if you have one, or just press Enter
- It drafts a `summary` and `takeaway` automatically
- You can accept, edit, or regenerate each one

**Stats review:**
- It shows the auto-detected best/worst mover and highest YTD
- You can override the highestYtd ticker if the auto-pick is a micro-cap penny stock
- You can manually set positive/negative sentiment counts

**Final confirmation:**
- Shows a preview of the new block
- You type `y` to write it into `data.js` (a timestamped backup is made automatically)
- Or press Enter to abort and save the block to a separate file for manual use

### Step 3 — Validate and push
```bash
node --check data.js
git add data.js
git commit -m "Weekly update: week of MM/DD/YYYY"
git push
```

---

## If something goes wrong

- The script always makes a backup before writing: `data.js.bak.YYYYMMDD_HHMMSS`
- If you abort at the confirmation step, it saves the block to `new_week_block_MM-DD-YYYY.js` — you can copy-paste from there manually
- If the AI news draft looks wrong, just use `[e]dit` or `[r]egenerate` at the prompt
- If a ticker has no news, press Enter at the context prompt and accept the AI's best guess, then edit the summary manually

---

## Files

| File | What it is |
|------|-----------|
| `metrics.ipynb` | Pulls live data from Yahoo Finance, saves xlsx |
| `generate_data_block.py` | Reads xlsx, drafts news, writes to data.js |
| `.env` | Your Anthropic API key (never commit this to git) |
| `data.js` | The dashboard data file |
| `index.html` | The dashboard front-end |

---

## Costs

The AI news drafting calls the Anthropic API. For 6 tickers per week it costs roughly $0.05–0.15 per run. You can check usage at https://console.anthropic.com.
