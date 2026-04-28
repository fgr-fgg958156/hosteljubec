export const dataWords = () => safeParse('dataWords');
export const dataSettings = () => safeParse('dataSettings');

export const setSettings = (isRandom, index, isDark, showInput) => {
    localStorage.setItem('dataSettings', JSON.stringify({
            'isRandom': isRandom,
            'index': index,
            'isDark': isDark,
            'showInput': showInput
    }));
};

export const setWords = (fileName, info, tags = []) => {
    localStorage.setItem('dataWords', JSON.stringify({
            'fileName': fileName,
            'image': info.image,
            'preimage': info.preimage,
            'addition': info.addition,
            'tags' : tags
    }));
};

const safeParse = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || {};
    } catch {
        return {};
    }
};