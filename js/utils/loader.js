import { initNavBar, loginUpdate } from "../components/layout.js";
import { initDropMenu } from "../components/dropMenu.js";
import { dataSettings, setSettings } from "./storage.js";
import { moonIcon, sunIcon } from "../../assets/icons.js";
import { nextLang, updateTexts } from "../language/languageController.js";
import { isLoggedIn } from "../services/services.js";

document.body.setAttribute('data-theme-loaded', 'true');

initNavBar();
updateTexts();
initDropMenu();

export const mainContainer = document.querySelector('#main-container');
let themeBtns = [];

export function refreshThemeButtons() {
    themeBtns = document.querySelectorAll('.theme-button');
}

export function applyThemeUI() {
    const settings = dataSettings();
    const isDark = settings.isDark;

    themeBtns.forEach(btn => {
        const isCircle = btn.classList.contains('circle-button');

        if (isCircle) {
            btn.innerHTML = isDark ? sunIcon : moonIcon;
        } else {
            btn.innerHTML = isDark
                ? `${sunIcon}<span data-lang="light"></span>`
                : `${moonIcon}<span data-lang="dark"></span>`;
        }
    });

    document.documentElement.classList.toggle('dark-theme', isDark);
}

mainContainer.addEventListener('click', (e) => {
    if (e.target.closest('.theme-button')) {
        const settings = dataSettings();
        const newDark = !document.documentElement.classList.contains('dark-theme');
        document.documentElement.classList.toggle('dark-theme', newDark);
        setSettings(settings.isRandom, settings.index, newDark,settings.showInput);
        applyThemeUI();
        updateTexts();
    }
    
    if (e.target.closest('.language-button')) {
        nextLang();
    }
});

applyThemeUI();
updateTexts();
isLoggedIn().then(loginUpdate);