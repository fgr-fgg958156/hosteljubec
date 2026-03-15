import {homePage} from "../pages/homePage/home.js"
import {createPage} from "../pages/createPage/create.js"
import {initCreatePage} from "../pages/createPage/createFunctions.js"
import { initHomePage } from "../pages/homePage/homeFunctions.js";
import { errorPage } from "../pages/errorPage/error.js";

const root = document.getElementById('root');

const routes = {
    "/" : homePage,
    "/create" : createPage
};

const render = () => {
    const path = window.location.hash.slice(1) || "/";
    const page = routes[path];
    root.innerHTML = page ? page : errorPage;

    if(path === "/create")
        initCreatePage();
    else
        initHomePage();
}

const navigate = (path) => {
    window.location.hash = path;
}

document.body.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-link');
    if(link){
        e.preventDefault();
        const path = link.getAttribute('href').slice(1);
        navigate(path);
    }
});

window.addEventListener('hashchange', () => {
    render();
});

render();