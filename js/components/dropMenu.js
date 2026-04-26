export function initDropMenu() {
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu-container');

    if (!menuButton || !navMenu) return;

    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
}