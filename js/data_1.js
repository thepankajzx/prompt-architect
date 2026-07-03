// js/data.js (Part 1 - Categories 1 to 5)

const promptDataPart1 = {
    aiModels: {
        chatgpt: { name: "ChatGPT", rules: "Act as an institutional quant analyst. Provide highly structured, step-by-step reasoning." },
        claude: { name: "Claude", rules: "Act as a Senior Research Analyst at a top-tier hedge fund. Focus on deeply nuanced, long-form financial reporting. Maintain an objective, institutional tone." },
        gemini: { name: "Gemini", rules: "Act as a specialized financial data architect. Follow instructions strictly and sequentially. Ensure accurate data retrieval and structured breakdowns." },
        perplexity: { name: "Perplexity", rules: "Act as a live market intelligence analyst. Rely heavily on real-time, source-backed financial data. Cite all quantitative facts." }
    },

    categories: [
        { id: "fundamental", title: "Fundamental Analysis", icon: "fa-file-invoice-dollar", desc: "Comprehensive financial & business quality analysis." },
        { id: "technical", title: "Technical Analysis", icon: "fa-chart-line", desc: "Professional market & chart analysis." },
        { id: "valuation", title: "Valuation", icon: "fa-calculator", desc: "Intrinsic value & pricing analysis." },
        { id: "risk", title: "Risk Analysis", icon: "fa-shield-alt", desc: "Business, financial & macro risk assessment." },
        { id: "green-flags", title: "Green Flags", icon: "fa-flag text-green-500", desc: "Positive investment indicators & catalysts." }
    ],

    modules: {
        "fundamental": [
            {
                id: "fund-overview", title: "Business Overview",
                expertRole: "Corporate Strategy Consultant",
                objective: "Deconstruct the core business model, revenue streams, and corporate structure of {companyName}.",
                metrics: "Revenue segments, Geographical breakdown, Operating margins per segment.",
                framework: "Analyze the value proposition, target demographics, and primary products/services. How does the company actually make money?"
            },
            {
                id: "fund-revenue", title: "Revenue Growth",
                expertRole: "Growth Equity Analyst",
                objective: "Analyze historical and projected top-line growth trajectory for {companyName}.",
                metrics: "3-Year Revenue CAGR, YoY Revenue Growth, Volume vs Pricing growth.",
                framework: "Deconstruct the drivers of revenue growth. Is growth organic or acquisition-driven? Identify the fastest growing segments vs legacy declining segments."
            },
            {
                id: "fund-profit", title: "Profitability",
                expertRole: "Margin Expansion Specialist",
                objective: "Assess the profitability profile and margin sustainability of {companyName}.",
                metrics: "Gross Margin, Operating Margin (EBIT), Net Income Margin, historical 3-year trends.",
                framework: "Examine COGS and SG&A trends. Is the company demonstrating operating leverage? Are margins expanding or contracting compared to industry peers?"
            },
            {
                id: "fund-health", title: "Financial Health",
                expertRole: "Credit Risk Analyst",
                objective: "Evaluate the solvency, liquidity, and balance sheet strength of {companyName}.",
                metrics: "Current Ratio, Quick Ratio, Interest Coverage Ratio, Altman Z-Score.",
                framework: "Assess the company's ability to meet short-term obligations and survive economic downturns. Analyze working capital management."
            },
            {
                id: "fund-bs", title: "Balance Sheet Review",
                expertRole: "Corporate Controller",
                objective: "Perform a deep dive into the assets and liabilities of {companyName}.",
                metrics: "Total Debt to Equity, Goodwill as % of Assets, Tangible Book Value.",
                framework: "Identify toxic assets, hidden liabilities, or off-balance sheet risks. Assess the quality of assets (e.g., inventory buildup, receivables aging)."
            },
            {
                id: "fund-cf", title: "Cash Flow Analysis",
                expertRole: "Corporate Finance Expert",
                objective: "Analyze the true cash generation capabilities of {companyName}.",
                metrics: "Operating Cash Flow (OCF), Free Cash Flow (FCF), FCF Yield, OCF/Net Income conversion.",
                framework: "Differentiate between accounting profit and actual cash flow. Analyze CapEx requirements. Is the dividend/buyback program funded by FCF or debt?"
            },
            {
                id: "fund-ratios", title: "Key Ratios",
                expertRole: "Quantitative Financial Analyst",
                objective: "Calculate and interpret the most critical financial ratios for {companyName}.",
                metrics: "ROIC (Return on Invested Capital), ROE, ROA, Asset Turnover.",
                framework: "Evaluate capital allocation efficiency. Does the company generate returns above its cost of capital? Compare ROIC to industry average."
            },
            {
                id: "fund-mgmt", title: "Management Quality",
                expertRole: "Activist Investor",
                objective: "Evaluate the track record, capital allocation skills, and compensation structure of {companyName}'s leadership.",
                metrics: "Insider Ownership %, CEO Tenure, Stock-Based Compensation (SBC) as % of OCF.",
                framework: "Assess management alignment with shareholders. Has management historically over-promised and under-delivered? Are acquisitions accretive or destructive?"
            }
        ],
        "technical": [
            {
                id: "tech-trend", title: "Trend Analysis",
                expertRole: "Professional Trend Follower",
                objective: "Identify the primary, secondary, and micro trends for {companyName} stock.",
                metrics: "Higher Highs/Higher Lows sequence, 200-day vs 50-day trajectory.",
                framework: "Determine if the asset is in accumulation, markup, distribution, or markdown phase according to Wyckoff principles."
            },
            {
                id: "tech-sr", title: "Support & Resistance",
                expertRole: "Institutional Order Flow Analyst",
                objective: "Map out critical liquidity zones, supply/demand imbalances, and psychological levels for {companyName}.",
                metrics: "Historical pivot points, Volume-Weighted Average Price (VWAP) anchors.",
                framework: "Identify where institutional buyers and sellers are likely to step in. Highlight the most significant untested support and resistance zones."
            },
            {
                id: "tech-rsi", title: "RSI Analysis",
                expertRole: "Momentum Trading Specialist",
                objective: "Analyze momentum exhaustion and divergence using the Relative Strength Index for {companyName}.",
                metrics: "Daily RSI, Weekly RSI, Hidden/Regular Bullish/Bearish Divergences.",
                framework: "Do not just state overbought/oversold. Look for multi-timeframe alignment and price-momentum divergences indicating impending reversals."
            },
            {
                id: "tech-macd", title: "MACD Analysis",
                expertRole: "Quantitative Momentum Analyst",
                objective: "Evaluate trend strength and momentum shifts using MACD for {companyName}.",
                metrics: "MACD Line vs Signal Line crossovers, Histogram slope and zero-line rejections.",
                framework: "Identify accelerating or decelerating momentum. Cross-reference MACD signals with price action to filter out false signals."
            },
            {
                id: "tech-ma", title: "Moving Averages",
                expertRole: "Algorithmic Trading Architect",
                objective: "Analyze dynamic support/resistance using institutional moving averages for {companyName}.",
                metrics: "SMA-50, SMA-200, EMA-8, EMA-21, Golden/Death Crosses.",
                framework: "Determine the relationship between short-term EMAs and long-term SMAs. Is price respecting the 50-day SMA as support?"
            },
            {
                id: "tech-vol", title: "Volume Analysis",
                expertRole: "Volume Spread Analyst (VSA)",
                objective: "Interpret institutional footprint and conviction through volume profile for {companyName}.",
                metrics: "Relative Volume (RVOL), On-Balance Volume (OBV), Volume Profile Point of Control (POC).",
                framework: "Analyze price spread vs volume. Identify climatic volume indicating capitulation or accumulation. Confirm price breakouts with volume expansion."
            }
        ],
        "valuation": [
            {
                id: "val-fair", title: "Fair Value Estimate",
                expertRole: "Sell-Side Equity Analyst",
                objective: "Provide a blended fair value estimate for {companyName} using multiple valuation methodologies.",
                metrics: "Blended Target Price, Upside/Downside %, 52-Week High/Low premium.",
                framework: "Synthesize consensus analyst estimates, historical multiples, and intrinsic value models to establish a realistic near-term price target."
            },
            {
                id: "val-dcf", title: "DCF Analysis",
                expertRole: "Investment Banking Analyst",
                objective: "Construct the framework for a Discounted Cash Flow valuation of {companyName}.",
                metrics: "WACC (Cost of Capital), Terminal Growth Rate (TGR), projected 5-year FCF CAGR.",
                framework: "Estimate realistic free cash flow growth based on current market dynamics. Discount it back to present value using a conservative WACC. State assumptions clearly."
            },
            {
                id: "val-pe", title: "P/E Comparison",
                expertRole: "Relative Valuation Specialist",
                objective: "Analyze the Price-to-Earnings premium or discount of {companyName}.",
                metrics: "Trailing P/E, Forward P/E, 5-Year Average P/E.",
                framework: "Compare the current P/E to its historical average and its top 3 direct competitors. Is a premium justified by superior growth or ROIC?"
            },
            {
                id: "val-ev", title: "EV/EBITDA",
                expertRole: "Private Equity Analyst",
                objective: "Evaluate the enterprise value relative to operating cash earnings for {companyName}.",
                metrics: "Enterprise Value (EV), EBITDA, EV/EBITDA multiple.",
                framework: "Use EV/EBITDA to neutralize capital structure differences. Compare against the sector median. Is it an attractive acquisition target at this multiple?"
            },
            {
                id: "val-peg", title: "PEG Ratio",
                expertRole: "Growth-at-a-Reasonable-Price (GARP) Investor",
                objective: "Assess if {companyName}'s growth justifies its valuation multiple.",
                metrics: "PEG Ratio (Forward P/E divided by 3-5 yr EPS growth rate).",
                framework: "A PEG below 1 indicates potential undervaluation relative to growth. Analyze whether the consensus growth estimates used in the PEG are realistic."
            }
        ],
        "risk": [
            {
                id: "risk-biz", title: "Business Risk",
                expertRole: "Corporate Risk Officer",
                objective: "Identify structural vulnerabilities in {companyName}'s business model.",
                metrics: "Customer concentration %, Supplier concentration %, Revenue cyclicality.",
                framework: "Analyze risks related to product obsolescence, reliance on single clients, supply chain fragility, and technological disruption."
            },
            {
                id: "risk-fin", title: "Financial Risk",
                expertRole: "Credit Ratings Analyst",
                objective: "Evaluate the financial ruin probability for {companyName}.",
                metrics: "Debt maturities within 2 years, Floating vs Fixed debt %, Interest Coverage.",
                framework: "Analyze refinancing risks in a high-rate environment. Assess covenant breach probabilities and reliance on continuous capital raises."
            },
            {
                id: "risk-macro", title: "Macro Risk",
                expertRole: "Global Macroeconomist",
                objective: "Assess {companyName}'s sensitivity to exogenous economic shocks.",
                metrics: "Beta, FX exposure %, Commodity input cost reliance.",
                framework: "Analyze how inflation, interest rate hikes, currency fluctuations (strong USD), and geopolitical tensions directly impact margins and revenue."
            },
            {
                id: "risk-reg", title: "Regulatory Risk",
                expertRole: "Policy & Compliance Analyst",
                objective: "Identify pending legislation or antitrust risks threatening {companyName}.",
                metrics: "Fines/Settlements as % of Net Income, Market share dominance (Antitrust trigger).",
                framework: "Evaluate exposure to data privacy laws, environmental regulations, tariffs, and government scrutiny in primary operating jurisdictions."
            }
        ],
        "green-flags": [
            {
                id: "green-growth", title: "Growth Drivers",
                expertRole: "Venture Capital Analyst",
                objective: "Identify the primary catalysts that will accelerate revenue for {companyName}.",
                metrics: "TAM (Total Addressable Market) expansion, New product growth rate, Market penetration %.",
                framework: "Highlight specific upcoming product launches, new geographic market entries, or demographic shifts acting as structural tailwinds."
            },
            {
                id: "green-moat", title: "Competitive Advantage",
                expertRole: "Warren Buffett-Style Value Investor",
                objective: "Define and wideness of {companyName}'s economic moat.",
                metrics: "Market Share %, Switching Costs (Customer Retention Rate), Pricing Power (Gross Margin expansion).",
                framework: "Does the company possess network effects, intangible assets (patents/brand), cost advantages, or high switching costs?"
            },
            {
                id: "green-insider", title: "Insider Confidence",
                expertRole: "Corporate Governance Analyst",
                objective: "Analyze bullish signals from corporate insiders at {companyName}.",
                metrics: "Open market insider buying (Volume & frequency), Corporate share buyback yield.",
                framework: "Identify meaningful purchases by the CEO, CFO, or Directors. Differentiate between routine options exercising and conviction-based open market buys."
            },
            {
                id: "green-cash", title: "Cash Generation",
                expertRole: "Dividend Growth Investor",
                objective: "Highlight exceptional free cash flow dynamics at {companyName}.",
                metrics: "FCF per share growth, Cash conversion cycle improvement, Dividend payout ratio safety.",
                framework: "Showcase the company's ability to self-fund growth without debt, while simultaneously rewarding shareholders through buybacks or dividends."
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.promptDataPart1 = promptDataPart1;
}
