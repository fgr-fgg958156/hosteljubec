import { initNavBar, loginUpdate } from "../components/layout.js";
import { initDropMenu } from "../components/dropMenu.js";
import { dataSettings, setSettings } from "./storage.js";
import { moonIcon, sunIcon } from "../../assets/icons.js";
import { nextLang, updateTexts } from "../language/languageController.js";
import { isLoggedIn } from "../services/services.js";
import { counterUpdate } from "../pages/home/update.js";
import { runnyWords, words } from "../pages/home/homeFunctionality.js";
import { initHostja } from "../components/hotja.js";
import { initHostjaMovement } from "../components/hostjaMovement.js";

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

    if(isDark) document.documentElement.classList.add('dark-theme');
    else document.documentElement.classList.remove('dark-theme');
}

mainContainer.addEventListener('click', (e) => {
    if (e.target.closest('.theme-button')) {
        const settings = dataSettings();
        const newDark = !document.documentElement.classList.contains('dark-theme');
        document.documentElement.classList.toggle('dark-theme', newDark);
        
        setSettings({...settings, isDark: newDark});
        applyThemeUI();
        updateTexts();
    }
    
    if (e.target.closest('.language-button')) {
        nextLang();
        const settings = dataSettings();
        counterUpdate(document.querySelector('.counter'), settings, runnyWords, words);
    }
});

refreshThemeButtons();
applyThemeUI();
updateTexts();
isLoggedIn().then(loginUpdate);

if(dataSettings().hostjaMode){
    initHostja();
    initHostjaMovement();
}