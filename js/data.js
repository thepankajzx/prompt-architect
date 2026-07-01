// js/data.js

const promptData = {
    // AI Models Logic
    aiModels: {
        chatgpt: { name: "ChatGPT", rules: "Provide highly structured analysis. Emphasize step-by-step reasoning." },
        claude: { name: "Claude", rules: "Focus on long-form, deeply nuanced financial reporting. Maintain a highly professional, objective tone." },
        gemini: { name: "Gemini", rules: "Follow instructions strictly and sequentially. Ensure accurate data retrieval." },
        perplexity: { name: "Perplexity", rules: "Rely heavily on live, source-backed financial data. Cite all facts." }
    },

    // Categories
    categories: [
        { id: "equity-research", title: "Equity Research", icon: "fa-chart-line" },
        { id: "portfolio-mgmt", title: "Portfolio Mgmt", icon: "fa-pie-chart" },
        { id: "risk-audit", title: "Risk & Audits", icon: "fa-shield-alt" },
        { id: "macro-crypto", title: "Macro & Crypto", icon: "fa-globe" }
    ],

    // Generators
    generators: {
        "equity-research": [
            {
                id: "360-roundup",
                title: "360° Company Roundup",
                description: "Complete overview of a stock's fundamentals, technicals, and sentiment.",
                icon: "fa-eye",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Perform a 360-degree financial roundup on {companyName}. Include recent earnings, management sentiment, key growth drivers, and primary headwinds.`
            },
            {
                id: "fundamental-analysis",
                title: "Fundamental Analysis",
                description: "Deep dive into balance sheet, cash flows, and profitability ratios.",
                icon: "fa-file-invoice-dollar",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Conduct a deep fundamental analysis on {companyName}. Analyze the balance sheet strength, free cash flow generation, ROIC, and debt-to-equity metrics over the last 3 years.`
            },
            {
                id: "technical-analysis",
                title: "Technical Analysis",
                description: "Analyze price action, moving averages, and momentum indicators.",
                icon: "fa-chart-bar",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }, { id: "timeframe", label: "Timeframe", type: "select", options: ["Daily", "Weekly", "Monthly"] }],
                baseTemplate: `Perform a technical analysis for {companyName} on a {timeframe} timeframe. Evaluate key support/resistance levels, moving average crossovers (50/200), RSI, and MACD.`
            },
            {
                id: "dcf-valuation",
                title: "DCF Valuation Model",
                description: "Generate assumptions and outputs for a Discounted Cash Flow model.",
                icon: "fa-calculator",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Build a conceptual Discounted Cash Flow (DCF) valuation framework for {companyName}. Provide reasonable assumptions for WACC, Terminal Growth Rate, and projected Free Cash Flows based on current industry standards.`
            },
            {
                id: "competitor-benchmarking",
                title: "Competitor Benchmarking",
                description: "Compare the company against its top 3 industry peers.",
                icon: "fa-balance-scale",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Create a competitor benchmarking matrix for {companyName}. Compare it against its top 3 direct competitors on metrics like P/E, EV/EBITDA, Gross Margin, and Revenue Growth.`
            }
        ],
        "portfolio-mgmt": [
            {
                id: "portfolio-optimization",
                title: "Portfolio Optimization",
                description: "Analyze asset allocation and correlation matrices.",
                icon: "fa-sitemap",
                version: "v2.0",
                fields: [{ id: "assets", label: "List of Assets (Tickers)", type: "text", placeholder: "AAPL, MSFT, SPY, GLD" }],
                baseTemplate: `Analyze a portfolio consisting of the following assets: {assets}. Evaluate the diversification, historical correlation, and suggest potential weighting optimizations based on Modern Portfolio Theory.`
            },
            {
                id: "dividend-health",
                title: "Dividend Health Check",
                description: "Analyze payout ratios and dividend growth sustainability.",
                icon: "fa-coins",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Assess the dividend safety and growth potential of {companyName}. Analyze the payout ratio, free cash flow coverage, and historical dividend CAGR.`
            },
            {
                id: "options-strategy",
                title: "Options Hedging Strategy",
                description: "Generate protective put or covered call strategies.",
                icon: "fa-sliders-h",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }, { id: "strategy", label: "Goal", type: "select", options: ["Downside Protection", "Income Generation"] }],
                baseTemplate: `Design an options strategy for {companyName} focused on {strategy}. Explain the setup (strike selection, expiration timeframe), max risk, max reward, and breakeven points.`
            }
        ],
        "risk-audit": [
            {
                id: "red-flag-audit",
                title: "Red Flag Audit",
                description: "Identify accounting anomalies, debt risks, and management warnings.",
                icon: "fa-flag text-red-500",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Conduct a forensic Red Flag Audit on {companyName}. Look for warning signs such as rising accounts receivable vs revenue, declining margins, high insider selling, or excessive stock-based compensation.`
            },
            {
                id: "green-flag-audit",
                title: "Green Flag Audit",
                description: "Highlight growth catalysts, moats, and positive indicators.",
                icon: "fa-flag text-green-500",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Conduct a Green Flag Audit on {companyName}. Highlight strong competitive moats, accelerating revenue growth, insider buying, or margin expansion trends.`
            },
            {
                id: "earnings-call",
                title: "Earnings Call Analysis",
                description: "Extract sentiment and forward guidance from the latest earnings call.",
                icon: "fa-microphone-alt",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Analyze the most recent earnings call transcript for {companyName}. Extract the management's tone, forward guidance changes, and the most critical questions asked by analysts during the Q&A.`
            },
            {
                id: "risk-management",
                title: "Macro Risk Profiling",
                description: "Assess Beta, VaR, and sensitivity to market shocks.",
                icon: "fa-exclamation-triangle",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Create a risk profile for {companyName}. Assess its Beta relative to the S&P 500, its sensitivity to interest rate hikes, and overall systemic risk exposure.`
            },
            {
                id: "esg-scoring",
                title: "ESG Impact Analysis",
                description: "Evaluate Environmental, Social, and Governance factors.",
                icon: "fa-leaf text-green-400",
                version: "v2.0",
                fields: [{ id: "companyName", label: "Company Ticker/Name", type: "text" }],
                baseTemplate: `Provide an ESG (Environmental, Social, Governance) analysis for {companyName}. Highlight major controversies, carbon footprint goals, and board diversity metrics.`
            }
        ],
        "macro-crypto": [
            {
                id: "macro-economic",
                title: "Macro-Economic Impact",
                description: "Analyze how inflation, rates, and GDP affect a sector.",
                icon: "fa-globe-americas",
                version: "v2.0",
                fields: [{ id: "sector", label: "Sector/Industry", type: "text", placeholder: "e.g., Real Estate, Tech" }],
                baseTemplate: `Analyze the current macroeconomic impact on the {sector} sector. Focus on how current interest rates, inflation data, and consumer spending trends are affecting margins and valuations in this space.`
            },
            {
                id: "crypto-tokenomics",
                title: "Crypto Tokenomics",
                description: "Evaluate supply/demand, utility, and inflation of a token.",
                icon: "fa-bitcoin",
                version: "v2.0",
                fields: [{ id: "tokenName", label: "Token Name/Symbol", type: "text", placeholder: "e.g., Ethereum (ETH)" }],
                baseTemplate: `Perform a deep Tokenomics analysis on {tokenName}. Evaluate its total vs circulating supply, utility drivers, staking rewards, inflation/deflation mechanisms, and holder distribution.`
            }
        ]
    }
};
