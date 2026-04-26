export const dataWords = () => safeParse('dataWords');
export const dataSettings = () => safeParse('dataSettings');
export const dataLogin = () => safeParse('dataLogin');
export const markupSettings = () => safeParse('markupSettings');

export const setSettings = (isRandom, index, isDark, showInput) => {
    localStorage.setItem('dataSettings', JSON.stringify({
            'isRandom': isRandom,
            'index': index,
            'isDark': isDark,
            'showInput': showInput
    }));
};

export const setLogin = (nickname, passwordHash, login) => {
    localStorage.setItem('dataLogin', JSON.stringify({
            'nickname': nickname,
            'passwordHash': passwordHash,
            'login': login
    }));
};

export const setWords = (fileName, info) => {
    localStorage.setItem('dataWords', JSON.stringify({
            'fileName': fileName,
            'image': info.image,
            'preimage': info.preimage,
            'addition': info.addition
    }));
};

const safeParse = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || {};
    } catch {
        return {};
    }
};