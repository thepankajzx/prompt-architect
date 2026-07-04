// js/engine.js

class PromptEngine {
    static generate(ticker, market, selectedModules, aiModelId, aiPlanId, outputFormat) {
        
        // 1. Strict Verification Directive
        const strictValidation = `[STRICT VERIFICATION DIRECTIVE - CRITICAL]
Before performing any financial analysis, first verify that the entered company (${ticker}) is publicly listed on the ${market.name} stock exchange (${market.exchange}).
If the company cannot be verified as a publicly listed company in that market, stop immediately and return ONLY this exact message:
"Company not found in the selected stock market. Please verify the company name or ticker symbol and try again."
Do not guess, do not assume, and do not generate fictional analysis for private or unlisted entities.`;

        // 2. Gather all unique expert roles
        const roles = [...new Set(selectedModules.map(m => m.expertRole))].join(" and ");
        
        // 3. Gather all objectives (replace {companyName} with the actual ticker)
        const objectives = selectedModules.map(m => m.objective.replace(/{companyName}/g, ticker))
            .map(obj => `• ${obj}`)
            .join("\n");
            
        // 4. Gather all required metrics
        const metrics = selectedModules.map(m => m.metrics)
            .map(m => `• ${m}`)
            .join("\n");
            
        // 5. Gather all analysis frameworks
        const frameworks = selectedModules.map(m => m.framework)
            .map(f => `• ${f}`)
            .join("\n");

        // 6. Fetch AI Model specific rules and Plan constraints
        const modelRules = promptData.aiModels[aiModelId]?.rules || "";
        
        let planRules = "";
        if (aiPlanId === "free") {
            planRules = "Keep the final report concise and within standard context window limits. Prioritize only the most critical data points.";
        } else {
            planRules = "Leverage maximum context capabilities. Provide exhaustive reasoning, deep historical context, and comprehensive multi-factor analysis.";
        }

        // 7. Output Format Logic (Visual vs Text)
        let formatInstructions = "";
        if (outputFormat === "visual") {
            formatInstructions = `
[VISUAL DATA REQUIREMENT - CRITICAL]
Provide the output ENTIRELY in raw HTML format.
- Use HTML/CSS to create beautiful data tables, color-coded metric cards (green for positive, red for negative), and charts using basic HTML/CSS.
- DO NOT provide walls of text. Ensure the user can understand the analysis at a glance.
- OUTPUT ONLY THE RAW HTML CODE inside a single code block. Do not write introductory or concluding conversational text.
- Tell the user: "Paste this code into the Prompt Architect HTML Visualizer to view your dashboard."`;
        } else {
            formatInstructions = `
[TEXT FORMATTING REQUIREMENT]
Provide a well-structured, highly readable text report. Use Markdown headings, bullet points, and bold text for emphasis. Ensure it is easy to read and follows a logical flow.`;
        }

        // 8. Assemble the final Master Prompt
        const finalPrompt = `
${strictValidation}

---
[TARGET ASSET]
Company / Ticker: ${ticker}
Market Context: ${market.name} (${market.exchange})

[EXPERT PERSONA]
Assume the combined roles of a ${roles}. 
Your analysis must be institutional-grade, evidence-based, and highly analytical. Do not use generic AI language.

[RESEARCH OBJECTIVES]
You are tasked with the following primary objectives:
${objectives}

[REQUIRED METRICS]
You must calculate, estimate, or reference the following metrics in your analysis:
${metrics}

[ANALYSIS FRAMEWORK]
Follow these specific analytical frameworks to conduct your research:
${frameworks}

---
[AI MODEL SPECIFIC INSTRUCTIONS: ${promptData.aiModels[aiModelId]?.name.toUpperCase() || "GENERIC"}]
${modelRules}

[COMPLEXITY & CONTEXT LIMITS]
${planRules}

${formatInstructions}
`;

        return finalPrompt.trim();
    }
}
