// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    let currentCategory = null;
    let currentGenerator = null;

    // DOM Elements
    const categoryListEl = document.getElementById('category-list');
    const generatorListEl = document.getElementById('generator-list');
    const categoryTitleEl = document.getElementById('current-category-title');
    
    const emptyState = document.getElementById('empty-state');
    const configSection = document.getElementById('config-section');
    const generatorTitleEl = document.getElementById('current-generator-title');
    const outputVersionBadge = document.getElementById('output-version-badge');
    const configForm = document.getElementById('prompt-config-form');
    
    const hiddenPromptStorage = document.getElementById('hidden-prompt-storage');
    const generateCopyBtn = document.getElementById('generate-copy-btn');
    
    const modelSelect = document.getElementById('ai-model-select');
    const planSelect = document.getElementById('ai-plan-select');
    const formatRadios = document.getElementsByName('output_format');
    const freePlanWarning = document.getElementById('free-plan-warning');

    // Initialization
    initCategories();
    if (promptData.categories.length > 0) {
        selectCategory(promptData.categories[0].id);
    }

    // Logic: Free Plan Warning for Visual HTML
    function updatePlanWarnings() {
        const isFree = planSelect.value === 'free';
        const isVisual = document.querySelector('input[name="output_format"]:checked').value === 'visual';
        
        if (isFree && isVisual) {
            freePlanWarning.classList.remove('hidden');
        } else {
            freePlanWarning.classList.add('hidden');
        }
    }

    planSelect.addEventListener('change', updatePlanWarnings);
    formatRadios.forEach(radio => radio.addEventListener('change', updatePlanWarnings));

    // Core Functions
    function initCategories() {
        promptData.categories.forEach(category => {
            const a = document.createElement('a');
            a.href = '#';
            a.className = 'nav-item flex items-center px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors';
            a.dataset.id = category.id;
            
            a.innerHTML = `<i class="fas ${category.icon} w-6 text-center mr-2"></i> ${category.title}`;
            
            a.addEventListener('click', (e) => {
                e.preventDefault();
                selectCategory(category.id);
            });
            
            categoryListEl.appendChild(a);
        });
    }

    function selectCategory(categoryId) {
        currentCategory = categoryId;
        
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.id === categoryId);
        });

        const categoryMeta = promptData.categories.find(c => c.id === categoryId);
        categoryTitleEl.textContent = categoryMeta ? categoryMeta.title : 'Domain';

        renderGenerators(categoryId);
        clearWorkspace();
    }

    function renderGenerators(categoryId) {
        generatorListEl.innerHTML = '';
        const generators = promptData.generators[categoryId] || [];

        if (generators.length === 0) {
            generatorListEl.innerHTML = '<p class="text-zinc-500 text-sm">No tools available yet.</p>';
            return;
        }

        generators.forEach(gen => {
            const card = document.createElement('div');
            card.className = 'generator-card bg-darkSurface border border-darkBorder rounded-xl p-5 mb-4 cursor-pointer relative overflow-hidden group';
            card.dataset.id = gen.id;
            card.innerHTML = `
                <div class="flex items-start">
                    <div class="mt-1 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 text-zinc-400 group-hover:text-finGreen transition-colors">
                        <i class="fas ${gen.icon}"></i>
                    </div>
                    <div class="ml-4 flex-1">
                        <h4 class="text-zinc-100 font-semibold text-sm mb-1">${gen.title}</h4>
                        <p class="text-xs text-zinc-400 leading-relaxed">${gen.description}</p>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                selectGenerator(gen, card);
            });

            generatorListEl.appendChild(card);
        });
    }

    function selectGenerator(generator, cardElement) {
        currentGenerator = generator;
        
        document.querySelectorAll('.generator-card').forEach(el => el.classList.remove('active'));
        if (cardElement) cardElement.classList.add('active');

        generatorTitleEl.textContent = generator.title;
        outputVersionBadge.textContent = generator.version;

        renderConfigForm(generator);

        emptyState.style.display = 'none';
        configSection.style.display = 'flex';
    }

    function renderConfigForm(generator) {
        configForm.innerHTML = '';
        
        generator.fields.forEach(field => {
            const group = document.createElement('div');
            
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.className = 'block text-xs font-medium text-zinc-400 mb-1';
            label.textContent = field.label;
            group.appendChild(label);

            if (field.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = field.id;
                input.placeholder = field.placeholder || '';
                input.className = 'w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-finGreen focus:ring-1 focus:ring-finGreen transition-colors';
                group.appendChild(input);
            } else if (field.type === 'select') {
                const select = document.createElement('select');
                select.id = field.id;
                select.className = 'w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-finGreen transition-colors';
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
        emptyState.style.display = 'flex';
    }

    // Generate & Copy Action
    generateCopyBtn.addEventListener('click', () => {
        if (!currentGenerator) return;

        // Gather Data
        const formData = {};
        currentGenerator.fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                formData[field.id] = element.value;
            }
        });

        const aiModel = modelSelect.value;
        const aiPlan = planSelect.value;
        const outputFormat = document.querySelector('input[name="output_format"]:checked').value;

        // Generate
        const finalPrompt = PromptEngine.generate(currentGenerator, formData, aiModel, aiPlan, outputFormat);

        // Copy to Clipboard (Hidden)
        navigator.clipboard.writeText(finalPrompt).then(() => {
            // Visual feedback
            const originalContent = generateCopyBtn.innerHTML;
            generateCopyBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Copied to Clipboard!</span>';
            generateCopyBtn.classList.remove('from-finGreen', 'to-emerald-600');
            generateCopyBtn.classList.add('bg-zinc-800', 'border', 'border-finGreen', 'text-finGreen');
            
            setTimeout(() => {
                generateCopyBtn.innerHTML = originalContent;
                generateCopyBtn.classList.add('from-finGreen', 'to-emerald-600');
                generateCopyBtn.classList.remove('bg-zinc-800', 'border', 'border-finGreen', 'text-finGreen');
            }, 3000);
        });
    });

});
