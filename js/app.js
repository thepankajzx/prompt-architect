// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- State Management ---
    let appState = {
        ticker: "",
        selectedCategories: [], // max 2
        selectedMiniTabs: []    // unlimited
    };

    // --- DOM Elements ---
    const state1 = document.getElementById('state-1');
    const state2 = document.getElementById('state-2');
    const state3 = document.getElementById('state-3');
    const stateVisualizer = document.getElementById('state-visualizer');
    
    // Inputs & Buttons
    const tickerInput = document.getElementById('ticker-input');
    const btnContinue1 = document.getElementById('btn-continue-1');
    const tickerError = document.getElementById('ticker-error');
    
    const categoryGrid = document.getElementById('category-grid');
    const btnContinue2 = document.getElementById('btn-continue-2');
    const catCountSpan = document.getElementById('cat-count');
    const maxCatToast = document.getElementById('max-cat-toast');
    
    const miniTabsContainer = document.getElementById('mini-tabs-container');
    const btnGenerate = document.getElementById('generate-copy-btn');
    const miniTabError = document.getElementById('mini-tab-error');
    
    // Displays & Edits
    const displayTicker2 = document.getElementById('display-ticker');
    const displayTicker3 = document.getElementById('display-ticker-3');
    const displayCategories = document.getElementById('display-categories');
    
    const btnEditTicker = document.getElementById('btn-edit-ticker');
    const btnEditCategories = document.getElementById('btn-edit-categories');

    // Visualizer
    const navVisualizer = document.getElementById('nav-visualizer');
    const btnCloseVisualizer = document.getElementById('btn-close-visualizer');
    const btnRender = document.getElementById('btn-render-html');
    const btnDownload = document.getElementById('btn-download-html');
    const visualizerInput = document.getElementById('visualizer-input');
    const visualizerFrame = document.getElementById('visualizer-frame');
    const visualizerPlaceholder = document.getElementById('visualizer-placeholder');
    
    // AI Settings
    const modelSelect = document.getElementById('ai-model-select');
    const planSelect = document.getElementById('ai-plan-select');
    const formatRadios = document.getElementsByName('output_format');
    const freePlanWarning = document.getElementById('free-plan-warning');

    // --- Initialization ---
    renderCategoryGrid();
    
    // --- Navigation Logic ---
    function hideAllStates() {
        state1.classList.add('hidden');
        state2.classList.add('hidden');
        state2.classList.remove('flex');
        state3.classList.add('hidden');
        state3.classList.remove('flex');
        stateVisualizer.classList.add('hidden');
        stateVisualizer.classList.remove('flex');
    }

    function goToState1() {
        hideAllStates();
        state1.classList.remove('hidden');
        tickerInput.focus();
    }

    function goToState2() {
        const ticker = tickerInput.value.trim();
        if (!ticker) {
            tickerError.classList.remove('hidden');
            return;
        }
        tickerError.classList.add('hidden');
        appState.ticker = ticker;
        displayTicker2.textContent = ticker;
        
        hideAllStates();
        state2.classList.remove('hidden');
        state2.classList.add('flex');
    }

    function goToState3() {
        if (appState.selectedCategories.length === 0) return;
        
        displayTicker3.textContent = appState.ticker;
        const catNames = appState.selectedCategories.map(id => {
            return promptData.categories.find(c => c.id === id).title;
        }).join(', ');
        displayCategories.textContent = catNames;
        
        renderMiniTabs();
        
        hideAllStates();
        state3.classList.remove('hidden');
        state3.classList.add('flex');
    }

    function goToVisualizer() {
        hideAllStates();
        stateVisualizer.classList.remove('hidden');
        stateVisualizer.classList.add('flex');
    }

    // --- Event Listeners: Navigation ---
    btnContinue1.addEventListener('click', goToState2);
    tickerInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') goToState2(); });
    
    btnEditTicker.addEventListener('click', goToState1);
    
    btnContinue2.addEventListener('click', goToState3);
    
    btnEditCategories.addEventListener('click', goToState2);

    navVisualizer.addEventListener('click', goToVisualizer);
    btnCloseVisualizer.addEventListener('click', () => {
        if (appState.selectedCategories.length > 0) goToState3();
        else if (appState.ticker) goToState2();
        else goToState1();
    });

    // --- Render Logic ---

    function renderCategoryGrid() {
        categoryGrid.innerHTML = '';
        promptData.categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'cat-card bg-darkSurface border border-darkBorder rounded-xl p-6 flex flex-col items-center text-center';
            card.dataset.id = cat.id;
            
            card.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 text-zinc-400 mb-4 transition-colors icon-wrapper">
                    <i class="fas ${cat.icon} text-xl"></i>
                </div>
                <h3 class="text-white font-semibold text-lg mb-2">${cat.title}</h3>
                <p class="text-zinc-400 text-sm leading-relaxed">${cat.desc}</p>
            `;

            card.addEventListener('click', () => toggleCategory(cat.id, card));
            categoryGrid.appendChild(card);
        });
    }

    function toggleCategory(catId, cardEl) {
        const idx = appState.selectedCategories.indexOf(catId);
        
        if (idx > -1) {
            // Deselect
            appState.selectedCategories.splice(idx, 1);
            cardEl.classList.remove('selected');
            cardEl.querySelector('.icon-wrapper').classList.remove('text-accent', 'border-accent');
        } else {
            // Select (Max 2)
            if (appState.selectedCategories.length >= 2) {
                showToast(maxCatToast);
                // Shake animation
                cardEl.style.animation = 'shake 0.4s';
                setTimeout(() => cardEl.style.animation = '', 400);
                return;
            }
            appState.selectedCategories.push(catId);
            cardEl.classList.add('selected');
            cardEl.querySelector('.icon-wrapper').classList.add('text-accent', 'border-accent');
        }

        updateCategoryUI();
    }

    function updateCategoryUI() {
        const count = appState.selectedCategories.length;
        
        // Update unselected cards state (dim them if max reached)
        document.querySelectorAll('.cat-card').forEach(card => {
            if (!appState.selectedCategories.includes(card.dataset.id)) {
                if (count >= 2) card.classList.add('disabled');
                else card.classList.remove('disabled');
            }
        });

        if (count > 0) {
            catCountSpan.textContent = count;
            btnContinue2.classList.remove('hidden');
        } else {
            btnContinue2.classList.add('hidden');
        }
        
        // Reset mini tabs if categories change
        appState.selectedMiniTabs = [];
    }

    function showToast(el) {
        el.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            el.classList.add('opacity-0', 'pointer-events-none');
        }, 3000);
    }

    function renderMiniTabs() {
        miniTabsContainer.innerHTML = '';
        
        appState.selectedCategories.forEach(catId => {
            const catMeta = promptData.categories.find(c => c.id === catId);
            const modules = promptData.modules[catId] || [];
            
            if (modules.length === 0) return;

            const section = document.createElement('div');
            section.className = 'bg-darkSurface border border-darkBorder rounded-xl p-6 shadow-lg fade-in';
            
            section.innerHTML = `
                <div class="flex items-center mb-6 pb-4 border-b border-darkBorder">
                    <i class="fas ${catMeta.icon} text-accent text-xl mr-3"></i>
                    <h2 class="text-xl font-bold text-white">${catMeta.title} Modules</h2>
                </div>
                <div class="flex flex-wrap gap-3" id="chip-container-${catId}"></div>
            `;
            
            miniTabsContainer.appendChild(section);
            
            const chipContainer = section.querySelector(`#chip-container-${catId}`);
            
            modules.forEach(mod => {
                const chip = document.createElement('button');
                chip.className = 'mini-tab-chip px-4 py-2 rounded-lg text-sm font-medium text-zinc-300';
                chip.textContent = mod.title;
                
                // Re-apply selected state if it exists
                if (appState.selectedMiniTabs.some(m => m.id === mod.id)) {
                    chip.classList.add('selected');
                }
                
                chip.addEventListener('click', () => {
                    const exists = appState.selectedMiniTabs.findIndex(m => m.id === mod.id);
                    if (exists > -1) {
                        appState.selectedMiniTabs.splice(exists, 1);
                        chip.classList.remove('selected');
                    } else {
                        appState.selectedMiniTabs.push(mod);
                        chip.classList.add('selected');
                    }
                    miniTabError.classList.add('hidden');
                });
                
                chipContainer.appendChild(chip);
            });
        });
    }

    // --- Logic: Free Plan Warning ---
    function updatePlanWarnings() {
        const isFree = planSelect.value === 'free';
        const isVisual = document.querySelector('input[name="output_format"]:checked').value === 'visual';
        
        if (isFree && isVisual) freePlanWarning.classList.remove('hidden');
        else freePlanWarning.classList.add('hidden');
    }
    planSelect.addEventListener('change', updatePlanWarnings);
    formatRadios.forEach(radio => radio.addEventListener('change', updatePlanWarnings));

    // --- Generate & Copy Action ---
    btnGenerate.addEventListener('click', () => {
        if (appState.selectedMiniTabs.length === 0) {
            miniTabError.classList.remove('hidden');
            return;
        }

        const aiModel = modelSelect.value;
        const aiPlan = planSelect.value;
        const outputFormat = document.querySelector('input[name="output_format"]:checked').value;

        // Generate the complex prompt
        const finalPrompt = PromptEngine.generate(appState.ticker, appState.selectedMiniTabs, aiModel, aiPlan, outputFormat);

        // Copy to Clipboard
        navigator.clipboard.writeText(finalPrompt).then(() => {
            const originalContent = btnGenerate.innerHTML;
            btnGenerate.innerHTML = '<i class="fas fa-check-circle"></i><span>Copied to Clipboard!</span>';
            btnGenerate.classList.remove('from-accent', 'to-blue-600');
            btnGenerate.classList.add('bg-finGreen');
            
            setTimeout(() => {
                btnGenerate.innerHTML = originalContent;
                btnGenerate.classList.add('from-accent', 'to-blue-600');
                btnGenerate.classList.remove('bg-finGreen');
            }, 3000);
        });
    });

    // --- Visualizer Logic ---
    btnRender.addEventListener('click', () => {
        const rawHtml = visualizerInput.value;
        if (!rawHtml.trim()) return;
        visualizerPlaceholder.style.display = 'none';
        visualizerFrame.srcdoc = rawHtml;
    });

    btnDownload.addEventListener('click', () => {
        const rawHtml = visualizerInput.value;
        if (!rawHtml.trim()) {
            alert('Please paste some HTML code first.');
            return;
        }
        const blob = new Blob([rawHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'financial_dashboard.html';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    });

});

// Global shake animation style
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}`;
document.head.appendChild(style);
