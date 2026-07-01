// js/engine.js

class PromptEngine {
    /**
     * Generates the final engineered prompt.
     * @param {Object} generator - The selected generator config.
     * @param {Object} formData - Key-value pairs from the user inputs.
     * @param {string} aiModelId - The selected AI Model (e.g., 'chatgpt').
     * @param {string} aiPlanId - The selected AI Plan (e.g., 'pro').
     * @returns {string} The final assembled prompt.
     */
    static generate(generator, formData, aiModelId, aiPlanId) {
        let prompt = generator.baseTemplate;

        // 1. Replace variables in the base template with user inputs
        for (const [key, value] of Object.entries(formData)) {
            const regex = new RegExp(`{${key}}`, 'g');
            // If user left it blank, use a placeholder
            const safeValue = value.trim() !== '' ? value : `[INSERT ${key.toUpperCase()}]`;
            prompt = prompt.replace(regex, safeValue);
        }

        // 2. Fetch AI Model specific rules and Plan constraints
        const modelRules = promptData.aiModels[aiModelId]?.rules || "";
        const planRules = promptData.aiPlans[aiPlanId] || "";

        // 3. Assemble the final prompt structure
        const finalPrompt = `
${prompt}

---
[AI MODEL SPECIFIC INSTRUCTIONS: ${promptData.aiModels[aiModelId]?.name.toUpperCase() || "GENERIC"}]
${modelRules}

[COMPLEXITY & CONTEXT LIMITS]
${planRules}
`;

        return finalPrompt.trim();
    }
}
