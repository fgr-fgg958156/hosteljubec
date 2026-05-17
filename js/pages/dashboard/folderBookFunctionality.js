import { lockIcon, publicIcon, publishIcon } from "../../../assets/icons.js";
import { t, updateTexts } from "../../language/languageController.js";
import { navigate } from "../../router/router.js";
import { getProject, getUsers, supabase, updateUser } from "../../services/services.js";
import { dataSettings, setSettings, setWords } from "../../utils/storage.js";
import { clickOnBook, deleteBook, handleClick, openBook } from "./bookFunctionality.js";
import { updateUserProjects } from "./dashboardFunctionality.js";

export function initFolderBookFunctionality(container, updateMethod) {
    const menu = document.querySelector('.folders-menu');
    let pressTimer = null;
    let selectedBook = null;

    let startX = 0;
    let startY = 0;

    const LONG_PRESS_TIME = 500;
    const MOVE_LIMIT = 10;

    const openMenu = (x, y, book) => {
        selectedBook = book;
        menu.style.visibility = 'visible';
        const rect = menu.getBoundingClientRect();
        const padding = 8;
        let left = x;
        let top = y;

        if (left + rect.width > window.innerWidth) {
            left = window.innerWidth - rect.width - padding;
        }

        if (top + rect.height > window.innerHeight) {
            top = window.innerHeight - rect.height - padding;
        }

        if (left < padding) left = padding;
        if (top < padding) top = padding;

        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;
        const fileStatus = menu.querySelector('.file-status');
        fileStatus.innerHTML = book.classList.contains('isPublic') ? `${lockIcon}<span data-lang="hide"></span>` : `${publicIcon}<span data-lang="publish"></span>`;
        updateTexts(fileStatus);
    };

    const rightClick = (e) => {
        e.preventDefault();
        const book = e.target.closest('.file-book');
        if (!book) return;
        openMenu(e.clientX, e.clientY, book);
    };

    const hideMenu = () => {
        menu.style.visibility = 'hidden';
    }

    const closeMenu = () => {
        hideMenu();
        selectedBook = null;
    };

    const thisHandleClick = async (e) => {
        closeMenu();
        const book = e.target.closest('.file-book');
        if (!book) return;
        if (menu.style.visibility === 'visible') return;
        await clickOnBook(book);
    };

    const pointerDown = (e) => {
        if (window.innerWidth > 768) return;
        const book = e.target.closest('.file-book');
        if (!book) return;
        
        e.preventDefault();

        startX = e.clientX;
        startY = e.clientY;

        pressTimer = setTimeout(() => {openMenu(e.clientX, e.clientY, book);}, LONG_PRESS_TIME);
    };

    const pointerMove = (e) => {
        if (!pressTimer) return;

        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);

        if (dx > MOVE_LIMIT || dy > MOVE_LIMIT) {
            clearTimeout(pressTimer);
            pressTimer = null;
        }

    };

    const pointerUp = () => {
        if (menu.style.visibility === 'visible') return;
        clearTimeout(pressTimer);
        pressTimer = null;
    };

    const outsideClick = (e) => {
        if (window.getSelection().toString()) return;

        if (!menu.contains(e.target)) {
            closeMenu();
        }
    };

    async function menuController(e){
        const fileOpen = e.target.closest('.file-open');
        const fileEdit = e.target.closest('.file-edit');
        const fileStatus = e.target.closest('.file-status');
        const fileDelete = e.target.closest('.file-delete');

        if (!selectedBook) return;
        hideMenu();

        if (fileOpen) {
            await clickOnBook(selectedBook);
        }
        else if (fileEdit) {
            await openBook(selectedBook);
        }
        else if (fileStatus) {
            await handleClick(selectedBook, updateMethod);
        }
        else if (fileDelete) {
            await deleteBook(selectedBook, updateMethod);
        }
        closeMenu();
    }

    menu.addEventListener('click', menuController);
    container.addEventListener('click', thisHandleClick);
    container.addEventListener('pointerdown', pointerDown);
    container.addEventListener('pointermove', pointerMove);
    container.addEventListener('pointerup', pointerUp);
    container.addEventListener('pointercancel', pointerUp);
    document.addEventListener('click', outsideClick);
    document.addEventListener('contextmenu', rightClick);

    return () => {
        container.removeEventListener('click', thisHandleClick);
        container.removeEventListener('pointerdown', pointerDown);
        container.removeEventListener('pointermove', pointerMove);
        container.removeEventListener('pointerup', pointerUp);
        container.removeEventListener('pointercancel', pointerUp);
        document.removeEventListener('click', outsideClick);
    };
}