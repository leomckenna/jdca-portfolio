const WEEKS = [
  {
    label: "Week of 03/02/2026",
    asOf: "03/02/2026",
    stats: {
      best:       { val: "+10.6%", sub: "IPSC · Century Therapeutics" },
      worst:      { val: "−11.7%", sub: "GNPX · Genprex" },
      highestYtd: { val: "+137%",  sub: "IPSC · Century Therapeutics" },
      positiveSentiment: { val: "4", sub: "vs. 1 Neg · 16 Neutral" }
    },
    holdings: [
      { ticker:"LLY",      name:"Eli Lilly",           cap:"Large-cap",  mktCap:"$975.2B",  price:1033.74, low52:620.46,  high52:1132.06, weekly:-0.807,  excessXlv:-1.231, ytd:-4.156,  pe:45.08, cr:1.579, relVol:77,  sentiment:"Positive" },
      { ticker:"NVO",      name:"Novo Nordisk",         cap:"Large-cap",  mktCap:"$165.4B",  price:37.22,   low52:36.72,   high52:89.43,   weekly:-3.550,  excessXlv:-3.975, ytd:-28.956, pe:10.23, cr:0.800, relVol:163, sentiment:"Negative" },
      { ticker:"SNY",      name:"Sanofi",               cap:"Large-cap",  mktCap:"$115.5B",  price:47.81,   low52:44.62,   high52:57.57,   weekly:1.067,   excessXlv:0.643,  ytd:-0.860,  pe:20.09, cr:1.092, relVol:138, sentiment:"Neutral"  },
      { ticker:"VRTX",     name:"Vertex Pharma",        cap:"Large-cap",  mktCap:"$123.3B",  price:485.36,  low52:362.50,  high52:519.68,  weekly:-0.425,  excessXlv:-0.849, ytd:7.350,   pe:31.72, cr:2.901, relVol:78,  sentiment:"Positive" },
      { ticker:"OTSKY",    name:"Otsuka Holdings",      cap:"Large-cap",  mktCap:"$35.7B",   price:32.70,   low52:21.43,   high52:34.93,   weekly:-2.967,  excessXlv:-3.392, ytd:15.141,  pe:14.93, cr:2.165, relVol:117, sentiment:"Neutral"  },
      { ticker:"CRSP",     name:"CRISPR Therapeutics",  cap:"Mid-cap",    mktCap:"$5.7B",    price:59.59,   low52:30.04,   high52:78.48,   weekly:4.967,   excessXlv:4.543,  ytd:10.824,  pe:null,  cr:13.316,relVol:86,  sentiment:"Positive" },
      { ticker:"IMCR",     name:"Immunocore",           cap:"Small-cap",  mktCap:"$1.7B",    price:33.12,   low52:23.15,   high52:40.72,   weekly:-1.663,  excessXlv:-2.087, ytd:-1.954,  pe:null,  cr:4.040, relVol:120, sentiment:"Neutral"  },
      { ticker:"EVO",      name:"Evotec SE",            cap:"Small-cap",  mktCap:"$1.2B",    price:3.275,   low52:2.840,   high52:4.800,   weekly:-1.946,  excessXlv:-2.371, ytd:2.987,   pe:null,  cr:2.118, relVol:56,  sentiment:"Neutral"  },
      { ticker:"SANA",     name:"Sana Biotech",         cap:"Small-cap",  mktCap:"$1.1B",    price:4.141,   low52:1.260,   high52:6.550,   weekly:-2.104,  excessXlv:-2.528, ytd:-1.170,  pe:null,  cr:4.555, relVol:36,  sentiment:"Neutral"  },
      { ticker:"LCTX",     name:"Lineage Cell",         cap:"Small-cap",  mktCap:"$433.0M",  price:1.880,   low52:0.370,   high52:2.090,   weekly:3.297,   excessXlv:2.872,  ytd:14.634,  pe:null,  cr:4.504, relVol:59,  sentiment:"Neutral"  },
      { ticker:"HUMA",     name:"Humacyte",             cap:"Micro-cap",  mktCap:"$213.3M",  price:1.105,   low52:0.880,   high52:3.500,   weekly:-1.339,  excessXlv:-1.764, ytd:13.333,  pe:null,  cr:1.616, relVol:77,  sentiment:"Neutral"  },
      { ticker:"IPSC",     name:"Century Therapeutics", cap:"Micro-cap",  mktCap:"$205.8M",  price:2.355,   low52:0.342,   high52:2.710,   weekly:10.563,  excessXlv:10.139, ytd:136.683, pe:null,  cr:6.252, relVol:51,  sentiment:"Neutral"  },
      { ticker:"ELDN",     name:"Eledon Pharma",        cap:"Micro-cap",  mktCap:"$211.4M",  price:2.655,   low52:1.350,   high52:4.600,   weekly:8.367,   excessXlv:7.943,  ytd:63.889,  pe:null,  cr:6.736, relVol:64,  sentiment:"Neutral"  },
      { ticker:"SABS",     name:"SAB Biotherapeutics",  cap:"Micro-cap",  mktCap:"$192.3M",  price:4.040,   low52:1.000,   high52:6.600,   weekly:8.021,   excessXlv:7.597,  ytd:7.162,   pe:null,  cr:10.495,relVol:91,  sentiment:"Neutral"  },
      { ticker:"ADOC.PA",  name:"Adocia",               cap:"Micro-cap",  mktCap:"$153.8M",  price:7.854,   low52:3.343,   high52:14.493,  weekly:-2.041,  excessXlv:-2.465, ytd:-0.149,  pe:null,  cr:1.136, relVol:62,  sentiment:"Neutral"  },
      { ticker:"SEOVF",    name:"Sernova",              cap:"Micro-cap",  mktCap:"$34.7M",   price:0.103,   low52:0.090,   high52:0.170,   weekly:3.000,   excessXlv:2.576,  ytd:14.444,  pe:null,  cr:0.021, relVol:25,  sentiment:"Neutral"  },
      { ticker:"NXTCL.ST", name:"NextCell Pharma",      cap:"Micro-cap",  mktCap:"$16.4M",   price:0.1473,  low52:0.0688,  high52:0.4191,  weekly:-11.417, excessXlv:-11.842,ytd:92.308,  pe:null,  cr:10.022,relVol:83,  sentiment:"Neutral"  },
      { ticker:"NCEL",     name:"NewcelX",              cap:"Micro-cap",  mktCap:"$13.6M",   price:2.980,   low52:1.890,   high52:30.800,  weekly:9.963,   excessXlv:9.539,  ytd:42.584,  pe:null,  cr:0.023, relVol:4,   sentiment:"Neutral"  },
      { ticker:"CELZ",     name:"Creative Medical",     cap:"Micro-cap",  mktCap:"$6.2M",    price:1.770,   low52:1.504,   high52:6.770,   weekly:-2.210,  excessXlv:-2.634, ytd:-10.152, pe:null,  cr:20.706,relVol:13,  sentiment:"Neutral"  },
      { ticker:"GNPX",     name:"Genprex",              cap:"Micro-cap",  mktCap:"$3.2M",    price:1.960,   low52:1.710,   high52:55.000,  weekly:-11.712, excessXlv:-12.136,ytd:9.497,   pe:null,  cr:0.672, relVol:181, sentiment:"Neutral"  },
      { ticker:"FLUI.ST",  name:"Fluicell AB",          cap:"Micro-cap",  mktCap:"$1.8M",    price:1.299,   low52:0.813,   high52:3.274,   weekly:-8.462,  excessXlv:-8.886, ytd:19.000,  pe:null,  cr:1.003, relVol:91,  sentiment:"Neutral"  },
    ],
    news: [
      {
        side: "gainer",
        company: "Century Therapeutics", ticker: "IPSC", penny: true, sentiment: "Neutral",
        topic: "Investor Conferences",
        summary: "Announced participation in TD Cowen (March 4) and Leerink Partners (March 10) healthcare conferences. The January $135M oversubscribed private placement — led by TCGX with RA Capital and Venrock — continues to underpin investor interest in CNTY-813, the iPSC-derived beta islet program for T1D. Piper Sandler raised its price target to $4 from $2 in January.",
        takeaway: "Conference participation signals active investor engagement following the major January financing. The $135M raise funds the planned IND submission for CNTY-813 — a direct JDCA-relevant program. As a penny stock, the +10.6% move on no new fundamental news reflects elevated volatility; the pipeline remains the thesis driver.",
        valImpact: false
      },
      {
        side: "gainer",
        company: "SAB Biotherapeutics", ticker: "SABS", penny: true, sentiment: "Neutral",
        topic: "Oppenheimer Conference",
        summary: "CEO presented SAB-142 at the Oppenheimer Healthcare Conference as a redosable human ATG for T1D. Confirmed SAFEGUARD study on track to enroll last patient by end-2026, with topline data expected H2 2027. FDA agreement that SAFEGUARD is a pivotal study effectively de-risks the regulatory path.",
        takeaway: "FDA alignment on pivotal study status removes a key regulatory uncertainty. The 2027 data readout remains distant, but the framework is increasingly clear. As a penny stock, the +8% gain reflects thin-float momentum as much as fundamental re-rating; the SAB-142 thesis is intact.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "CRISPR Therapeutics", ticker: "CRSP", penny: false, sentiment: "Positive",
        topic: "Q4 Earnings / 2026 Milestones",
        summary: "Reported Q4 2025 results with CASGEVY revenue exceeding $100M for the full year — a nearly three-fold increase in patient initiations vs. 2024. Enters 2026 with ~$2B in cash. Key 2026 milestones: global CASGEVY pediatric submissions H1, CTX310 cardiovascular and CTX611 autoimmune topline data H2, and new trial starts for CTX460 and CTX340. Analyst consensus is \"Hold\" with a $64 average price target vs. ~$60 current.",
        takeaway: "The CASGEVY commercial ramp is progressing ahead of expectations and the $2B cash runway is substantial. The +5% weekly move on strong earnings momentum is well-supported by fundamentals — a relatively rare case in this portfolio where price action and news are clearly aligned.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Novo Nordisk A/S", ticker: "NVO", penny: false, sentiment: "Negative",
        topic: "Continued Selling / Price Cut Plan",
        summary: "NVO continued declining this week (−3.6%), adding to last week's −17.7% crash after CagriSema missed vs. tirzepatide. Now down ~29% YTD. Novo announced plans to cut GLP-1 drug prices by up to 50% starting 2027 to defend market share — signaling the company views the competitive threat as structural, not temporary.",
        takeaway: "The 50% pricing concession confirms the competitive moat has narrowed materially. This will compress margins significantly starting 2027. Recovery requires CagriSema FDA approval and amycretin Phase 3 data, both 1–2 years away. The negative sentiment designation remains appropriate.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Eli Lilly and Company", ticker: "LLY", penny: false, sentiment: "Positive",
        topic: "Minor Pullback / KwikPen Launch",
        summary: "LLY gave back −0.8% this week after last week's +4% surge on the NVO trial miss. The FDA approved a new four-dose KwikPen for Zepbound delivering a full month's treatment at $299/month for cash-pay patients. BofA maintained Buy, downplaying Novo's price cut impact. 2026 guidance calls for ~25% revenue growth.",
        takeaway: "The minor weekly pullback is noise after a strong prior week. KwikPen broadens access and competitive positioning in cash-pay and government channels. Lilly's structural advantage in the GLP-1 market continues to widen; the positive sentiment designation is well-supported.",
        valImpact: false
      },
    ]
  },

  // ── WEEK OF 02/23/2026 ─────────────────────────────────────────────────
  {
    label: "Week of 02/23/2026",
    asOf: "02/23/2026",
    stats: {
      best:       { val: "+30.3%", sub: "FLUI.ST · Fluicell AB" },
      worst:      { val: "−17.7%", sub: "NVO · Novo Nordisk" },
      highestYtd: { val: "+119%",  sub: "NXTCL.ST · NextCell Pharma" },
      positiveSentiment: { val: "4", sub: "vs. 1 Neg · 16 Neutral" }
    },
    holdings: [
      { ticker:"LLY",      name:"Eli Lilly",           cap:"Large-cap",  mktCap:"$981.0B",  price:1039.43, low52:620.46, high52:1132.06, weekly:0.33,   excessXlv:-0.12,  ytd:-3.63,  pe:45.35, cr:1.58,  relVol:71,  sentiment:"Positive" },
      { ticker:"NVO",      name:"Novo Nordisk",         cap:"Large-cap",  mktCap:"$181.0B",  price:40.61,   low52:39.97,  high52:91.28,   weekly:-17.74, excessXlv:-18.19, ytd:-22.49, pe:11.10, cr:0.80,  relVol:80,  sentiment:"Negative" },
      { ticker:"SNY",      name:"Sanofi",               cap:"Large-cap",  mktCap:"$115.0B",  price:47.53,   low52:44.62,  high52:57.57,   weekly:2.37,   excessXlv:1.92,   ytd:-1.45,  pe:19.80, cr:1.09,  relVol:111, sentiment:"Neutral"  },
      { ticker:"VRTX",     name:"Vertex Pharma",        cap:"Large-cap",  mktCap:"$122.0B",  price:480.55,  low52:362.50, high52:519.68,  weekly:0.68,   excessXlv:0.23,   ytd:6.29,   pe:31.39, cr:2.90,  relVol:79,  sentiment:"Positive" },
      { ticker:"OTSKY",    name:"Otsuka Holdings",      cap:"Large-cap",  mktCap:"$37.2B",   price:34.08,   low52:21.43,  high52:34.93,   weekly:1.14,   excessXlv:0.70,   ytd:20.00,  pe:15.21, cr:2.17,  relVol:65,  sentiment:"Neutral"  },
      { ticker:"CRSP",     name:"CRISPR Therapeutics",  cap:"Mid-cap",    mktCap:"$5.2B",    price:53.84,   low52:30.04,  high52:78.48,   weekly:1.26,   excessXlv:0.82,   ytd:0.13,   pe:null,  cr:13.32, relVol:52,  sentiment:"Positive" },
      { ticker:"IMCR",     name:"Immunocore",           cap:"Mid-cap",    mktCap:"$1.7B",    price:33.06,   low52:23.15,  high52:40.72,   weekly:2.10,   excessXlv:1.66,   ytd:-2.13,  pe:null,  cr:6.00,  relVol:85,  sentiment:"Neutral"  },
      { ticker:"EVO",      name:"Evotec SE",            cap:"Small-cap",  mktCap:"$1.2B",    price:3.41,    low52:2.84,   high52:4.80,    weekly:-3.40,  excessXlv:-3.84,  ytd:7.23,   pe:null,  cr:2.12,  relVol:120, sentiment:"Neutral"  },
      { ticker:"SANA",     name:"Sana Biotech",         cap:"Small-cap",  mktCap:"$1.1B",    price:4.11,    low52:1.26,   high52:6.55,    weekly:6.62,   excessXlv:6.18,   ytd:-2.03,  pe:null,  cr:4.56,  relVol:39,  sentiment:"Neutral"  },
      { ticker:"LCTX",     name:"Lineage Cell",         cap:"Small-cap",  mktCap:"$414.6M",  price:1.80,    low52:0.37,   high52:2.09,    weekly:7.14,   excessXlv:6.70,   ytd:9.76,   pe:null,  cr:4.50,  relVol:46,  sentiment:"Neutral"  },
      { ticker:"HUMA",     name:"Humacyte",             cap:"Small-cap",  mktCap:"$213.3M",  price:1.11,    low52:0.88,   high52:3.94,    weekly:-3.07,  excessXlv:-3.51,  ytd:13.33,  pe:null,  cr:1.62,  relVol:70,  sentiment:"Neutral"  },
      { ticker:"IPSC",     name:"Century Therapeutics", cap:"Small-cap",  mktCap:"$183.6M",  price:2.10,    low52:0.34,   high52:2.71,    weekly:8.81,   excessXlv:8.36,   ytd:111.06, pe:null,  cr:6.25,  relVol:40,  sentiment:"Neutral"  },
      { ticker:"ELDN",     name:"Eledon Pharma",        cap:"Small-cap",  mktCap:"$176.4M",  price:2.21,    low52:1.35,   high52:4.60,    weekly:4.98,   excessXlv:4.53,   ytd:36.73,  pe:null,  cr:6.74,  relVol:40,  sentiment:"Neutral"  },
      { ticker:"SABS",     name:"SAB Biotherapeutics",  cap:"Small-cap",  mktCap:"$171.4M",  price:3.60,    low52:1.00,   high52:6.60,    weekly:-7.22,  excessXlv:-7.66,  ytd:-4.51,  pe:null,  cr:10.50, relVol:59,  sentiment:"Neutral"  },
      { ticker:"ADOC.PA",  name:"Adocia",               cap:"Small-cap",  mktCap:"$158.2M",  price:8.08,    low52:3.38,   high52:14.64,   weekly:-1.87,  excessXlv:-2.31,  ytd:1.63,   pe:null,  cr:1.14,  relVol:87,  sentiment:"Neutral"  },
      { ticker:"SEOVF",    name:"Sernova",              cap:"Micro-cap",  mktCap:"$33.7M",   price:0.10,    low52:0.09,   high52:0.17,    weekly:0.00,   excessXlv:-0.44,  ytd:11.11,  pe:null,  cr:0.02,  relVol:15,  sentiment:"Neutral"  },
      { ticker:"NXTCL.ST", name:"NextCell Pharma",      cap:"Micro-cap",  mktCap:"$19.0M",   price:0.17,    low52:0.07,   high52:0.42,    weekly:9.22,   excessXlv:8.78,   ytd:119.37, pe:null,  cr:10.02, relVol:67,  sentiment:"Neutral"  },
      { ticker:"NCEL",     name:"NewcelX",              cap:"Micro-cap",  mktCap:"$12.6M",   price:2.77,    low52:1.89,   high52:30.80,   weekly:2.21,   excessXlv:1.77,   ytd:32.54,  pe:null,  cr:0.02,  relVol:5,   sentiment:"Neutral"  },
      { ticker:"CELZ",     name:"Creative Medical",     cap:"Micro-cap",  mktCap:"$6.6M",    price:1.88,    low52:1.50,   high52:6.77,    weekly:2.63,   excessXlv:2.18,   ytd:-4.66,  pe:null,  cr:20.71, relVol:11,  sentiment:"Neutral"  },
      { ticker:"GNPX",     name:"Genprex",              cap:"Micro-cap",  mktCap:"$3.1M",    price:1.91,    low52:1.71,   high52:55.00,   weekly:6.11,   excessXlv:5.67,   ytd:6.70,   pe:null,  cr:0.67,  relVol:32,  sentiment:"Neutral"  },
      { ticker:"FLUI.ST",  name:"Fluicell AB",          cap:"Micro-cap",  mktCap:"$1.8M",    price:1.28,    low52:0.82,   high52:3.32,    weekly:30.34,  excessXlv:29.89,  ytd:16.00,  pe:null,  cr:1.20,  relVol:314, sentiment:"Neutral"  },
    ],
    news: [
      {
        side: "gainer",
        company: "Fluicell AB", ticker: "FLUI.ST", penny: true, sentiment: "Neutral",
        topic: "Q4 Earnings Beat",
        summary: "Q4 2025 revenue surged to SEK 3.8M from just SEK 0.5M a year prior, with operating losses narrowing sharply. Early signs of a genuine commercial inflection — notable for a micro-cap penny stock where moves of this magnitude are common on thin volume.",
        takeaway: "Revenue step-change is encouraging; sustainability of growth trajectory is the key question. As a penny stock, treat the +30% weekly move with appropriate skepticism pending confirmation of the trend in Q1 2026.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "NextCell Pharma", ticker: "NXTCL.ST", penny: true, sentiment: "Neutral",
        topic: "Japan Expansion / Data",
        summary: "Joined Japan's Entry Acceleration Program and presented long-term ProTrans follow-up data showing sustained insulin preservation. As a sub-$1 micro-cap penny stock, the +9% move is within normal weekly volatility bounds.",
        takeaway: "Japan market access opens a new geographic path; long-term data strengthens the clinical narrative. Penny stock status means execution risk and volatility are elevated. Monitor for IND or partnership developments.",
        valImpact: false
      },
      {
        side: "gainer",
        company: "Sana Biotechnology", ticker: "SANA", penny: true, sentiment: "Neutral",
        topic: "CFO Appointment",
        summary: "Brian Piper appointed EVP and CFO, bringing dedicated financial leadership at a stage when capital efficiency and runway management are the company's most critical variables. A penny stock hiring senior finance talent signals awareness of its cash constraints.",
        takeaway: "CFO hire signals tightening focus on capital discipline. Execution and funding runway remain the key watch items for this penny stock. No near-term pipeline catalyst.",
        valImpact: false
      },
      {
        side: "loser",
        company: "Novo Nordisk A/S", ticker: "NVO", penny: false, sentiment: "Negative",
        topic: "Phase 3 Miss / Guidance Cut",
        summary: "CagriSema's Phase 3 REDEFINE 4 trial disappointed: 20.2% weight loss vs. tirzepatide's 23.6%, failing to meet non-inferiority. Novo compounded the miss with a 2026 guidance cut of 5–13%. Shares fell ~18% on the day.",
        takeaway: "Competitive position vs. Lilly structurally weakened; the guidance cut raises franchise durability questions that won't resolve quickly. NVO now trades near multi-year lows with recovery dependent on CagriSema approval and next-gen pipeline.",
        valImpact: true
      },
      {
        side: "loser",
        company: "SAB Biotherapeutics", ticker: "SABS", penny: true, sentiment: "Neutral",
        topic: "Institutional Backing",
        summary: "RTW Investments disclosed a significant new stake — a notable institutional endorsement — yet shares fell 7.2%, suggesting broader selling pressure outweighed the positive signal. As a penny stock, this volatility is not unusual.",
        takeaway: "RTW backing is constructive, but price action indicates the market needs more than investor confidence to re-rate. Penny stock dynamics amplify the noise; a fundamental catalyst is required.",
        valImpact: false
      },
      {
        side: "loser",
        company: "Adocia", ticker: "ADOC.PA", penny: false, sentiment: "Neutral",
        topic: "Q4 Earnings / Business Update",
        summary: "FY 2025 revenue €1.5M vs. €9.3M in 2024 — but the comparison is misleading: 2024 included a one-time $10M Tonghua Dongbao milestone. Cash of €17.2M (vs. €7.5M) funds operations into early 2027 following a €10M December equity raise. BioChaperone Lispro Phase 3 positive in both T1D and T2D in China; new AdoXLong™ monthly platform filed; two undisclosed large pharma feasibility collaborations ongoing. Chairman Gérard Soula stepped down after 20 years; Stéphane Boissel appointed successor.",
        takeaway: "Revenue headline is misleading — strip the 2024 one-time milestone and the business is making progress. Cash runway into 2027 removes near-term dilution risk. China approval for BioChaperone Lispro (triggering a $20M milestone) is the key value catalyst to watch.",
        valImpact: true
      },
    ]
  }
];
