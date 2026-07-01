// js/data.js

const promptData = {
    // Defines the AI Models and their specific behavioral optimizations
    aiModels: {
        chatgpt: {
            name: "ChatGPT",
            rules: "Provide a highly structured response using HTML elements for clear formatting where appropriate. Provide strong, step-by-step reasoning before concluding. For complex metrics, present a detailed logical breakdown."
        },
        claude: {
            name: "Claude",
            rules: "Optimize for a long-form, logically organized report. Emphasize extremely detailed explanations and nuanced reasoning. Maintain strict professional tone and consistent formatting throughout."
        },
        gemini: {
            name: "Gemini",
            rules: "Follow instructions sequentially and explicitly. Return a complete, standalone HTML document containing the report. Do not include markdown wrappers around the HTML."
        },
        perplexity: {
            name: "Perplexity",
            rules: "Focus heavily on source-backed research. Cite public information prominently. Separate objective facts clearly from analytical interpretation."
        },
        grok: {
            name: "Grok",
            rules: "Optimize for concise, high-density analysis. Emphasize factual consistency, direct conclusions, and structured data over conversational filler."
        }
    },

    // Defines the Plans and their constraints
    aiPlans: {
        free: "Keep the final report concise and within standard context window limits. Prioritize the most critical data points over exhaustive depth.",
        pro: "Leverage maximum context capabilities. Provide exhaustive, long-form reasoning, deep historical context, and comprehensive cross-referencing."
    },

    // Categories available in the sidebar
    categories: [
        { id: "fin-research", title: "Financial Research" },
        { id: "content", title: "Content Creation" },
        { id: "productivity", title: "Productivity" }
    ],

    // Generators mapped to categories
    generators: {
        "fin-research": [
            {
                id: "company-360",
                title: "360° Company Research",
                description: "Generates a prompt for a comprehensive fundamental and technical overview of a specific public company.",
                version: "v1.2",
                formFields: [
                    { id: "companyName", label: "Company Name / Ticker", type: "text", placeholder: "e.g., Apple Inc. (AAPL)" },
                    { id: "researchDepth", label: "Research Depth", type: "select", options: ["High-Level Overview", "Deep Fundamental Analysis", "Risk & Valuation Focus"] }
                ],
                // The base prompt logic specifically for financial research
                baseTemplate: `I need a {researchDepth} for {companyName}.

[FINANCIAL RESEARCH BEHAVIOR]
- Use all available knowledge and enable web browsing/search if available.
- Prioritize publicly available information, official SEC/investor filings, reliable financial metrics, industry context, and historical trends.
- Clearly distinguish between historical facts, estimates, and analytical assumptions. Never fabricate financial metrics.
- CRITICAL: If a specific data point cannot be retrieved, explicitly state "Data Not Available" instead of inventing values.
- Do not stop the report because one metric is missing. Complete every possible section and mark unavailable information clearly.

[EDUCATIONAL CONTEXT]
- This report is intended strictly for financial education, learning, and analytical practice.
- This is NOT personalized financial advice. Focus on objective analysis rather than investment recommendations.

[REQUIRED SECTIONS]
1. Executive Summary
2. Core Business Model & Revenue Streams
3. Recent Financial Performance (Revenue, Margins, Growth)
4. Industry & Competitive Landscape
5. Key Risks & Headwinds
6. Valuation Context (if available)`
            }
        ],
        "content": [
            {
                id: "blog-architect",
                title: "SEO Blog Architect",
                description: "Generates a prompt to outline and draft a highly-optimized, human-sounding blog post.",
                version: "v1.0",
                formFields: [
                    { id: "topic", label: "Core Topic", type: "text", placeholder: "e.g., The Future of Remote Work" },
                    { id: "targetAudience", label: "Target Audience", type: "text", placeholder: "e.g., Tech Startup Founders" }
                ],
                baseTemplate: `Act as an expert SEO Content Strategist. I need a comprehensive blog post on the topic of "{topic}" targeted towards "{targetAudience}".

[CONTENT BEHAVIOR]
- Ensure the tone is authoritative yet accessible.
- Optimize headers for search intent.
- Avoid generic AI filler words ("In conclusion", "In a world where").`
            }
        ],
        "productivity": [
            {
                id: "weekly-planner",
                title: "Strategic Weekly Planner",
                description: "Generates a prompt to organize raw tasks into a strategic, time-blocked weekly schedule.",
                version: "v1.1",
                formFields: [
                    { id: "tasks", label: "Raw Task List (Comma separated)", type: "text", placeholder: "e.g., Finish report, Call client, Gym 3x" }
                ],
                baseTemplate: `Act as an Executive Productivity Coach. Organize the following tasks into a strategic weekly schedule: {tasks}.

[PLANNING BEHAVIOR]
- Use time-blocking principles.
- Group similar tasks together (context switching reduction).
- Suggest realistic time allocations.`
            }
        ]
    }
};
