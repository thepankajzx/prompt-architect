// js/engine.js

class PromptEngine {
    static generate(generator, formData, aiModelId, aiPlanId, outputFormat) {
        let prompt = generator.baseTemplate;

        // 1. Replace variables in the base template with user inputs
        for (const [key, value] of Object.entries(formData)) {
            const regex = new RegExp(`{${key}}`, 'g');
            const safeValue = value.trim() !== '' ? value : `[INSERT ${key.toUpperCase()}]`;
            prompt = prompt.replace(regex, safeValue);
        }

        // 2. Fetch AI Model specific rules and Plan constraints
        const modelRules = promptData.aiModels[aiModelId]?.rules || "";
        
        let planRules = "";
        if (aiPlanId === "free") {
            planRules = "Keep the final report concise and within standard context window limits. Prioritize the most critical data points.";
        } else {
            planRules = "Leverage maximum context capabilities. Provide exhaustive reasoning and deep historical context.";
        }

        // 3. Output Format Logic (Visual vs Text)
        let formatInstructions = "";
        if (outputFormat === "visual") {
            formatInstructions = `
[VISUAL DATA REQUIREMENT - CRITICAL]
Provide the output entirely in Visual HTML format so it can be rendered as a dashboard. 
- Use HTML/CSS to create beautiful data tables, color-coded metric cards (green for positive, red for negative), and bar/line charts using basic HTML elements.
- DO NOT provide long walls of text. 
- The user must be able to understand the analysis at a glance through structured visual layouts (e.g., product breakups, earnings graphs).
- Output valid HTML only.`;
        } else {
            formatInstructions = `
[TEXT FORMATTING REQUIREMENT]
Provide a well-structured, highly readable text report. Use Markdown headings, bullet points, and bold text for emphasis. Ensure it is easy to read.`;
        }

        // 4. Assemble the final prompt structure
        const finalPrompt = `
${prompt}

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
