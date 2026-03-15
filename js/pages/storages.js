export const dataWords = JSON.parse(localStorage.getItem('dataWords') || '{}');
//export const dataIndices = JSON.parse(localStorage.getItem('dataIndices') || '{}');
export const dataSettings = JSON.parse(localStorage.getItem('dataSettings') || '{}');

export const setSettings = (isRandom, index) => {
    localStorage.setItem('dataSettings', JSON.stringify({
            'isRandom': isRandom,
            'index': index
    }));
};