export const dataWords = () => 
    JSON.parse(localStorage.getItem('dataWords') || '{}');
export const dataSettings = () => 
    JSON.parse(localStorage.getItem('dataSettings') || '{}');

export const setSettings = (isRandom, index, isDark) => {
    localStorage.setItem('dataSettings', JSON.stringify({
            'isRandom': isRandom,
            'index': index,
            'isDark': isDark
    }));
};