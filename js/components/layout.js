import { cardsStackIcon, homeIcon, languageIcon, loginIcon, menuIcon, moonIcon, personIcon, whitePlusIcon } from "../../assets/icons.js";
import { updateTexts } from "../language/languageController.js";
import { supabase } from "../services/services.js";

export function initNavBar() {
    if (document.querySelector('nav')) return;

    const nav = document.createElement('nav');
    nav.classList.add('main-max-width', 'display-flex', 'align-items-center', 'justify-content-space-between');
    const column1 = createNavColumn();
    
    const creatorButton = createBlueTextNavButton(whitePlusIcon, '#/creator', 'create');
    column1.appendChild(creatorButton);

    const column2 = createNavColumn();

    const menuButton = createNavButton(menuIcon, ['menu-button', 'circle-button']);
    column2.appendChild(menuButton);

    const buttonStack = document.createElement('div');
    buttonStack.classList.add('button-menu-container', 'display-flex', 'align-items-center', 'flex-direction-row', 'justify-content-space-around', 'gap-12px');

    const homeButton = createNavButton(homeIcon, ['nav-link', 'circle-button'], '/');
    buttonStack.appendChild(homeButton);

    const dashboardButton = createNavButton(cardsStackIcon, ['nav-link', 'circle-button'], '#/dashboard');
    buttonStack.appendChild(dashboardButton);

    const accountButton = createNavButton('', ['circle-button', 'account-toggler'], '');
    buttonStack.appendChild(accountButton);

    const themeButton = createNavButton(moonIcon, ['circle-button', 'theme-button']);
    buttonStack.appendChild(themeButton);

    const languageButton = createNavButton(languageIcon, ['circle-button', 'language-button']);
    buttonStack.appendChild(languageButton);

    column2.appendChild(buttonStack);

    nav.appendChild(column1);
    nav.appendChild(column2);

    const navMenu = summonNavListContainer();

    document.querySelector('.container').prepend(nav);
    document.querySelector('.container').prepend(navMenu);
}

function createNavColumn(){
    const column = document.createElement('div');
    column.classList.add('display-flex', 'align-items-center', 'flex-direction-row', 'justify-content-space-around', 'margin-horizontal-12px', 'gap-12px');
    return column;
}

function createNavButton(icon, classList, href){
    const button = document.createElement('button');
    button.innerHTML = icon;
    button.classList.add(...classList);
    if(href)
        button.setAttribute("href", href);
    return button;
}

function createBlueTextNavButton(icon, href, key){
    const button = document.createElement('label');
    button.innerHTML = `${icon}<span data-lang="${key}"></span>`;
    button.classList.add('blue-text-button', 'padding-horizontal-12px', 'gap-12px', 'white-text-colour', 'display-flex', 'justify-content-space-around', 'align-items-center');
    if(href){
        button.setAttribute("href", href);
        button.classList.add('nav-link');
    }

    return button;
}

function summonNavListContainer(){
    const navContainer = document.createElement('div');
    navContainer.classList.add('nav-menu-container', 'main-max-width', 'display-flex', 'align-items-center', 'flex-direction-column', 'justify-content-space-around');
    
    const homeButton = createNavButtonContainer(homeIcon, 'home', '/');
    navContainer.appendChild(homeButton);

    const dashboardButton = createNavButtonContainer(cardsStackIcon, 'dashboard', '#/dashboard');
    navContainer.appendChild(dashboardButton);

    const accountButton = createNavButtonContainer('', '', '');
    accountButton.classList.add('account-toggler');
    navContainer.appendChild(accountButton);

    const themeButton = createNavButtonContainer(moonIcon, 'light');
    themeButton.classList.add('theme-button');
    navContainer.appendChild(themeButton);

    const languageButton = createNavButtonContainer(languageIcon, 'lang');
    languageButton.classList.add('language-button');
    navContainer.appendChild(languageButton);
    return navContainer;
}

function createNavButtonContainer(icon, key, href){
    const button = document.createElement('button');
    button.innerHTML = `${icon}<span data-lang="${key}"></span>`;
    button.classList.add('nav-button', 'display-flex', 'align-items-center', 'flex-direction-row', 'gap-12px', 'light-text-colour', 'main-text-settings', 'padding-horizontal-12px');
    if(href){
        button.setAttribute("href", href);
        button.classList.add('nav-link');
    }
    return button;
}

export async function loginUpdate(isLogged) {
    const accountEl = document.querySelectorAll('.account-toggler');

    if (!accountEl.length) return;

    accountEl.forEach(e => {
        if(isLogged){
            e.setAttribute("href", '#/account');
            e.innerHTML = e.querySelector('span') ? `${personIcon}<span data-lang="account"></span>` : personIcon;
            e.classList.add('account', 'nav-link');
        }
        else{
            e.setAttribute("href", '#/login');
            e.innerHTML = e.querySelector('span') ? `${loginIcon}<span data-lang="login"></span>` : loginIcon;
            e.classList.add('login', 'nav-link');
        }
    });

    updateTexts();
}