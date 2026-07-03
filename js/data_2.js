// js/data_2.js (Part 2 - Categories 6 to 10)

const promptDataPart2 = {
    categories: [
        { id: "red-flags", title: "Red Flags", icon: "fa-flag text-red-500", desc: "Critical warning signals & accounting concerns." },
        { id: "earnings", title: "Earnings & Performance", icon: "fa-chart-pie", desc: "Quarterly & annual business performance." },
        { id: "business", title: "Business & Moat", icon: "fa-chess-knight", desc: "Competitive advantages & strategic positioning." },
        { id: "thesis", title: "Investment Thesis", icon: "fa-balance-scale", desc: "Bull case, bear case & final investment opinion." },
        { id: "custom", title: "Custom Research", icon: "fa-flask", desc: "Custom institutional research request." }
    ],

    modules: {
        "red-flags": [
            {
                id: "red-fin", title: "Weak Financials",
                expertRole: "Distressed Debt Analyst",
                objective: "Identify deteriorating financial metrics and solvency red flags for {companyName}.",
                metrics: "Declining FCF, Rising Debt/EBITDA, Decreasing Interest Coverage.",
                framework: "Look for continuous cash burn, inability to cover interest payments from operating profit, and reliance on debt issuance to fund dividends."
            },
            {
                id: "red-margin", title: "Declining Margins",
                expertRole: "Operational Restructuring Consultant",
                objective: "Investigate the root causes of margin compression at {companyName}.",
                metrics: "Gross Margin Contraction YoY, Rising SG&A as % of Revenue.",
                framework: "Is the company losing pricing power? Are input costs rising faster than the company can pass them to consumers? Is SG&A bloated?"
            },
            {
                id: "red-acct", title: "Accounting Concerns",
                expertRole: "Forensic Accountant",
                objective: "Audit {companyName} for aggressive accounting practices or earnings manipulation.",
                metrics: "DSO (Days Sales Outstanding) vs Revenue Growth, Inventory Growth vs Revenue Growth.",
                framework: "Look for channel stuffing (receivables growing faster than sales), capitalizing expenses that should be operating, or frequent one-time 'adjusted' charges."
            },
            {
                id: "red-insider", title: "Insider Selling",
                expertRole: "Market Sentiment Analyst",
                objective: "Analyze concerning insider selling patterns at {companyName}.",
                metrics: "C-Suite Selling Volume, Lack of Insider Buying during drawdowns.",
                framework: "Identify clustered selling by top executives, especially preceding earnings misses or negative catalysts. Differentiate from automated 10b5-1 plans."
            }
        ],
        "earnings": [
            {
                id: "earn-quarter", title: "Quarterly Results",
                expertRole: "Earnings Season Equity Analyst",
                objective: "Deconstruct the most recent quarterly earnings report for {companyName}.",
                metrics: "EPS Beat/Miss %, Revenue Beat/Miss %, Margin expansions/contractions.",
                framework: "Analyze the headline numbers versus consensus estimates. Identify which business segments drove the beat/miss. Assess the quality of the earnings."
            },
            {
                id: "earn-guidance", title: "Guidance Review",
                expertRole: "Forward-Looking Strategy Analyst",
                objective: "Evaluate management's forward guidance and outlook for {companyName}.",
                metrics: "Upward/Downward Guidance Revisions, Projected Capex, Projected YoY Growth.",
                framework: "Did management raise or lower full-year guidance? Analyze the tone of the earnings call regarding macroeconomic headwinds or supply chain issues."
            },
            {
                id: "earn-trend", title: "Earnings Trend",
                expertRole: "Long-Term Value Analyst",
                objective: "Analyze the multi-year earnings trajectory of {companyName}.",
                metrics: "5-Year EPS CAGR, 5-Year Revenue CAGR, Consistency of earnings beats.",
                framework: "Smooth out one-time anomalies. Is the company a consistent compounder, highly cyclical, or in secular decline?"
            }
        ],
        "business": [
            {
                id: "biz-model", title: "Business Model",
                expertRole: "Venture Capital Partner",
                objective: "Deconstruct the mechanics of {companyName}'s business model and unit economics.",
                metrics: "Customer Acquisition Cost (CAC), Lifetime Value (LTV), Churn Rate (if SaaS).",
                framework: "How scalable is the model? Analyze the transition from hardware/software to recurring subscription revenue if applicable."
            },
            {
                id: "biz-moat", title: "Competitive Moat",
                expertRole: "Monopoly & Strategy Analyst",
                objective: "Evaluate the durability of {companyName}'s competitive moat.",
                metrics: "Market Share Dominance, Gross Margin premium vs peers.",
                framework: "Does the moat originate from network effects (Meta), high switching costs (Oracle), cost advantage (Walmart), or intangible assets (Apple brand/patents)?"
            },
            {
                id: "biz-swot", title: "SWOT Analysis",
                expertRole: "Management Consultant (MBB)",
                objective: "Provide a comprehensive SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for {companyName}.",
                metrics: "Qualitative strategic positioning, Market share trajectory.",
                framework: "Categorize internal strengths/weaknesses vs external opportunities/threats. Focus on structural threats rather than temporary macro issues."
            }
        ],
        "thesis": [
            {
                id: "thesis-bull", title: "Bull Case",
                expertRole: "Optimistic Growth Fund Manager",
                objective: "Construct the strongest possible bull case for {companyName}.",
                metrics: "Base case vs Bull case revenue projections, Multiple expansion potential.",
                framework: "Assume management executes perfectly on growth initiatives. What catalysts could drive the stock price significantly higher over the next 24 months?"
            },
            {
                id: "thesis-bear", title: "Bear Case",
                expertRole: "Activist Short Seller",
                objective: "Construct a devastating, evidence-based bear case for {companyName}.",
                metrics: "Base case vs Bear case margin contraction, Multiple compression risk.",
                framework: "Assume macro conditions worsen and competitors steal market share. What is the path to a 50% drawdown? Highlight the most fragile parts of the business."
            },
            {
                id: "thesis-verdict", title: "Final Verdict",
                expertRole: "Chief Investment Officer",
                objective: "Provide a definitive, balanced investment verdict on {companyName}.",
                metrics: "Risk/Reward Ratio, Margin of Safety, Suggested Portfolio Weighting.",
                framework: "Weigh the bull case against the bear case. Given the current valuation, is this a Strong Buy, Hold, or Sell? Justify the conclusion with high conviction."
            }
        ],
        "custom": [
            {
                id: "custom-full", title: "Full Company Report",
                expertRole: "Lead Institutional Researcher",
                objective: "Generate a comprehensive, end-to-end institutional research report for {companyName}.",
                metrics: "All relevant fundamental, technical, and valuation metrics.",
                framework: "Combine business overview, moat analysis, financial health, recent earnings, risks, and valuation into one master briefing document."
            },
            {
                id: "custom-peer", title: "Peer Comparison",
                expertRole: "Sector Rotation Strategist",
                objective: "Perform a deep comparative analysis between {companyName} and its top 3 industry peers.",
                metrics: "Comparative P/E, EV/EBITDA, ROIC, and Revenue Growth.",
                framework: "Determine who is the best-in-class operator. Which company offers the best growth at a reasonable price (GARP) within the sector?"
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.promptDataPart2 = promptDataPart2;
}
