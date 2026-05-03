import { dataWords } from "../utils/storage.js";
import { languages } from "./languages.js";

const defaultLang = Object.keys(languages)[0];

let currentLang = localStorage.getItem("dataLanguage") || defaultLang;

function resolve(lang, key) {
    if (!lang) return null;

    if (lang[key]) return lang[key];

    if (lang.base) {
        return resolve(languages[lang.base], key);
    }

    return null;
}

export function t(key) {
    return resolve(languages[currentLang], key) || key;
}

export function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("dataLanguage", lang);
    updateTexts();
}

export function nextLang() {
    const keys = Object.keys(languages);
    const currentIndex = keys.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % keys.length;
    currentLang = keys[nextIndex];
    localStorage.setItem("dataLanguage", currentLang);
    updateTexts();
}

export function updateTexts(root = document) {
    const words = dataWords();
    const hasWords = words && Object.keys(words).length > 0;

    root.querySelectorAll("[data-lang]").forEach(el => {
        if (
            hasWords &&
            (
                el.classList.contains("additional-span") ||
                el.classList.contains("front-span") ||
                el.classList.contains("back-span") ||
                el.classList.contains("file-name")
            )
        ) return;

        const key = el.dataset.lang;
        el.textContent = t(key);
    });

    root.querySelectorAll("[data-lang-placeholder]").forEach(el => {
        if (
            hasWords &&
            (
                el.classList.contains("additional-span") ||
                el.classList.contains("front-span") ||
                el.classList.contains("back-span") ||
                el.classList.contains("file-name")
            )
        ) return;

        const key = el.dataset.langPlaceholder;
        el.placeholder = t(key);
    });
}