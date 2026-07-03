// js/data.js (Main Data Index)
// This file assumes data_1.js and data_2.js have been loaded prior.

const promptData = {
    aiModels: window.promptDataPart1.aiModels,
    categories: [
        ...window.promptDataPart1.categories,
        ...window.promptDataPart2.categories
    ],
    modules: {
        ...window.promptDataPart1.modules,
        ...window.promptDataPart2.modules
    }
};

if (typeof window !== 'undefined') {
    window.promptData = promptData;
}
