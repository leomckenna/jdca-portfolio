const WEEKS = [
  {
    label: "Week of 04/06/2026",
    asOf: "04/06/2026",
    stats: {
      best:       { val: "+22.2%", sub: "FLUI.ST · Fluicell" },
      worst:      { val: "−15.4%", sub: "GNPX · Genprex" },
      highestYtd: { val: "+119%",  sub: "IPSC · Century Therapeutics" },
      positiveSentiment: { val: "2", sub: "vs. 2 Neg · 17 Neutral" }
    },
    holdings: [
      { ticker:"LLY",      name:"Eli Lilly",           cap:"Large-cap",  mktCap:"$831.4B",  price:928.929,  low52:620.465, high52:1132.060, weekly:5.772,   excessXlv:3.719,   ytd:-13.418,  pe:40.53, cr:1.579,  relVol:96,  sentiment:"Positive" },
      { ticker:"NVO",      name:"Novo Nordisk",         cap:"Large-cap",  mktCap:"$165.3B",  price:37.245,   low52:34.582,  high52:77.683,   weekly:7.134,   excessXlv:5.081,   ytd:-24.114,  pe:10.46, cr:0.800,  relVol:70,  sentiment:"Negative" },
      { ticker:"SNY",      name:"Sanofi",               cap:"Large-cap",  mktCap:"$116.5B",  price:47.850,   low52:43.320,  high52:53.404,   weekly:2.287,   excessXlv:0.235,   ytd:-1.259,   pe:20.54, cr:1.092,  relVol:56,  sentiment:"Negative" },
      { ticker:"VRTX",     name:"Vertex Pharma",        cap:"Large-cap",  mktCap:"$111.0B",  price:437.100,  low52:362.500, high52:510.770,  weekly:0.931,   excessXlv:-1.122,  ytd:-3.587,   pe:28.55, cr:2.901,  relVol:84,  sentiment:"Positive" },
      { ticker:"OTSKY",    name:"Otsuka Holdings",      cap:"Large-cap",  mktCap:"$38.6B",   price:35.800,   low52:21.435,  high52:36.550,   weekly:3.498,   excessXlv:1.446,   ytd:26.368,   pe:16.57, cr:2.165,  relVol:87,  sentiment:"Neutral"  },
      { ticker:"CRSP",     name:"CRISPR Therapeutics",  cap:"Mid-cap",    mktCap:"$4.8B",    price:50.000,   low52:30.040,  high52:78.480,   weekly:9.290,   excessXlv:7.237,   ytd:-4.653,   pe:null,  cr:13.316, relVol:71,  sentiment:"Positive" },
      { ticker:"SANA",     name:"Sana Biotech",         cap:"Small-cap",  mktCap:"$859.9M",  price:3.222,    low52:1.260,   high52:6.550,    weekly:16.329,  excessXlv:14.276,  ytd:-20.828,  pe:null,  cr:1.889,  relVol:80,  sentiment:"Negative" },
      { ticker:"EVO",      name:"Evotec SE",            cap:"Small-cap",  mktCap:"$945.8M",  price:2.640,    low52:2.310,   high52:4.800,    weekly:9.091,   excessXlv:7.039,   ytd:-14.286,  pe:null,  cr:2.118,  relVol:48,  sentiment:"Neutral"  },
      { ticker:"LCTX",     name:"Lineage Cell",         cap:"Small-cap",  mktCap:"$392.3M",  price:1.575,    low52:0.370,   high52:2.090,    weekly:5.705,   excessXlv:3.652,   ytd:-5.689,   pe:null,  cr:5.204,  relVol:50,  sentiment:"Neutral"  },
      { ticker:"IMCR",     name:"Immunocore",           cap:"Small-cap",  mktCap:"$1.6B",    price:31.600,   low52:23.150,  high52:40.715,   weekly:7.337,   excessXlv:5.285,   ytd:-8.960,   pe:null,  cr:4.040,  relVol:113, sentiment:"Neutral"  },
      { ticker:"HUMA",     name:"Humacyte",             cap:"Micro-cap",  mktCap:"$146.5M",  price:0.660,    low52:0.547,   high52:2.930,    weekly:-2.367,  excessXlv:-4.419,  ytd:-31.322,  pe:null,  cr:3.690,  relVol:111, sentiment:"Neutral"  },
      { ticker:"IPSC",     name:"Century Therapeutics", cap:"Small-cap",  mktCap:"$391.8M",  price:2.180,    low52:0.342,   high52:3.040,    weekly:7.921,   excessXlv:5.869,   ytd:119.095,  pe:null,  cr:5.971,  relVol:64,  sentiment:"Neutral"  },
      { ticker:"ELDN",     name:"Eledon Pharma",        cap:"Micro-cap",  mktCap:"$259.6M",  price:3.260,    low52:1.350,   high52:4.600,    weekly:15.194,  excessXlv:13.142,  ytd:115.894,  pe:null,  cr:7.397,  relVol:84,  sentiment:"Neutral"  },
      { ticker:"SABS",     name:"SAB Biotherapeutics",  cap:"Micro-cap",  mktCap:"$268.0M",  price:3.814,    low52:1.000,   high52:6.600,    weekly:-0.935,  excessXlv:-2.987,  ytd:1.978,    pe:null,  cr:9.461,  relVol:107, sentiment:"Neutral"  },
      { ticker:"ADOC.PA",  name:"Adocia",               cap:"Micro-cap",  mktCap:"$105.1M",  price:5.364,    low52:3.815,   high52:14.335,   weekly:-0.322,  excessXlv:-2.374,  ytd:-30.746,  pe:null,  cr:1.136,  relVol:68,  sentiment:"Neutral"  },
      { ticker:"SEOVF",    name:"Sernova",              cap:"Micro-cap",  mktCap:"$40.0M",   price:0.110,    low52:0.090,   high52:0.170,    weekly:0.000,   excessXlv:-2.052,  ytd:22.222,   pe:null,  cr:0.030,  relVol:14,  sentiment:"Neutral"  },
      { ticker:"NXTCL.ST", name:"NextCell Pharma",      cap:"Micro-cap",  mktCap:"$14.4M",   price:0.129,    low52:0.067,   high52:0.340,    weekly:-6.327,  excessXlv:-8.379,  ytd:66.074,   pe:null,  cr:5.157,  relVol:69,  sentiment:"Neutral"  },
      { ticker:"NCEL",     name:"NewcelX",              cap:"Micro-cap",  mktCap:"$10.0M",   price:2.200,    low52:1.830,   high52:30.800,   weekly:-0.901,  excessXlv:-2.953,  ytd:15.789,   pe:null,  cr:0.023,  relVol:36,  sentiment:"Neutral"  },
      { ticker:"FLUI.ST",  name:"Fluicell",             cap:"Micro-cap",  mktCap:"$2.1M",    price:1.521,    low52:0.792,   high52:3.191,    weekly:22.222,  excessXlv:20.170,  ytd:43.000,   pe:null,  cr:1.003,  relVol:63,  sentiment:"Neutral"  },
      { ticker:"CELZ",     name:"Creative Medical",     cap:"Micro-cap",  mktCap:"$7.7M",    price:2.080,    low52:1.504,   high52:6.250,    weekly:5.584,   excessXlv:3.532,   ytd:6.122,    pe:null,  cr:25.972, relVol:38,  sentiment:"Neutral"  },
      { ticker:"GNPX",     name:"Genprex",              cap:"Micro-cap",  mktCap:"$3.6M",    price:1.540,    low52:1.430,   high52:55.000,   weekly:-15.385, excessXlv:-17.437, ytd:-12.000,  pe:null,  cr:3.843,  relVol:40,  sentiment:"Neutral"  }
    ],
    news: [
      {
        side: "gainer",
        company: "Sana Biotechnology",
        ticker: "SANA",
        penny: true,
        sentiment: "Negative",
        topic: "Pharma Tariff Relief / Biotech Rally",
        summary: "SANA rebounded ~16% this week, snapping a three-week losing streak. The primary driver appears to be sector-wide relief following Trump's April 2 pharmaceutical tariff announcement, which included broad exemptions for generics, biosimilars, and companies with MFN pricing deals — effectively excluding most of the JDCA portfolio, including cell therapy and gene therapy names like SANA.",
        takeaway: "No company-specific catalyst — the move is macro-driven. The tariff news removed a big overhang that had been weighing on biotech broadly. The underlying SANA story hasn't changed: strong 14-month T1D data, SC451 IND expected this year, and a cash runway that needs extending into 2027. A fundraise announcement remains the key near-term risk.",
        valImpact: false
      },
      {
        side: "gainer",
        company: "Eledon Pharmaceuticals",
        ticker: "ELDN",
        penny: true,
        sentiment: "Neutral",
        topic: "Continued Momentum / Tariff Tailwind",
        summary: "ELDN gained ~15%, likely benefiting from the same broad biotech relief rally following the pharma tariff announcement. Eledon's tegoprubart is an antibody therapy in clinical development — not an imported patented drug — so it is not directly affected by the tariffs. No new company-specific news this week.",
        takeaway: "The strong YTD run (+116%) reflects accumulating clinical momentum from the tegoprubart data across kidney and islet transplantation, and the stock appears to be benefiting from general sector rotation into biotech this week. The upcoming FDA guidance meeting on Phase 3 kidney trial design remains the next key catalyst.",
        valImpact: false
      },
      {
        side: "gainer",
        company: "CRISPR Therapeutics",
        ticker: "CRSP",
        penny: false,
        sentiment: "Positive",
        topic: "Biotech Rally / Tariff Exemptions",
        summary: "CRSP gained ~9%, recovering some of the ground lost from the March convertible note offering selloff. Biosimilars and gene therapy products are explicitly exempt from the new pharma tariffs, which is directly relevant to CASGEVY and the broader pipeline. No new company-specific catalyst this week.",
        takeaway: "The tariff exemption for gene therapies and biosimilars is a meaningful positive for CRSP specifically. The convertible note overhang from March appears to be fading — CASGEVY commercial momentum and the upcoming CTX310/CTX611 data in H2 2026 remain the fundamental thesis.",
        valImpact: false
      },
      {
        side: "loser",
        company: "Genprex",
        ticker: "GNPX",
        penny: true,
        sentiment: "Neutral",
        topic: "No Catalyst / Thin Volume Drift",
        summary: "GNPX fell ~15% with no company-specific news, in very thin trading — only 299K shares changed hands vs. a 100-day average of 742K. The stock is still up ~6% YTD despite the move.",
        takeaway: "Nothing to read into — this is a micro-cap penny stock with extremely thin volume where a small amount of selling can cause outsized price moves. The last meaningful update was attendance at BIO Europe Spring in late March.",
        valImpact: false
      }
    ]
  },
  {
    label: "Week of 03/30/2026",
    asOf: "03/30/2026",
    stats: {
      best:       { val: "+9.1%",  sub: "SEOVF · Sernova" },
      worst:      { val: "−23.7%", sub: "HUMA · Humacyte" },
      highestYtd: { val: "+102%",  sub: "IPSC · Century Therapeutics" },
      positiveSentiment: { val: "2", sub: "vs. 2 Neg · 17 Neutral" }
    },
    holdings: [
      { ticker:"LLY",      name:"Eli Lilly",           cap:"Large-cap",  mktCap:"$799.5B",  price:892.960,  low52:620.465, high52:1132.060, weekly:-1.932,  excessXlv:-1.697,  ytd:-16.771,  pe:38.97, cr:1.579,  relVol:59,  sentiment:"Positive" },
      { ticker:"NVO",      name:"Novo Nordisk",         cap:"Large-cap",  mktCap:"$158.3B",  price:35.390,   low52:35.140,  high52:80.533,   weekly:-3.884,  excessXlv:-3.649,  ytd:-30.444,  pe:9.94,  cr:0.800,  relVol:62,  sentiment:"Negative" },
      { ticker:"SNY",      name:"Sanofi",               cap:"Large-cap",  mktCap:"$114.1B",  price:46.845,   low52:43.320,  high52:53.624,   weekly:4.635,   excessXlv:4.870,   ytd:-3.333,   pe:20.11, cr:1.092,  relVol:59,  sentiment:"Negative" },
      { ticker:"VRTX",     name:"Vertex Pharma",        cap:"Large-cap",  mktCap:"$111.1B",  price:437.240,  low52:362.500, high52:510.770,  weekly:-3.103,  excessXlv:-2.868,  ytd:-3.556,   pe:28.52, cr:2.901,  relVol:77,  sentiment:"Positive" },
      { ticker:"OTSKY",    name:"Otsuka Holdings",      cap:"Large-cap",  mktCap:"$37.1B",   price:34.930,   low52:21.435,  high52:36.060,   weekly:6.332,   excessXlv:6.567,   ytd:23.297,   pe:16.25, cr:2.165,  relVol:124, sentiment:"Neutral"  },
      { ticker:"CRSP",     name:"CRISPR Therapeutics",  cap:"Mid-cap",    mktCap:"$4.4B",    price:45.600,   low52:30.040,  high52:78.480,   weekly:-2.730,  excessXlv:-2.496,  ytd:-13.043,  pe:null,  cr:13.316, relVol:52,  sentiment:"Positive" },
      { ticker:"SANA",     name:"Sana Biotech",         cap:"Small-cap",  mktCap:"$731.2M",  price:2.740,    low52:1.260,   high52:6.550,    weekly:-12.179, excessXlv:-11.945, ytd:-32.678,  pe:null,  cr:1.889,  relVol:74,  sentiment:"Negative" },
      { ticker:"EVO",      name:"Evotec SE",            cap:"Small-cap",  mktCap:"$856.2M",  price:2.390,    low52:2.310,   high52:4.800,    weekly:0.420,   excessXlv:0.655,   ytd:-22.403,  pe:null,  cr:2.118,  relVol:42,  sentiment:"Neutral"  },
      { ticker:"LCTX",     name:"Lineage Cell",         cap:"Small-cap",  mktCap:"$369.9M",  price:1.485,    low52:0.370,   high52:2.090,    weekly:1.020,   excessXlv:1.255,   ytd:-11.078,  pe:null,  cr:5.204,  relVol:63,  sentiment:"Neutral"  },
      { ticker:"IMCR",     name:"Immunocore",           cap:"Small-cap",  mktCap:"$1.5B",    price:29.160,   low52:23.150,  high52:40.715,   weekly:-3.921,  excessXlv:-3.686,  ytd:-15.990,  pe:null,  cr:4.040,  relVol:92,  sentiment:"Neutral"  },
      { ticker:"HUMA",     name:"Humacyte",             cap:"Micro-cap",  mktCap:"$141.3M",  price:0.648,    low52:0.645,   high52:2.930,    weekly:-23.718, excessXlv:-23.483, ytd:-32.529,  pe:null,  cr:3.690,  relVol:127, sentiment:"Neutral"  },
      { ticker:"IPSC",     name:"Century Therapeutics", cap:"Small-cap",  mktCap:"$360.3M",  price:2.005,    low52:0.342,   high52:3.040,    weekly:-15.401, excessXlv:-15.166, ytd:101.508,  pe:null,  cr:5.971,  relVol:69,  sentiment:"Neutral"  },
      { ticker:"ELDN",     name:"Eledon Pharma",        cap:"Micro-cap",  mktCap:"$218.6M",  price:2.755,    low52:1.350,   high52:4.600,    weekly:-11.129, excessXlv:-10.894, ytd:82.450,   pe:null,  cr:7.397,  relVol:54,  sentiment:"Neutral"  },
      { ticker:"SABS",     name:"SAB Biotherapeutics",  cap:"Micro-cap",  mktCap:"$268.7M",  price:3.824,    low52:1.000,   high52:6.600,    weekly:-2.697,  excessXlv:-2.462,  ytd:2.245,    pe:null,  cr:9.461,  relVol:130, sentiment:"Neutral"  },
      { ticker:"ADOC.PA",  name:"Adocia",               cap:"Micro-cap",  mktCap:"$104.6M",  price:5.337,    low52:3.282,   high52:14.232,   weekly:-12.098, excessXlv:-11.863, ytd:-30.597,  pe:null,  cr:1.136,  relVol:87,  sentiment:"Neutral"  },
      { ticker:"SEOVF",    name:"Sernova",              cap:"Micro-cap",  mktCap:"$43.4M",   price:0.120,    low52:0.090,   high52:0.170,    weekly:9.091,   excessXlv:9.326,   ytd:33.333,   pe:null,  cr:0.030,  relVol:74,  sentiment:"Neutral"  },
      { ticker:"NXTCL.ST", name:"NextCell Pharma",      cap:"Micro-cap",  mktCap:"$14.2M",   price:0.128,    low52:0.066,   high52:0.340,    weekly:-4.403,  excessXlv:-4.168,  ytd:66.347,   pe:null,  cr:5.157,  relVol:77,  sentiment:"Neutral"  },
      { ticker:"NCEL",     name:"NewcelX",              cap:"Micro-cap",  mktCap:"$9.8M",    price:2.150,    low52:1.890,   high52:30.800,   weekly:-12.245, excessXlv:-12.010, ytd:13.158,   pe:null,  cr:0.023,  relVol:9,   sentiment:"Neutral"  },
      { ticker:"FLUI.ST",  name:"Fluicell",             cap:"Micro-cap",  mktCap:"$1.6M",    price:1.134,    low52:0.782,   high52:3.151,    weekly:-9.244,  excessXlv:-9.009,  ytd:8.000,    pe:null,  cr:1.003,  relVol:40,  sentiment:"Neutral"  },
      { ticker:"CELZ",     name:"Creative Medical",     cap:"Micro-cap",  mktCap:"$7.4M",    price:1.990,    low52:1.504,   high52:6.250,    weekly:6.989,   excessXlv:7.224,   ytd:1.531,    pe:null,  cr:25.972, relVol:33,  sentiment:"Neutral"  },
      { ticker:"GNPX",     name:"Genprex",              cap:"Micro-cap",  mktCap:"$3.0M",    price:1.858,    low52:1.710,   high52:55.000,   weekly:-2.723,  excessXlv:-2.488,  ytd:6.171,    pe:null,  cr:0.672,  relVol:19,  sentiment:"Neutral"  }
    ],
    news: [
      {
        side: "gainer",
        company: "Sanofi",
        ticker: "SNY",
        penny: false,
        sentiment: "Negative",
        topic: "Pipeline Wins / Dupixent Japan",
        summary: "SNY rose ~5% on a cluster of positive news: Dupixent was approved in Japan for bullous pemphigoid (a rare blistering skin disease), and the FDA granted breakthrough therapy designation for venglustat in type 3 Gaucher disease, which can fast-track its path to approval.",
        takeaway: "Two regulatory wins in one week is a meaningful shift for a stock in a long downtrend. The sell-side is warming back up after Berenberg and Bernstein both initiated with bullish ratings last week. The big catalyst still ahead is the amlitelimab Phase 3 data readout.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "Otsuka Holdings",
        ticker: "OTSKY",
        penny: false,
        sentiment: "Neutral",
        topic: "Continued Momentum",
        summary: "OTSKY gained another ~6% with no new specific catalyst, extending last week's earnings-driven rally. The stock is now up over 23% YTD and approaching its 52-week high. The ¥50B share buyback announced two weeks ago continues to support the stock.",
        takeaway: "Back-to-back strong weeks on the heels of solid earnings and a buyback. Confirmatory kidney function data for Voyxact, expected sometime in 2026, remains the next meaningful catalyst.",
        valImpact: false
      },
      {
        side: "gainer",
        company: "Sernova Biotherapeutics",
        ticker: "SEOVF",
        penny: true,
        sentiment: "Neutral",
        topic: "AGM Approaching / Debt Vote",
        summary: "SEOVF rose ~9% in thin trading ahead of its April 8 shareholder meeting, where investors will vote to approve the $4M insider-backed financing announced last month. If approved, proceeds will pay off a loan maturing April 16 and remove the near-term debt pressure.",
        takeaway: "The vote is the key event. If it passes, the April debt maturity is off the table and Sernova has more breathing room to advance its T1D Cell Pouch program. Very thinly traded — the move can reverse just as quickly.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Humacyte",
        ticker: "HUMA",
        penny: true,
        sentiment: "Neutral",
        topic: "Q4 Earnings Miss",
        summary: "HUMA fell another ~24% after Q4 earnings on March 27 badly missed expectations — revenue of just $500K against estimates of $1.35M, with only 61 Symvess units sold in its entire first commercial year. The stock hit a new all-time low.",
        takeaway: "The product works — the problem is getting hospitals to adopt it, which takes time and salesforce investment Humacyte doesn't currently have. The company is guiding for $10M in 2026 revenue, but after Q4, that target looks like a stretch. A partnership deal or bigger hospital rollout would be the fastest path to changing the narrative.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Century Therapeutics",
        ticker: "IPSC",
        penny: true,
        sentiment: "Neutral",
        topic: "Momentum Unwind",
        summary: "IPSC fell another ~15% with no new news, continuing the pullback from its mid-March peak near $3. The stock is still up over 100% YTD but has given back roughly a third of its gains in three weeks.",
        takeaway: "No fundamental change — this is momentum unwinding in a thinly traded stock after a huge run. Balance sheet is solid after the January raise, and the CNTY-813 T1D program is the thesis. Watch for IND submission news as the next potential catalyst.",
        valImpact: false
      },
      {
        side: "loser",
        company: "Sana Biotechnology",
        ticker: "SANA",
        penny: true,
        sentiment: "Negative",
        topic: "Cash Runway Pressure",
        summary: "SANA fell ~12% this week with no new news, now down ~33% YTD. Cash runway only extends into late 2026, and the market is pricing in the likelihood of another fundraise before SC451 generates any clinical data.",
        takeaway: "The 14-month T1D data is the best in class and the science is compelling. But the funding clock is the main story right now — any capital raise announcement or partnership deal would be a meaningful stabilizer.",
        valImpact: true
      }
    ]
  },
  {
    label: "Week of 03/23/2026",
    asOf: "03/23/2026",
    stats: {
      best:       { val: "+10.6%", sub: "ELDN · Eledon Pharma" },
      worst:      { val: "−26.0%", sub: "HUMA · Humacyte" },
      highestYtd: { val: "+124%",  sub: "IPSC · Century Therapeutics" },
      positiveSentiment: { val: "2", sub: "vs. 2 Neg · 17 Neutral" }
    },
    holdings: [
      { ticker:"LLY",      name:"Eli Lilly",           cap:"Large-cap",  mktCap:"$826.7B",  price:923.620,  low52:620.465, high52:1132.060, weekly:-6.622,  excessXlv:-2.894,  ytd:-13.913,  pe:40.26, cr:1.579,  relVol:100, sentiment:"Positive" },
      { ticker:"NVO",      name:"Novo Nordisk",         cap:"Large-cap",  mktCap:"$162.8B",  price:36.515,   low52:35.850,  high52:80.533,   weekly:-5.353,  excessXlv:-1.624,  ytd:-28.233,  pe:10.34, cr:0.800,  relVol:84,  sentiment:"Negative" },
      { ticker:"SNY",      name:"Sanofi",               cap:"Large-cap",  mktCap:"$109.2B",  price:44.830,   low52:43.320,  high52:55.156,   weekly:1.933,   excessXlv:5.661,   ytd:-7.491,   pe:19.41, cr:1.092,  relVol:119, sentiment:"Negative" },
      { ticker:"VRTX",     name:"Vertex Pharma",        cap:"Large-cap",  mktCap:"$115.4B",  price:454.220,  low52:362.500, high52:513.980,  weekly:-2.549,  excessXlv:1.179,   ytd:0.190,    pe:29.69, cr:2.901,  relVol:92,  sentiment:"Positive" },
      { ticker:"OTSKY",    name:"Otsuka Holdings",      cap:"Large-cap",  mktCap:"$34.8B",   price:32.850,   low52:21.435,  high52:36.060,   weekly:-4.144,  excessXlv:-0.415,  ytd:15.955,   pe:15.38, cr:2.165,  relVol:149, sentiment:"Neutral"  },
      { ticker:"CRSP",     name:"CRISPR Therapeutics",  cap:"Mid-cap",    mktCap:"$4.5B",    price:47.270,   low52:30.040,  high52:78.480,   weekly:-2.375,  excessXlv:1.353,   ytd:-9.859,   pe:null,  cr:13.316, relVol:87,  sentiment:"Positive" },
      { ticker:"SANA",     name:"Sana Biotech",         cap:"Small-cap",  mktCap:"$836.6M",  price:3.135,    low52:1.260,   high52:6.550,    weekly:-4.128,  excessXlv:-0.400,  ytd:-22.973,  pe:null,  cr:1.889,  relVol:96,  sentiment:"Negative" },
      { ticker:"EVO",      name:"Evotec SE",            cap:"Small-cap",  mktCap:"$865.2M",  price:2.415,    low52:2.310,   high52:4.800,    weekly:-0.207,  excessXlv:3.522,   ytd:-21.591,  pe:null,  cr:2.118,  relVol:69,  sentiment:"Neutral"  },
      { ticker:"LCTX",     name:"Lineage Cell",         cap:"Small-cap",  mktCap:"$364.9M",  price:1.465,    low52:0.370,   high52:2.090,    weekly:-8.437,  excessXlv:-4.709,  ytd:-12.275,  pe:null,  cr:5.204,  relVol:71,  sentiment:"Neutral"  },
      { ticker:"IMCR",     name:"Immunocore",           cap:"Small-cap",  mktCap:"$1.6B",    price:30.825,   low52:23.150,  high52:40.715,   weekly:0.834,   excessXlv:4.562,   ytd:-11.193,  pe:null,  cr:4.040,  relVol:64,  sentiment:"Neutral"  },
      { ticker:"HUMA",     name:"Humacyte",             cap:"Micro-cap",  mktCap:"$159.9M",  price:0.829,    low52:0.701,   high52:3.360,    weekly:-26.018, excessXlv:-22.290, ytd:-13.777,  pe:null,  cr:1.616,  relVol:343, sentiment:"Neutral"  },
      { ticker:"IPSC",     name:"Century Therapeutics", cap:"Small-cap",  mktCap:"$400.8M",  price:2.230,    low52:0.342,   high52:3.040,    weekly:-8.230,  excessXlv:-4.502,  ytd:124.121,  pe:null,  cr:5.971,  relVol:127, sentiment:"Neutral"  },
      { ticker:"ELDN",     name:"Eledon Pharma",        cap:"Micro-cap",  mktCap:"$241.5M",  price:3.030,    low52:1.350,   high52:4.600,    weekly:10.584,  excessXlv:14.312,  ytd:100.662,  pe:null,  cr:7.397,  relVol:139, sentiment:"Neutral"  },
      { ticker:"SABS",     name:"SAB Biotherapeutics",  cap:"Micro-cap",  mktCap:"$197.7M",  price:3.880,    low52:1.000,   high52:6.600,    weekly:-1.523,  excessXlv:2.205,   ytd:3.743,    pe:null,  cr:9.461,  relVol:278, sentiment:"Neutral"  },
      { ticker:"ADOC.PA",  name:"Adocia",               cap:"Micro-cap",  mktCap:"$121.3M",  price:6.191,    low52:3.316,   high52:14.375,   weekly:-8.247,  excessXlv:-4.519,  ytd:-20.299,  pe:null,  cr:1.136,  relVol:85,  sentiment:"Neutral"  },
      { ticker:"SEOVF",    name:"Sernova",              cap:"Micro-cap",  mktCap:"$43.3M",   price:0.110,    low52:0.090,   high52:0.170,    weekly:-8.333,  excessXlv:-4.605,  ytd:22.222,   pe:null,  cr:0.030,  relVol:53,  sentiment:"Neutral"  },
      { ticker:"NXTCL.ST", name:"NextCell Pharma",      cap:"Micro-cap",  mktCap:"$15.2M",   price:0.136,    low52:0.068,   high52:0.347,    weekly:4.262,   excessXlv:7.991,   ytd:74.008,   pe:null,  cr:5.157,  relVol:52,  sentiment:"Neutral"  },
      { ticker:"NCEL",     name:"NewcelX",              cap:"Micro-cap",  mktCap:"$11.0M",   price:2.410,    low52:1.890,   high52:30.800,   weekly:-9.738,  excessXlv:-6.010,  ytd:26.842,   pe:null,  cr:0.023,  relVol:6,   sentiment:"Neutral"  },
      { ticker:"CELZ",     name:"Creative Medical",     cap:"Micro-cap",  mktCap:"$6.5M",    price:1.865,    low52:1.504,   high52:6.250,    weekly:-1.842,  excessXlv:1.886,   ytd:-4.847,   pe:null,  cr:20.706, relVol:25,  sentiment:"Neutral"  },
      { ticker:"GNPX",     name:"Genprex",              cap:"Micro-cap",  mktCap:"$4.4M",    price:1.920,    low52:1.710,   high52:55.000,   weekly:-7.246,  excessXlv:-3.518,  ytd:9.714,    pe:null,  cr:0.672,  relVol:43,  sentiment:"Neutral"  },
      { ticker:"FLUI.ST",  name:"Fluicell",             cap:"Micro-cap",  mktCap:"$1.8M",    price:1.276,    low52:0.799,   high52:3.216,    weekly:10.185,  excessXlv:13.913,  ytd:19.000,   pe:null,  cr:1.003,  relVol:55,  sentiment:"Neutral"  }
    ],
    news: [
      {
        side: "gainer",
        company: "Eledon Pharmaceuticals",
        ticker: "ELDN",
        penny: true,
        sentiment: "Neutral",
        topic: "FY2025 Earnings / Clinical Data",
        summary: "ELDN jumped ~11% on a strong week of news: FY2025 results on March 19 highlighted over 100 patients treated with tegoprubart across transplant programs. Separately, updated islet transplant data from UChicago showed 10 out of 10 patients achieved insulin independence, with mean HbA1c of ~5.35% and no rejection events.",
        takeaway: "The islet data is directly relevant to JDCA — tegoprubart is emerging as a leading immunosuppression-free option for islet transplantation. Strong Buy consensus with an average analyst target around $9. Phase 3 regulatory engagement is the next milestone to watch.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Humacyte",
        ticker: "HUMA",
        penny: true,
        sentiment: "Neutral",
        topic: "Dilutive Equity Offering",
        summary: "HUMA fell 26% after announcing it was raising $20M by selling new shares at a price well below where the stock had been trading — a sign the company had limited options and needed cash quickly. For context, Humacyte makes Symvess, a bioengineered blood vessel used in trauma surgery, but sold only 61 units in all of 2025, generating less than $2M in revenue.",
        takeaway: "The fundraising was necessary but the terms were painful for existing shareholders. The product works — it just hasn't found its commercial footing yet. Upcoming earnings on March 27 and results from a Phase 3 dialysis trial are the next things to watch. Also worth noting: Sanofi (SNY) holds a strategic investment in Humacyte, so HUMA weakness is a small indirect drag on SNY as well.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Lineage Cell Therapeutics",
        ticker: "LCTX",
        penny: true,
        sentiment: "Neutral",
        topic: "Continued Weakness / No New Catalyst",
        summary: "LCTX fell another 8% with no new company-specific news, extending its slide from the prior two weeks despite the strong Q4 earnings beat and CEO share purchase.",
        takeaway: "Looks like sector-level selling, not LCTX-specific. OpRegen remains the key catalyst to watch.",
        valImpact: false
      },
      {
        side: "loser",
        company: "NewcelX",
        ticker: "NCEL",
        penny: true,
        sentiment: "Neutral",
        topic: "Pullback / No Catalyst",
        summary: "NCEL fell ~10% with no new news, giving back some recent gains. Still up ~27% YTD.",
        takeaway: "Normal micro-cap volatility on thin volume. No fundamental change — the NCEL-101/Eledon partnership remains the story.",
        valImpact: false
      },
      {
        side: "neutral",
        company: "Sanofi",
        ticker: "SNY",
        penny: false,
        sentiment: "Negative",
        topic: "Venglustat Earns FDA Breakthrough Therapy Designation / JAK-ROCK Licensing Deal",
        summary: "Two meaningful developments for SNY this week. On March 18, the FDA granted Breakthrough Therapy designation to venglustat for type 3 Gaucher disease (GD3), a rare neurological disorder with no currently approved treatments. The designation was based on Phase 3 LEAP2MONO data showing venglustat outperformed standard enzyme replacement therapy on neurological endpoints. Sanofi plans to pursue global regulatory filings for venglustat in GD3 during 2026. Separately, Sanofi agreed to pay up to $1.53 billion for global rights to a first-in-class JAK/ROCK inhibitor (rovadicitinib) from China's Sino Biopharmaceutical — a dual-mechanism compound with both anti-inflammatory and anti-fibrotic effects already approved in China for myelofibrosis.",
        takeaway: "The BTD for venglustat adds a concrete rare disease catalyst and accelerates the regulatory timeline — a meaningful pipeline win at a time when Sanofi's stock is down ~7% YTD. The Sino deal expands the immunology/inflammation pipeline with an asset that's already been de-risked through Chinese approval, though $1.53B in potential payments is a large commitment. Neither news moved the stock significantly this week, as the market remains focused on longer-term Dupixent replacement concerns, but both are incremental positives for the pipeline story.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "Immunocore",
        ticker: "IMCR",
        penny: false,
        sentiment: "Neutral",
        topic: "KIMMTRAK 5-Year OS Data to Be Presented at AACR",
        summary: "On March 17, Immunocore announced it will present 5-year overall survival data from the KIMMTRAK Phase 3 trial at the AACR Annual Meeting in April — the longest OS follow-up in any randomized trial for metastatic uveal melanoma. The data will be released at the time of the oral presentation.",
        takeaway: "Five-year OS data in uveal melanoma is a milestone readout — it will either reinforce KIMMTRAK's survival advantage or raise questions about durability. IMCR has $864M in cash, multiple Phase 3 trials underway, and a pipeline extending into autoimmune disease (including an early-stage T1D program). The AACR presentation is the near-term catalyst to watch.",
        valImpact: true
      }
    ]
  },
  {
    label: "Week of 03/16/2026",
    asOf: "03/16/2026",
    stats: {
      best:       { val: "+10.4%", sub: "OTSKY · Otsuka Holdings" },
      worst:      { val: "−20.0%", sub: "EVO · Evotec SE" },
      highestYtd: { val: "+144%",  sub: "IPSC · Century Therapeutics" },
      positiveSentiment: { val: "2", sub: "vs. 2 Neg · 17 Neutral" }
    },
    holdings: [
      { ticker:"LLY",      name:"Eli Lilly",           cap:"Large-cap",  mktCap:"$881.5B",  price:985.21,  low52:620.46,  high52:1132.06, weekly:-2.299,  excessXlv:-1.047,  ytd:-8.172,   pe:42.91, cr:1.579,  relVol:51,  sentiment:"Positive" },
      { ticker:"NVO",      name:"Novo Nordisk",         cap:"Large-cap",  mktCap:"$171.5B",  price:38.445,  low52:35.850,  high52:80.533,  weekly:-3.356,  excessXlv:-2.104,  ytd:-24.440,  pe:10.80, cr:0.800,  relVol:65,  sentiment:"Negative" },
      { ticker:"SNY",      name:"Sanofi",               cap:"Large-cap",  mktCap:"$106.4B",  price:44.060,  low52:43.340,  high52:56.659,  weekly:-0.654,  excessXlv:0.598,   ytd:-9.080,   pe:18.99, cr:1.092,  relVol:106, sentiment:"Negative" },
      { ticker:"VRTX",     name:"Vertex Pharma",        cap:"Large-cap",  mktCap:"$117.6B",  price:462.970, low52:362.500, high52:519.680, weekly:0.456,   excessXlv:1.707,   ytd:2.120,    pe:30.26, cr:2.901,  relVol:124, sentiment:"Positive" },
      { ticker:"OTSKY",    name:"Otsuka Holdings",      cap:"Large-cap",  mktCap:"$38.1B",   price:34.950,  low52:21.435,  high52:36.060,  weekly:10.392,  excessXlv:11.643,  ytd:23.367,   pe:16.26, cr:2.165,  relVol:102, sentiment:"Neutral"  },
      { ticker:"CRSP",     name:"CRISPR Therapeutics",  cap:"Mid-cap",    mktCap:"$4.7B",    price:48.622,  low52:30.040,  high52:78.480,  weekly:-17.281, excessXlv:-16.029, ytd:-7.281,   pe:null,  cr:13.316, relVol:220, sentiment:"Positive" },
      { ticker:"SANA",     name:"Sana Biotech",         cap:"Small-cap",  mktCap:"$875.3M",  price:3.280,   low52:1.260,   high52:6.550,   weekly:-1.502,  excessXlv:-0.250,  ytd:-19.410,  pe:null,  cr:1.889,  relVol:82,  sentiment:"Negative" },
      { ticker:"EVO",      name:"Evotec SE",            cap:"Small-cap",  mktCap:"$868.7M",  price:2.425,   low52:2.310,   high52:4.800,   weekly:-19.967, excessXlv:-18.715, ytd:-21.266,  pe:null,  cr:2.118,  relVol:144, sentiment:"Neutral"  },
      { ticker:"LCTX",     name:"Lineage Cell",         cap:"Small-cap",  mktCap:"$372.0M",  price:1.615,   low52:0.370,   high52:2.090,   weekly:-8.757,  excessXlv:-7.505,  ytd:-3.293,   pe:null,  cr:5.204,  relVol:97,  sentiment:"Neutral"  },
      { ticker:"IMCR",     name:"Immunocore",           cap:"Small-cap",  mktCap:"$1.6B",    price:30.630,  low52:23.150,  high52:40.715,  weekly:-8.321,  excessXlv:-7.069,  ytd:-11.755,  pe:null,  cr:4.040,  relVol:71,  sentiment:"Neutral"  },
      { ticker:"HUMA",     name:"Humacyte",             cap:"Micro-cap",  mktCap:"$217.8M",  price:1.129,   low52:0.880,   high52:3.360,   weekly:-5.942,  excessXlv:-4.690,  ytd:17.451,   pe:null,  cr:1.616,  relVol:75,  sentiment:"Neutral"  },
      { ticker:"IPSC",     name:"Century Therapeutics", cap:"Micro-cap",  mktCap:"$436.7M",  price:2.430,   low52:0.342,   high52:3.040,   weekly:-17.347, excessXlv:-16.095, ytd:144.221,  pe:null,  cr:5.971,  relVol:81,  sentiment:"Neutral"  },
      { ticker:"ELDN",     name:"Eledon Pharma",        cap:"Micro-cap",  mktCap:"$217.4M",  price:2.730,   low52:1.350,   high52:4.600,   weekly:-5.862,  excessXlv:-4.610,  ytd:80.795,   pe:null,  cr:6.736,  relVol:70,  sentiment:"Neutral"  },
      { ticker:"SABS",     name:"SAB Biotherapeutics",  cap:"Micro-cap",  mktCap:"$191.4M",  price:4.025,   low52:1.000,   high52:6.600,   weekly:4.818,   excessXlv:6.069,   ytd:7.620,    pe:null,  cr:9.461,  relVol:419, sentiment:"Neutral"  },
      { ticker:"ADOC.PA",  name:"Adocia",               cap:"Micro-cap",  mktCap:"$131.4M",  price:6.707,   low52:3.296,   high52:14.291,  weekly:-6.731,  excessXlv:-5.479,  ytd:-13.134,  pe:null,  cr:1.136,  relVol:75,  sentiment:"Neutral"  },
      { ticker:"SEOVF",    name:"Sernova",              cap:"Micro-cap",  mktCap:"$40.6M",   price:0.120,   low52:0.090,   high52:0.170,   weekly:0.000,   excessXlv:1.252,   ytd:33.333,   pe:null,  cr:null,   relVol:232, sentiment:"Neutral"  },
      { ticker:"NXTCL.ST", name:"NextCell Pharma",      cap:"Micro-cap",  mktCap:"$14.6M",   price:0.131,   low52:0.068,   high52:0.375,   weekly:-3.633,  excessXlv:-2.382,  ytd:66.895,   pe:null,  cr:5.157,  relVol:41,  sentiment:"Neutral"  },
      { ticker:"NCEL",     name:"NewcelX",              cap:"Micro-cap",  mktCap:"$12.1M",   price:2.650,   low52:1.890,   high52:30.800,  weekly:-3.281,  excessXlv:-2.029,  ytd:39.479,   pe:null,  cr:0.023,  relVol:18,  sentiment:"Neutral"  },
      { ticker:"CELZ",     name:"Creative Medical",     cap:"Micro-cap",  mktCap:"$6.7M",    price:1.925,   low52:1.504,   high52:6.250,   weekly:0.785,   excessXlv:2.037,   ytd:-1.786,   pe:null,  cr:20.706, relVol:13,  sentiment:"Neutral"  },
      { ticker:"GNPX",     name:"Genprex",              cap:"Micro-cap",  mktCap:"$3.4M",    price:2.100,   low52:1.710,   high52:55.000,  weekly:6.061,   excessXlv:7.312,   ytd:20.000,   pe:null,  cr:0.672,  relVol:49,  sentiment:"Neutral"  },
      { ticker:"FLUI.ST",  name:"Fluicell",             cap:"Micro-cap",  mktCap:"$1.6M",    price:1.158,   low52:0.799,   high52:3.218,   weekly:4.854,   excessXlv:6.106,   ytd:8.000,    pe:null,  cr:1.003,  relVol:24,  sentiment:"Neutral"  }
    ],
    news: [
      {
        side: "gainer",
        company: "Otsuka Holdings",
        ticker: "OTSKY",
        penny: false,
        sentiment: "Neutral",
        topic: "FY2025 Earnings / Share Buyback",
        summary: "OTSKY gained 10% after reporting FY2025 results: revenue up 6% to ¥2.47 trillion, with profit also rising. Otsuka also announced a ¥50B share buyback. Voyxact, its first-in-class kidney drug approved by the FDA in November 2025, is ramping up with confirmatory trial data expected soon.",
        takeaway: "Solid earnings beat plus a buyback is a clean combination. The Voyxact launch adds a new growth driver. Analyst ratings are mixed — Goldman and Zacks recently downgraded — so the long-term re-rating will depend on that confirmatory data.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "SAB Biotherapeutics",
        ticker: "SABS",
        penny: true,
        sentiment: "Neutral",
        topic: "Phase 1 Data / Analyst Upgrades",
        summary: "SABS rose ~5% after presenting new Phase 1 data on March 10 showing SAB-142 preserved C-peptide levels in adults with established T1D — a meaningful signal for a disease-modifying effect. Chardan raised its price target to $14 and Craig-Hallum maintained Buy.",
        takeaway: "The data support moving forward in the SAFEGUARD Phase 2b trial and reinforce the T1D thesis. Cash runway through 2028 removes near-term financing risk. Still a small, thinly traded stock with a long road to any approval.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Evotec SE",
        ticker: "EVO",
        penny: true,
        sentiment: "Neutral",
        topic: "Restructuring / Profit Warning",
        summary: "EVO fell 20% — hitting a new 52-week low — after announcing its Horizon restructuring plan on March 10. Management called 2026 a transition year and guided for near-zero EBITDA (€0–40M) on revenue of €700–780M. A securities law firm launched an investigation the following day.",
        takeaway: "This is the third restructuring plan in recent years and the market clearly doesn't believe it yet. Near-zero EBITDA guidance with profitability now pushed to 2028 is a major reset. The securities investigation adds more uncertainty on top.",
        valImpact: true
      },
      {
        side: "loser",
        company: "CRISPR Therapeutics",
        ticker: "CRSP",
        penny: false,
        sentiment: "Positive",
        topic: "Convertible Note Offering",
        summary: "CRSP dropped ~17% after announcing a $350M convertible notes offering on March 10, later upsized to $550M. The market reacted to dilution concerns — the notes convert into equity if not repaid by 2031. ARK bought the dip, picking up 281K shares.",
        takeaway: "Dilutive financing is never popular, but analysts still see the stock as materially undervalued — consensus price target is around $81 vs. current ~$49. CASGEVY is commercially on track and the pipeline is active. The selloff looks like an overreaction given the balance sheet context.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Century Therapeutics",
        ticker: "IPSC",
        penny: true,
        sentiment: "Neutral",
        topic: "FY2025 Earnings / Profit-Taking",
        summary: "IPSC fell 17% this week despite reporting FY2025 results on March 12 that actually beat estimates — net loss narrowed to $9.6M from $126.6M in 2024. No negative catalyst; the drop looks like profit-taking after a 144% YTD run into the week.",
        takeaway: "The earnings were fine and the balance sheet is solid after January's $135M raise. The price action is purely about momentum unwinding in a thinly traded micro-cap. The CNTY-813 T1D program remains the thesis — watch for IND submission news.",
        valImpact: false
      },
      {
        side: "loser",
        company: "Lineage Cell Therapeutics",
        ticker: "LCTX",
        penny: true,
        sentiment: "Neutral",
        topic: "FY2025 Earnings / Sector Weakness",
        summary: "LCTX fell ~9% despite a strong Q4 earnings beat on March 5 — EPS of $0.00 vs. an expected -$0.07, and revenue of $6.6M vs. estimates of $2.0M. D. Boral raised its price target to $3 and CEO Brian Culley bought 15,000 shares on March 12.",
        takeaway: "The earnings and analyst reaction were positive — the drop is sector-level selling rather than company-specific news. CEO buying at these prices is a constructive signal. The OpRegen retinal program remains the key catalyst to watch in 2026.",
        valImpact: false
      },
      {
        side: "neutral",
        company: "Sana Biotechnology",
        ticker: "SANA",
        penny: true,
        sentiment: "Negative",
        topic: "14-Month T1D Clinical Update",
        summary: "On March 13, Sana presented 14-month follow-up data at the ATTD conference showing its HIP-modified islet cells (UP421) continued to survive and produce insulin in a T1D patient without any immunosuppression. C-peptide levels at month 14 were comparable to the first six months. Morgan Stanley reiterated Overweight, calling it a meaningful platform de-risking event.",
        takeaway: "This is genuinely important science — 14 months of sustained insulin production without immunosuppression is the longest such data point yet. Sana is now targeting an IND for SC451 (the scalable version) this year. Cash runway is still the main risk, but the scientific story keeps getting stronger.",
        valImpact: true
      }
    ]
  },
  {
    label: "Week of 03/09/2026",
    asOf: "03/09/2026",
    stats: {
      best:       { val: "+20.0%", sub: "SEOVF · Sernova Biotherapeutics" },
      worst:      { val: "−25.2%", sub: "SANA · Sana Biotechnology" },
      highestYtd: { val: "+157%",  sub: "IPSC · Century Therapeutics" },
      positiveSentiment: { val: "3", sub: "vs. 2 Neg · 16 Neutral" }
    },
    holdings: [
      { ticker:"LLY",      name:"Eli Lilly",           cap:"Large-cap",  mktCap:"$886.4B",  price:990.33,  low52:620.47,  high52:1132.06, weekly:-5.860,  excessXlv:-1.180,  ytd:-7.700,   pe:43.10, cr:1.579,  relVol:83,  sentiment:"Positive" },
      { ticker:"NVO",      name:"Novo Nordisk",         cap:"Large-cap",  mktCap:"$171.5B",  price:38.58,   low52:35.85,   high52:86.64,   weekly:3.020,   excessXlv:7.699,   ytd:-24.170,  pe:10.78, cr:0.800,  relVol:112, sentiment:"Negative" },
      { ticker:"SNY",      name:"Sanofi",               cap:"Large-cap",  mktCap:"$107.6B",  price:44.55,   low52:44.00,   high52:57.57,   weekly:-8.450,  excessXlv:-3.765,  ytd:-8.070,   pe:19.04, cr:1.092,  relVol:144, sentiment:"Neutral"  },
      { ticker:"VRTX",     name:"Vertex Pharma",        cap:"Large-cap",  mktCap:"$116.0B",  price:456.69,  low52:362.50,  high52:519.68,  weekly:-8.080,  excessXlv:-3.398,  ytd:0.730,    pe:29.85, cr:2.901,  relVol:77,  sentiment:"Positive" },
      { ticker:"OTSKY",    name:"Otsuka Holdings",      cap:"Large-cap",  mktCap:"$34.2B",   price:31.36,   low52:21.44,   high52:34.93,   weekly:-8.330,  excessXlv:-3.649,  ytd:10.700,   pe:14.45, cr:2.165,  relVol:94,  sentiment:"Neutral"  },
      { ticker:"CRSP",     name:"CRISPR Therapeutics",  cap:"Mid-cap",    mktCap:"$5.4B",    price:56.50,   low52:30.04,   high52:78.48,   weekly:-6.050,  excessXlv:-1.371,  ytd:7.740,    pe:null,  cr:13.316, relVol:68,  sentiment:"Positive" },
      { ticker:"IMCR",     name:"Immunocore",           cap:"Small-cap",  mktCap:"$1.7B",    price:32.94,   low52:23.15,   high52:40.72,   weekly:1.980,   excessXlv:6.663,   ytd:-5.100,   pe:null,  cr:4.040,  relVol:127, sentiment:"Neutral"  },
      { ticker:"EVO",      name:"Evotec SE",            cap:"Small-cap",  mktCap:"$1.1B",    price:3.07,    low52:2.840,   high52:4.800,   weekly:-9.710,  excessXlv:-5.024,  ytd:-0.320,   pe:null,  cr:2.118,  relVol:87,  sentiment:"Neutral"  },
      { ticker:"SANA",     name:"Sana Biotech",         cap:"Small-cap",  mktCap:"$839.1M",  price:3.15,    low52:1.260,   high52:6.550,   weekly:-25.180, excessXlv:-20.496, ytd:-22.600,  pe:null,  cr:1.889,  relVol:72,  sentiment:"Negative" },
      { ticker:"LCTX",     name:"Lineage Cell",         cap:"Small-cap",  mktCap:"$426.1M",  price:1.85,    low52:0.370,   high52:2.090,   weekly:-3.650,  excessXlv:1.036,   ytd:10.780,   pe:null,  cr:5.204,  relVol:86,  sentiment:"Neutral"  },
      { ticker:"HUMA",     name:"Humacyte",             cap:"Micro-cap",  mktCap:"$214.2M",  price:1.11,    low52:0.880,   high52:3.360,   weekly:-0.450,  excessXlv:4.233,   ytd:15.500,   pe:null,  cr:1.616,  relVol:71,  sentiment:"Neutral"  },
      { ticker:"IPSC",     name:"Century Therapeutics", cap:"Micro-cap",  mktCap:"$223.8M",  price:2.56,    low52:0.342,   high52:2.710,   weekly:10.340,  excessXlv:15.026,  ytd:157.290,  pe:null,  cr:6.252,  relVol:74,  sentiment:"Neutral"  },
      { ticker:"ELDN",     name:"Eledon Pharma",        cap:"Micro-cap",  mktCap:"$221.4M",  price:2.78,    low52:1.350,   high52:4.600,   weekly:6.110,   excessXlv:10.789,  ytd:84.110,   pe:null,  cr:6.736,  relVol:73,  sentiment:"Neutral"  },
      { ticker:"SABS",     name:"SAB Biotherapeutics",  cap:"Micro-cap",  mktCap:"$180.4M",  price:3.79,    low52:1.000,   high52:6.600,   weekly:-7.560,  excessXlv:-2.879,  ytd:1.340,    pe:null,  cr:10.495, relVol:97,  sentiment:"Neutral"  },
      { ticker:"ADOC.PA",  name:"Adocia",               cap:"Micro-cap",  mktCap:"$139.8M",  price:7.14,    low52:3.309,   high52:14.349,  weekly:-7.080,  excessXlv:-2.397,  ytd:-7.910,   pe:null,  cr:1.136,  relVol:70,  sentiment:"Neutral"  },
      { ticker:"SEOVF",    name:"Sernova",              cap:"Micro-cap",  mktCap:"$40.4M",   price:0.120,   low52:0.090,   high52:0.170,   weekly:20.000,  excessXlv:24.682,  ytd:33.330,   pe:null,  cr:0.021,  relVol:302, sentiment:"Neutral"  },
      { ticker:"NXTCL.ST", name:"NextCell Pharma",      cap:"Micro-cap",  mktCap:"$15.4M",   price:0.138,   low52:0.068,   high52:0.390,   weekly:-5.480,  excessXlv:-0.800,  ytd:74.560,   pe:null,  cr:5.157,  relVol:35,  sentiment:"Neutral"  },
      { ticker:"NCEL",     name:"NewcelX",              cap:"Micro-cap",  mktCap:"$12.6M",   price:2.77,    low52:1.890,   high52:30.800,  weekly:-4.480,  excessXlv:0.199,   ytd:45.790,   pe:null,  cr:0.023,  relVol:3,   sentiment:"Neutral"  },
      { ticker:"CELZ",     name:"Creative Medical",     cap:"Micro-cap",  mktCap:"$6.6M",    price:1.88,    low52:1.504,   high52:6.430,   weekly:3.870,   excessXlv:8.549,   ytd:-4.080,   pe:null,  cr:20.706, relVol:20,  sentiment:"Neutral"  },
      { ticker:"GNPX",     name:"Genprex",              cap:"Micro-cap",  mktCap:"$3.2M",    price:1.95,    low52:1.710,   high52:55.000,  weekly:-2.500,  excessXlv:2.182,   ytd:11.430,   pe:null,  cr:0.672,  relVol:39,  sentiment:"Neutral"  },
      { ticker:"FLUI.ST",  name:"FluiCell",             cap:"Micro-cap",  mktCap:"$1.5M",    price:1.115,   low52:0.806,   high52:3.247,   weekly:-13.450, excessXlv:-8.764,  ytd:3.000,    pe:null,  cr:1.003,  relVol:29,  sentiment:"Neutral"  }
    ],
    news: [
      {
        side: "loser",
        company: "Sana Biotechnology",
        ticker: "SANA",
        penny: false,
        sentiment: "Negative",
        topic: "Earnings / Cash Runway",
        summary: "SANA reported Q4 results with $138M cash left — enough to last only into late 2026. An analyst downgrade followed, with added pressure from increased FDA scrutiny on gene therapies.",
        takeaway: "Less than 12 months of cash with no revenue coming in. The underlying science is still solid but the funding risk is now the main story.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Sanofi",
        ticker: "SNY",
        penny: false,
        sentiment: "Negative",
        topic: "Pipeline / 52-Week Low",
        summary: "SNY hit a new 52-week low this week, still unwinding from the failed amlitelimab trial in September and growing concern about what replaces Dupixent when its patent expires in 2030.",
        takeaway: "The stock is down ~30% over the past year and the sell-side has been cooling on it. Without a clear successor to Dupixent, the market is starting to price in a tough few years ahead.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Eli Lilly",
        ticker: "LLY",
        penny: false,
        sentiment: "Positive",
        topic: "GLP-1 Pricing Pressure",
        summary: "LLY fell ~6% as pricing pressure on Mounjaro and Zepbound continued — management flagged a meaningful drag on 2026 growth from price cuts. A new employer access program was announced but didn't move the needle.",
        takeaway: "Mounjaro and Zepbound are now 56% of revenue, so pricing headwinds hit hard. Long-term outlook still strong with a new oral weight loss pill expected mid-2026, but this year will likely be bumpy.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "Sernova Biotherapeutics",
        ticker: "SEOVF",
        penny: true,
        sentiment: "Neutral",
        topic: "Financing",
        summary: "SEOVF jumped 20% after raising $7.1M through a mix of equity and convertible debt, with insiders participating. Proceeds are set to pay off a loan coming due in April.",
        takeaway: "Buys short-term cash runway and takes the April debt maturity off the table — pending shareholder approval. Very thinly traded, so the move is more relief than a real re-rating.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "Century Therapeutics",
        ticker: "IPSC",
        penny: true,
        sentiment: "Neutral",
        topic: "Continued Momentum",
        summary: "IPSC gained another 10% this week with no new news, continuing its remarkable YTD run (+157%) on momentum from the $135M raise in January.",
        takeaway: "No new catalyst — just momentum in a thinly traded stock. Balance sheet is fine after the January raise, but still pre-revenue with no clinical data yet.",
        valImpact: false
      }
    ]
  },
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
        summary: "Presenting at two healthcare conferences in early March. The $135M January raise — backed by RA Capital and Venrock — continues to drive investor interest in CNTY-813, its T1D cell therapy program.",
        takeaway: "Conference appearances keep the stock visible after a big January raise. No new data yet — the thesis is still the pipeline, and penny stock volatility is amplifying the move.",
        valImpact: false
      },
      {
        side: "gainer",
        company: "SAB Biotherapeutics", ticker: "SABS", penny: true, sentiment: "Neutral",
        topic: "Oppenheimer Conference",
        summary: "CEO presented SAB-142 at an investor conference. The SAFEGUARD trial is on track to enroll its last patient by end-2026, with topline data expected H2 2027. FDA has agreed the trial counts as a pivotal study.",
        takeaway: "FDA sign-off on pivotal status is a meaningful de-risking step. The 2027 data readout is still a ways off, but the path is clearer. Penny stock, so the +8% move is partly thin-float momentum.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "CRISPR Therapeutics", ticker: "CRSP", penny: false, sentiment: "Positive",
        topic: "Q4 Earnings / 2026 Milestones",
        summary: "Q4 2025 results: CASGEVY hit $100M+ in its first full year, with patient starts nearly tripling vs. 2024. Company enters 2026 with ~$2B cash and several key data readouts expected in H2.",
        takeaway: "Commercial launch is tracking ahead of expectations and the cash position is strong. One of the cleaner cases in the portfolio where the price move and the news actually line up.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Novo Nordisk A/S", ticker: "NVO", penny: false, sentiment: "Negative",
        topic: "Continued Selling / Price Cut Plan",
        summary: "NVO fell another 3.6% this week, extending last week's 18% drop after CagriSema underperformed Lilly's tirzepatide in a head-to-head trial. Now down ~29% YTD. Novo also announced plans to cut GLP-1 prices by up to 50% starting 2027.",
        takeaway: "The price cut announcement confirms the competitive pressure is real and lasting. Margins will take a hit starting 2027, and a recovery depends on pipeline data that's still 1-2 years out.",
        valImpact: true
      },
      {
        side: "loser",
        company: "Eli Lilly and Company", ticker: "LLY", penny: false, sentiment: "Positive",
        topic: "Minor Pullback / KwikPen Launch",
        summary: "LLY gave back 0.8% after last week's pop on the NVO trial miss. FDA approved a new monthly Zepbound pen at $299 cash-pay. BofA maintained Buy and downplayed Novo's price cut threat. Full-year guidance calls for ~25% revenue growth.",
        takeaway: "Small pullback after a strong prior week — not much to read into it. The new Zepbound format helps on price-sensitive patients. Lilly's position in GLP-1 continues to look solid.",
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
        summary: "Q4 2025 revenue hit SEK 3.8M vs. SEK 0.5M a year ago, with operating losses narrowing. First real sign of commercial traction for this micro-cap.",
        takeaway: "Revenue jump is encouraging — the question is whether it holds. As a penny stock, +30% on thin volume needs confirmation in Q1 2026 before reading too much into it.",
        valImpact: true
      },
      {
        side: "gainer",
        company: "NextCell Pharma", ticker: "NXTCL.ST", penny: true, sentiment: "Neutral",
        topic: "Japan Expansion / Data",
        summary: "Joined Japan's Entry Acceleration Program and presented long-term data showing sustained insulin preservation from its ProTrans therapy. Weekly move of +9% is within normal range for a sub-$1 stock.",
        takeaway: "Japan program opens a new market; the long-term data adds to the clinical story. Still a penny stock with elevated execution risk — watch for IND filing or partnership news.",
        valImpact: false
      },
      {
        side: "gainer",
        company: "Sana Biotechnology", ticker: "SANA", penny: true, sentiment: "Neutral",
        topic: "CFO Appointment",
        summary: "New CFO appointed, bringing dedicated finance leadership at a stage where managing cash carefully is critical. A penny stock hiring senior finance talent suggests the team is aware of its runway constraints.",
        takeaway: "CFO hire signals tighter focus on cash discipline. Still no near-term pipeline catalyst — funding runway remains the main thing to watch.",
        valImpact: false
      },
      {
        side: "loser",
        company: "Novo Nordisk A/S", ticker: "NVO", penny: false, sentiment: "Negative",
        topic: "Phase 3 Miss / Guidance Cut",
        summary: "CagriSema's Phase 3 trial showed 20.2% weight loss vs. tirzepatide's 23.6% — a meaningful miss in a head-to-head comparison. Novo also cut its 2026 guidance by 5–13%. Shares fell ~18% on the day.",
        takeaway: "Lilly's competitive advantage in GLP-1 just got bigger. The guidance cut adds to the pressure, and a real recovery depends on pipeline data that's still 1-2 years away.",
        valImpact: true
      },
      {
        side: "loser",
        company: "SAB Biotherapeutics", ticker: "SABS", penny: true, sentiment: "Neutral",
        topic: "Institutional Backing",
        summary: "RTW Investments disclosed a new stake — a notable vote of confidence — but shares still fell 7.2%, suggesting broader selling pressure outweighed the news.",
        takeaway: "Institutional backing is a positive signal, but the market wants more than that to move higher. Penny stock dynamics mean you need a real catalyst for a sustained move.",
        valImpact: false
      },
      {
        side: "loser",
        company: "Adocia", ticker: "ADOC.PA", penny: false, sentiment: "Neutral",
        topic: "Q4 Earnings / Business Update",
        summary: "FY 2025 revenue of €1.5M vs. €9.3M in 2024 — but 2024 included a one-time €10M milestone payment, so the comparison is misleading. Cash improved to €17.2M after a December equity raise, giving runway into early 2027. BioChaperone Lispro showed positive Phase 3 results in China; a new monthly insulin platform was filed; two undisclosed pharma collaborations are ongoing. Long-time chairman stepped down after 20 years.",
        takeaway: "Strip out the one-time 2024 milestone and the business is quietly making progress. Cash runway into 2027 reduces near-term dilution risk. China approval for BioChaperone Lispro — which would trigger a $20M milestone — is the main thing to watch.",
        valImpact: true
      },
    ]
  }
];
