// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Management ---
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    
    // Initialize Theme from localStorage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }

    const toggleTheme = () => {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlEl.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    themeToggleBtn.addEventListener('click', toggleTheme);
    if(mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

    // --- State Management ---
    const appState = {
        ticker: '',
        market: null, // Will be set on init
        selectedCategories: [],
        selectedMiniTabs: []
    };

    const globalMarkets = [
        { id: 'US', flag: 'us', name: 'United States', exchange: 'NYSE / NASDAQ' },
        { id: 'IN', flag: 'in', name: 'India', exchange: 'NSE / BSE' },
        { id: 'GB', flag: 'gb', name: 'United Kingdom', exchange: 'LSE' },
        { id: 'JP', flag: 'jp', name: 'Japan', exchange: 'TSE' },
        { id: 'CN', flag: 'cn', name: 'China', exchange: 'SSE / SZSE' },
        { id: 'HK', flag: 'hk', name: 'Hong Kong', exchange: 'HKEX' },
        { id: 'SG', flag: 'sg', name: 'Singapore', exchange: 'SGX' },
        { id: 'CA', flag: 'ca', name: 'Canada', exchange: 'TSX' },
        { id: 'AU', flag: 'au', name: 'Australia', exchange: 'ASX' },
        { id: 'DE', flag: 'de', name: 'Germany', exchange: 'XETRA' },
        { id: 'FR', flag: 'fr', name: 'France', exchange: 'Euronext Paris' },
        { id: 'CH', flag: 'ch', name: 'Switzerland', exchange: 'SIX' },
        { id: 'KR', flag: 'kr', name: 'South Korea', exchange: 'KRX' },
        { id: 'TW', flag: 'tw', name: 'Taiwan', exchange: 'TWSE' },
        { id: 'BR', flag: 'br', name: 'Brazil', exchange: 'B3' }
    ];

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

    // --- Market Selector Logic ---
    const btnCountrySelector = document.getElementById('btn-country-selector');
    const countryDropdown = document.getElementById('country-dropdown');
    const countryList = document.getElementById('country-list');
    const countrySearch = document.getElementById('country-search');
    const selectedFlag = document.getElementById('selected-flag');

    appState.market = globalMarkets[0];
    selectedFlag.className = `fi fi-${appState.market.flag} fis rounded-full w-8 h-8 md:w-[38px] md:h-[38px] block group-hover:scale-110 transition-transform shadow-sm border border-zinc-200 dark:border-zinc-700`;
    selectedFlag.style.backgroundSize = "cover";
    selectedFlag.style.backgroundPosition = "center";

    function renderMarkets(markets) {
        countryList.innerHTML = '';
        markets.forEach(market => {
            const div = document.createElement('div');
            div.className = 'flex items-center justify-between p-3 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-xl cursor-pointer transition-colors';
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="fi fi-${market.flag} fis rounded-full w-6 h-6 block shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-sm" style="background-size: cover !important; background-position: center !important;"></span>
                    <div class="flex flex-col">
                        <span class="text-sm font-bold text-zinc-900 dark:text-white leading-tight">${market.name}</span>
                        <span class="text-[10px] text-zinc-500 font-medium">${market.exchange}</span>
                    </div>
                </div>
                ${appState.market.id === market.id ? '<i class="fas fa-check text-accent text-sm"></i>' : ''}
            `;
            div.addEventListener('click', () => {
                appState.market = market;
                selectedFlag.className = `fi fi-${market.flag} fis rounded-full w-8 h-8 md:w-[38px] md:h-[38px] block group-hover:scale-110 transition-transform shadow-sm border border-zinc-200 dark:border-zinc-700`;
                selectedFlag.style.backgroundSize = "cover";
                selectedFlag.style.backgroundPosition = "center";
                countryDropdown.classList.remove('opacity-100', 'scale-100');
                countryDropdown.classList.add('opacity-0', 'scale-95');
                setTimeout(() => countryDropdown.classList.add('hidden'), 200);
            });
            countryList.appendChild(div);
        });
    }

    if (btnCountrySelector && countryDropdown) {
        btnCountrySelector.addEventListener('click', (e) => {
            e.stopPropagation();
            if (countryDropdown.classList.contains('hidden')) {
                renderMarkets(globalMarkets);
                countryDropdown.classList.remove('hidden');
                setTimeout(() => {
                    countryDropdown.classList.remove('opacity-0', 'scale-95');
                    countryDropdown.classList.add('opacity-100', 'scale-100');
                }, 10);
                countrySearch.value = '';
                countrySearch.focus();
            } else {
                countryDropdown.classList.remove('opacity-100', 'scale-100');
                countryDropdown.classList.add('opacity-0', 'scale-95');
                setTimeout(() => countryDropdown.classList.add('hidden'), 200);
            }
        });

        countrySearch.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            const filtered = globalMarkets.filter(m => 
                m.name.toLowerCase().includes(q) || 
                m.exchange.toLowerCase().includes(q)
            );
            renderMarkets(filtered);
        });

        document.addEventListener('click', (e) => {
            if (!countryDropdown.contains(e.target) && !btnCountrySelector.contains(e.target) && !countryDropdown.classList.contains('hidden')) {
                countryDropdown.classList.remove('opacity-100', 'scale-100');
                countryDropdown.classList.add('opacity-0', 'scale-95');
                setTimeout(() => countryDropdown.classList.add('hidden'), 200);
            }
        });
    }

    // --- Validation Logic (Removed per user request) ---
    // The UI level validation has been removed. 
    // Validation is strictly handled by the AI Prompt Directive.

    function goToState2() {
        const ticker = tickerInput.value.trim();
        if (!ticker) {
            tickerError.classList.remove('hidden');
            return;
        }
        tickerError.classList.add('hidden');
        
        // Proceed to State 2 directly
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
    const navLogo = document.getElementById('nav-logo');
    navLogo.addEventListener('click', goToState1);

    btnContinue1.addEventListener('click', goToState2);
    tickerInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') goToState2(); });
    
    btnEditTicker.addEventListener('click', goToState1);
    
    btnContinue2.addEventListener('click', goToState3);
    
    btnEditCategories.addEventListener('click', goToState2);

    // Mobile Dropdown Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    
    if (mobileMenuBtn && mobileDropdown) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileDropdown.classList.contains('hidden')) {
                mobileDropdown.classList.remove('hidden');
                // trigger transition
                setTimeout(() => {
                    mobileDropdown.classList.remove('opacity-0', 'scale-95');
                    mobileDropdown.classList.add('opacity-100', 'scale-100');
                }, 10);
            } else {
                mobileDropdown.classList.remove('opacity-100', 'scale-100');
                mobileDropdown.classList.add('opacity-0', 'scale-95');
                setTimeout(() => mobileDropdown.classList.add('hidden'), 200);
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileDropdown.contains(e.target) && !mobileDropdown.classList.contains('hidden')) {
                mobileDropdown.classList.remove('opacity-100', 'scale-100');
                mobileDropdown.classList.add('opacity-0', 'scale-95');
                setTimeout(() => mobileDropdown.classList.add('hidden'), 200);
            }
        });
    }

    navVisualizer.addEventListener('click', goToVisualizer);
    
    const mobileNavVisualizer = document.getElementById('mobile-nav-visualizer');
    if(mobileNavVisualizer) {
        mobileNavVisualizer.addEventListener('click', () => {
            if (mobileDropdown && !mobileDropdown.classList.contains('hidden')) {
                mobileDropdown.classList.remove('opacity-100', 'scale-100');
                mobileDropdown.classList.add('opacity-0', 'scale-95');
                setTimeout(() => mobileDropdown.classList.add('hidden'), 200);
            }
            goToVisualizer();
        });
    }

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

    // --- Logic: Output Format Tabs ---
    const hiddenOutputFormat = document.getElementById('hidden_output_format');
    const tabFormatText = document.getElementById('tab-format-text');
    const tabFormatVisual = document.getElementById('tab-format-visual');

    const updateFormatTabs = () => {
        if (!hiddenOutputFormat || !tabFormatText || !tabFormatVisual) return;
        if (hiddenOutputFormat.value === 'text') {
            tabFormatText.className = 'flex-1 py-2 text-xs md:text-sm font-bold rounded-lg bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-white transition-all text-center flex items-center justify-center gap-1.5 md:gap-2';
            tabFormatVisual.className = 'flex-1 py-2 text-xs md:text-sm font-medium rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all text-center flex items-center justify-center gap-1.5 md:gap-2';
        } else {
            tabFormatVisual.className = 'flex-1 py-2 text-xs md:text-sm font-bold rounded-lg bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-white transition-all text-center flex items-center justify-center gap-1.5 md:gap-2';
            tabFormatText.className = 'flex-1 py-2 text-xs md:text-sm font-medium rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all text-center flex items-center justify-center gap-1.5 md:gap-2';
        }
    };

    if (tabFormatText && tabFormatVisual) {
        tabFormatText.addEventListener('click', () => {
            hiddenOutputFormat.value = 'text';
            updateFormatTabs();
        });
        tabFormatVisual.addEventListener('click', () => {
            hiddenOutputFormat.value = 'visual';
            updateFormatTabs();
        });
    }

    // --- Logic: Free Plan & Format Toggle ---
    const outputFormatContainer = document.getElementById('output-format-container');
    function updatePlanWarnings() {
        const isFree = planSelect.value === 'free';
        
        if (isFree) {
            if (outputFormatContainer) outputFormatContainer.classList.add('hidden');
            // Force reset to text if free is selected
            if (hiddenOutputFormat) {
                hiddenOutputFormat.value = 'text';
                updateFormatTabs();
            }
        } else {
            if (outputFormatContainer) outputFormatContainer.classList.remove('hidden');
        }
    }
    
    // Call on init to set the default state
    updatePlanWarnings();
    
    planSelect.addEventListener('change', updatePlanWarnings);

    // --- Generate & Copy Action ---
    btnGenerate.addEventListener('click', () => {
        if (appState.selectedMiniTabs.length === 0) {
            miniTabError.classList.remove('hidden');
            return;
        }

        const aiModel = modelSelect.value;
        const aiPlan = planSelect.value;
        const outputFormat = hiddenOutputFormat ? hiddenOutputFormat.value : 'text';

        // Generate the complex prompt
        const finalPrompt = PromptEngine.generate(appState.ticker, appState.market, appState.selectedMiniTabs, aiModel, aiPlan, outputFormat);

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

// Global toast hide function
window.hideToast = function(toastId) {
    const el = document.getElementById(toastId);
    if(el) {
        el.classList.add('opacity-0', 'pointer-events-none');
        el.classList.remove('opacity-100');
    }
};

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
