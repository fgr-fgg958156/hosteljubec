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

const themeBtns = document.querySelectorAll('.theme-button');
const languageBtns = document.querySelectorAll('.language-button');

function applyThemeUI() {
    const settings = dataSettings();

    themeBtns.forEach(btn => {
        btn.innerHTML = settings.isDark ? btn.classList.contains('circle-button') ? sunIcon : `${sunIcon}<span data-lang="light"></span>` : btn.classList.contains('circle-button') ? moonIcon : `${moonIcon}<span data-lang="dark"></span>`;
    });

    document.body.classList.toggle('dark-theme', settings.isDark);
}

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const settings = dataSettings();

        const newDark = !document.body.classList.contains('dark-theme');

        document.body.classList.toggle('dark-theme', newDark);

        setSettings(settings.isRandom, settings.index, newDark,settings.showInput);
        applyThemeUI();
        updateTexts();
    });
});

languageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        nextLang();
    });
});

applyThemeUI();
const logged = await isLoggedIn();
loginUpdate(logged);