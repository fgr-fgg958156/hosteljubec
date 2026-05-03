import { dashboardPage } from "../pages/dashboard/dashboardPage.js";
import { initDashboardPage } from "../pages/dashboard/dashboardFunctionality.js";
import { errorPage } from "../pages/error/errorPage.js";
import { homaPage } from "../pages/home/homePage.js";
import { initHomePage } from "../pages/home/homeFunctionality.js";
import { creatorPage } from "../pages/сreator/creatorPage.js";
import { initCreatorPage } from "../pages/сreator/creatorFunctionality.js";
import { accountPage } from "../pages/account/accountPage.js";
import { initAccountPage } from "../pages/account/accountFunctionality.js";
import { loginPage } from "../pages/login/loginPage.js";
import { initLoginPage } from "../pages/login/loginFunctionality.js";
import "https://cdn.jsdelivr.net/npm/@hiseb/confetti@2.1.0/dist/confetti.min.js";
import { updateTexts } from "../language/languageController.js";
import { supabase } from "../services/services.js";
import { applyThemeUI, refreshThemeButtons } from "../utils/loader.js";

const root = document.getElementById('root');
let currentDestroy = null;

const routes = {
    "/": {
        page: homaPage,
        init: initHomePage
    },
    "/creator": {
        page: creatorPage,
        init: initCreatorPage
    },
    "/dashboard": {
        page: dashboardPage,
        init: initDashboardPage
    },
    "/account": {
        page: accountPage,
        init: initAccountPage
    },
    "/login": {
        page: loginPage,
        init: initLoginPage
    }
};

const render = async () => {
    const path = window.location.hash.slice(1) || "/";
    const route = routes[path];

    if (typeof currentDestroy === "function") {
        currentDestroy();
        currentDestroy = null;
    }

    if (!route) {
        root.innerHTML = errorPage;
        updateTexts();
        return;
    }



    root.innerHTML = route.page;
    if(route.page === accountPage){
        refreshThemeButtons();
        applyThemeUI();
    }
    updateTexts();
    if (route.init) {
        currentDestroy = route.init();
    }
};

export const navigate = (path) => {
    window.location.hash = path;
};

document.body.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-link');

    if (link) {
        e.preventDefault();
        const path = link.getAttribute('href').slice(1);
        navigate(path);
    }
});

window.addEventListener('hashchange', render);

render();