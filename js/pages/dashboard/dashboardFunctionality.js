import { airIcon } from "../../../assets/icons.js";
import { updateTexts } from "../../language/languageController.js";
import { API, getCurrentUser } from "../../services/services.js";
import { initCard } from "./book.js";
import { initBookFunctionality, isDraging } from "./bookFunctionality.js";

let cachedUsers = null;

export function clearUsersCache() {
    cachedUsers = null;
}

async function getUsers(force = false) {
    if (cachedUsers && !force) return cachedUsers;

    const res = await fetch(API);
    if (!res.ok) throw new Error('network error');

    cachedUsers = await res.json();
    return cachedUsers;
}

export function renderDashboard(users, filter, container, tags = '', currentUser = null) {
    let html = '';

    const tagsArray = tags.trim().toLowerCase().split(' ').filter(Boolean);

    users.forEach(u => {

        if (filter === 'private' && currentUser && u.id !== currentUser.id) return;

        (u.projects || []).forEach(p => {

            const isPublic = p.isPublic;

            if ((filter === 'public' && !isPublic) || (filter === 'private' && isPublic)) return;

            const projectTags = (p.tags || []).map(t => t.toLowerCase());
            const hasTagMatch =
                tagsArray.length === 0 || tagsArray.every(tag => projectTags.includes(tag));

            if (!hasTagMatch) return;

            html += initCard(p.fileName, u.nickname, isPublic);
        });
    });

    if (!html) {
        container.innerHTML = `
            <div class="display-flex flex-direction-row align-items-center margin-top-36px additional-text-colour">
                <span data-lang="dust"></span> ${airIcon}
            </div>
        `;
        updateTexts();
        return;
    }

    container.innerHTML = html;
}

export function updateUserProjects(userId, newProjects) {
    if (!cachedUsers) return;
    cachedUsers = cachedUsers.map(u =>
        u.id === userId ? { ...u, projects: newProjects } : u
    );
}

export async function initDashboardPage() {
    const container = document.querySelector('.books-container');
    const radios = document.querySelectorAll('input[name="folder"]');
    const tags = document.querySelector('.tags-input');
    let intervalId;

    let currentFilter = 'public';
    cachedUsers = await getUsers(true);
    let currentUser = await getCurrentUser();

    let lastHash = null;

    const update = () => {
        renderDashboard(cachedUsers, currentFilter, container, tags.value, currentUser);
    };

    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            update();
        });
    });

    tags.addEventListener('input', update);

    update();
    intervalId = setInterval(async () => {
        if (document.hidden || isDraging) return;

        const users = await getUsers(true);
        const newHash = JSON.stringify(users);

        if (newHash === lastHash) return;

        lastHash = newHash;
        cachedUsers = users;
        update();
    }, 15000);

    initBookFunctionality(container, update);

    return () => {
        radios.forEach(radio => {
            radio.removeEventListener('change', update);
        });
        tags.removeEventListener('input', update);

        clearInterval(intervalId);
    };
}