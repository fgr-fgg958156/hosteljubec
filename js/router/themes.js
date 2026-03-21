import { sunIcon, moonIcon, houseIcon } from "../icons/icons.js";
import { dataSettings, setSettings } from "../pages/storages.js";

const themeBtn = document.querySelector('.theme');
const homeBtn = document.querySelector('.home');
homeBtn.innerHTML = houseIcon;
document.body.setAttribute('data-theme-loaded', 'true');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDarkNow = document.body.classList.contains('dark-theme');
    const settings = dataSettings();
    setSettings(settings.isRandom, settings.index, isDarkNow);
    themeUpdate();
});

function themeUpdate() {
    const settings = dataSettings();
    if(settings.isDark){
        themeBtn.innerHTML = sunIcon;
        if(!document.body.classList.contains('dark-theme')) document.body.classList.add('dark-theme');
    }
    else{
        themeBtn.innerHTML = moonIcon;
    }
}

themeUpdate();