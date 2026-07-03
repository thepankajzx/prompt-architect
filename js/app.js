// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Management ---
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Initialize Theme from localStorage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlEl.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- State Management ---
    let appState = {
        ticker: "",
        selectedCategories: [], // max 2
        selectedMiniTabs: []    // unlimited (or max 5 if custom)
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
    const floatingContinueContainer = document.getElementById('floating-continue-container');
    
    // Toasts
    const maxCatToast = document.getElementById('max-cat-toast');
    const premiumToast = document.getElementById('premium-toast');
    
    // State 3
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
    const btnDownloadHtml = document.getElementById('btn-download-html');
    const btnDownloadPdf = document.getElementById('btn-download-pdf');
    const btnExpandPreview = document.getElementById('btn-expand-preview');
    
    const visualizerInput = document.getElementById('visualizer-input');
    const visualizerContainer = document.getElementById('visualizer-container');
    const visualizerFrame = document.getElementById('visualizer-frame');
    const visualizerPlaceholder = document.getElementById('visualizer-placeholder');
    
    // AI Settings
    const modelSelect = document.getElementById('ai-model-select');
    const planSelect = document.getElementById('ai-plan-select');
    const formatRadios = document.getElementsByName('output_format');
    const freePlanWarning = document.getElementById('free-plan-warning');

    let isHtmlRendered = false;

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
        floatingContinueContainer.classList.add('hidden');
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
        updateCategoryUI(); // to show/hide floating button
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
            card.className = 'cat-card bg-white dark:bg-darkSurface border border-zinc-200 dark:border-darkBorder rounded-xl p-4 md:p-6 flex flex-col items-center text-center shadow-sm dark:shadow-none';
            card.dataset.id = cat.id;
            
            // Apply colorful icon class if exists, otherwise fallback to text-zinc-500
            const iconColor = cat.colorClass || 'text-zinc-500';

            card.innerHTML = `
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 mb-3 md:mb-4 transition-colors icon-wrapper">
                    <i class="fas ${cat.icon} text-lg md:text-xl ${iconColor}"></i>
                </div>
                <h3 class="text-zinc-900 dark:text-white font-semibold text-base md:text-lg mb-1 md:mb-2">${cat.title}</h3>
                <p class="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">${cat.desc}</p>
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
        } else {
            // Select (Max 2)
            if (appState.selectedCategories.length >= 2) {
                showToast(maxCatToast);
                cardEl.style.animation = 'shake 0.4s';
                setTimeout(() => cardEl.style.animation = '', 400);
                return;
            }
            appState.selectedCategories.push(catId);
            cardEl.classList.add('selected');
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
            floatingContinueContainer.classList.remove('hidden');
        } else {
            floatingContinueContainer.classList.add('hidden');
        }
        
        // Reset mini tabs if categories change
        appState.selectedMiniTabs = [];
    }

    function showToast(el) {
        el.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            el.classList.add('opacity-0', 'pointer-events-none');
        }, 5000);
    }

    function renderMiniTabs() {
        miniTabsContainer.innerHTML = '';
        
        // SPECIAL LOGIC: If "custom" is selected, we pull from ALL categories
        const isCustomSelected = appState.selectedCategories.includes("custom");

        if (isCustomSelected) {
            // Group all modules by their category
            promptData.categories.forEach(catMeta => {
                const modules = promptData.modules[catMeta.id] || [];
                if (modules.length > 0) {
                    appendMiniTabSection(catMeta, modules, true);
                }
            });
        } else {
            // Normal Logic
            appState.selectedCategories.forEach(catId => {
                const catMeta = promptData.categories.find(c => c.id === catId);
                const modules = promptData.modules[catId] || [];
                if (modules.length > 0) {
                    appendMiniTabSection(catMeta, modules, false);
                }
            });
        }
    }

    function appendMiniTabSection(catMeta, modules, isCustomMode) {
        const section = document.createElement('div');
        section.className = 'bg-white dark:bg-darkSurface border border-zinc-200 dark:border-darkBorder rounded-xl p-4 md:p-6 shadow-sm dark:shadow-md fade-in';
        
        const iconColor = catMeta.colorClass || 'text-accent';

        section.innerHTML = `
            <div class="flex items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-zinc-200 dark:border-darkBorder">
                <i class="fas ${catMeta.icon} ${iconColor} text-lg md:text-xl mr-3"></i>
                <h2 class="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">${catMeta.title} Modules</h2>
            </div>
            <div class="flex flex-wrap gap-2 md:gap-3" id="chip-container-${catMeta.id}"></div>
        `;
        
        miniTabsContainer.appendChild(section);
        
        const chipContainer = section.querySelector(`#chip-container-${catMeta.id}`);
        
        modules.forEach(mod => {
            const chip = document.createElement('button');
            chip.className = 'mini-tab-chip px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-darkBorder bg-zinc-50 dark:bg-transparent';
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
                    // Limit to 5 mini-tabs universally
                    if (appState.selectedMiniTabs.length >= 5) {
                        showToast(premiumToast);
                        chip.style.animation = 'shake 0.4s';
                        setTimeout(() => chip.style.animation = '', 400);
                        return;
                    }

                    appState.selectedMiniTabs.push(mod);
                    chip.classList.add('selected');
                }
                miniTabError.classList.add('hidden');
            });
            
            chipContainer.appendChild(chip);
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
        isHtmlRendered = true;
    });

    // Download HTML
    btnDownloadHtml.addEventListener('click', () => {
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

    // Download PDF (Native Print API)
    btnDownloadPdf.addEventListener('click', () => {
        if (!isHtmlRendered || !visualizerInput.value.trim()) {
            alert('Please render the HTML preview before downloading the PDF.');
            return;
        }
        
        try {
            // Attempt to trigger the native print dialog on the iframe content
            visualizerFrame.contentWindow.focus();
            visualizerFrame.contentWindow.print();
        } catch (e) {
            console.error("PDF Export failed. Ensure the iframe is fully loaded.", e);
            alert("Unable to generate PDF. Please try again or download the HTML file instead.");
        }
    });

    // Full-Screen Preview Mode
    btnExpandPreview.addEventListener('click', () => {
        if (!isHtmlRendered) {
            alert('Please render the HTML preview before expanding.');
            return;
        }

        if (!document.fullscreenElement) {
            if (visualizerContainer.requestFullscreen) {
                visualizerContainer.requestFullscreen();
            } else if (visualizerContainer.webkitRequestFullscreen) { /* Safari */
                visualizerContainer.webkitRequestFullscreen();
            } else if (visualizerContainer.msRequestFullscreen) { /* IE11 */
                visualizerContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Listen for fullscreen changes to update icon
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    function handleFullscreenChange() {
        if (document.fullscreenElement) {
            btnExpandPreview.innerHTML = '<i class="fas fa-compress"></i>';
            btnExpandPreview.title = "Exit Full-Screen (Esc)";
        } else {
            btnExpandPreview.innerHTML = '<i class="fas fa-expand"></i>';
            btnExpandPreview.title = "Expand to Full-Screen";
        }
    }

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
