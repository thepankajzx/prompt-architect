// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- State ---
    let currentCategory = null;
    let currentGenerator = null;

    // --- DOM Elements ---
    const categoryListEl = document.getElementById('category-list');
    const generatorListEl = document.getElementById('generator-list');
    const categoryTitleEl = document.getElementById('current-category-title');
    
    const configSection = document.getElementById('config-section');
    const emptyState = document.getElementById('empty-workspace-state');
    const outputSection = document.getElementById('output-section');
    const configForm = document.getElementById('prompt-config-form');
    const generatorTitleEl = document.getElementById('current-generator-title');
    const outputVersionBadge = document.getElementById('output-version-badge');
    const promptOutput = document.getElementById('prompt-output');
    
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const modelSelect = document.getElementById('ai-model-select');
    const planSelect = document.getElementById('ai-plan-select');

    // --- Initialization ---
    initCategories();

    // Select first category by default
    if (promptData.categories.length > 0) {
        selectCategory(promptData.categories[0].id);
    }

    // --- Core Functions ---

    function initCategories() {
        promptData.categories.forEach(category => {
            const li = document.createElement('li');
            li.className = 'category-item';
            li.textContent = category.title;
            li.dataset.id = category.id;
            
            li.addEventListener('click', () => {
                selectCategory(category.id);
            });
            
            categoryListEl.appendChild(li);
        });
    }

    function selectCategory(categoryId) {
        currentCategory = categoryId;
        
        // Update active styling
        document.querySelectorAll('.category-item').forEach(el => {
            el.classList.toggle('active', el.dataset.id === categoryId);
        });

        // Update title
        const categoryMeta = promptData.categories.find(c => c.id === categoryId);
        categoryTitleEl.textContent = categoryMeta ? categoryMeta.title : 'Select a Domain';

        // Render Generators
        renderGenerators(categoryId);
        
        // Reset workspace
        clearWorkspace();
    }

    function renderGenerators(categoryId) {
        generatorListEl.innerHTML = '';
        const generators = promptData.generators[categoryId] || [];

        if (generators.length === 0) {
            generatorListEl.innerHTML = '<p style="color: var(--text-muted); font-size: 13px;">No generators available yet.</p>';
            return;
        }

        generators.forEach(gen => {
            const card = document.createElement('div');
            card.className = 'generator-card';
            card.dataset.id = gen.id;
            card.innerHTML = `
                <h4>${gen.title} <span style="font-size: 10px; color: var(--accent-primary); opacity: 0.8; margin-left: 4px;">${gen.version}</span></h4>
                <p>${gen.description}</p>
            `;
            
            card.addEventListener('click', () => {
                selectGenerator(gen, card);
            });

            generatorListEl.appendChild(card);
        });
    }

    function selectGenerator(generator, cardElement) {
        currentGenerator = generator;
        
        // Active styling
        document.querySelectorAll('.generator-card').forEach(el => el.classList.remove('active'));
        if (cardElement) cardElement.classList.add('active');

        // Update Workspace Header
        generatorTitleEl.textContent = generator.title;
        outputVersionBadge.textContent = generator.version;

        // Render Config Form
        renderConfigForm(generator);

        // Show config, hide empty state & output
        emptyState.style.display = 'none';
        outputSection.style.display = 'none';
        configSection.style.display = 'block';
    }

    function renderConfigForm(generator) {
        configForm.innerHTML = '';
        
        generator.formFields.forEach(field => {
            const group = document.createElement('div');
            group.className = 'form-group';
            
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            group.appendChild(label);

            if (field.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = field.id;
                input.placeholder = field.placeholder || '';
                group.appendChild(input);
            } else if (field.type === 'select') {
                const select = document.createElement('select');
                select.id = field.id;
                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = opt;
                    select.appendChild(option);
                });
                group.appendChild(select);
            }

            configForm.appendChild(group);
        });
    }

    function clearWorkspace() {
        currentGenerator = null;
        configSection.style.display = 'none';
        outputSection.style.display = 'none';
        emptyState.style.display = 'flex';
        generatorTitleEl.textContent = 'Workspace';
    }

    // --- Actions ---

    generateBtn.addEventListener('click', () => {
        if (!currentGenerator) return;

        // Gather form data
        const formData = {};
        currentGenerator.formFields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                formData[field.id] = element.value;
            }
        });

        // Get AI settings
        const aiModel = modelSelect.value;
        const aiPlan = planSelect.value;

        // Use Engine to generate prompt
        const finalPrompt = PromptEngine.generate(currentGenerator, formData, aiModel, aiPlan);

        // Display output
        promptOutput.value = finalPrompt;
        outputSection.style.display = 'flex';
        
        // Scroll to output
        outputSection.scrollIntoView({ behavior: 'smooth' });
    });

    copyBtn.addEventListener('click', () => {
        if (!promptOutput.value) return;
        
        navigator.clipboard.writeText(promptOutput.value).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
            copyBtn.style.color = '#3fb950';
            copyBtn.style.borderColor = '#3fb950';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.color = '';
                copyBtn.style.borderColor = '';
            }, 2000);
        });
    });

});
