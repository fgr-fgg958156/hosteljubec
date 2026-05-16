export const dataWords = () => safeParse('dataWords');
export const dataSettings = () => safeParse('dataSettings');

export const setSettings = ({isRandom, index, isDark, showInput, learningMode = false, testMode = false, cooldown = 2000, foldersMode = false}) => {
    localStorage.setItem('dataSettings', JSON.stringify({
            'isRandom': isRandom,
            'index': index,
            'isDark': isDark,
            'showInput': showInput,
            'learningMode': learningMode,
            'testMode' : testMode,
            'cooldown' : cooldown,
            'foldersMode' : foldersMode
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