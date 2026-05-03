import { airIcon } from "../../../assets/icons.js";
import { updateTexts } from "../../language/languageController.js";
import { getUsers, getCurrentUser, supabase } from "../../services/services.js";
import { initCard } from "./book.js";
import { initBookFunctionality, isDraging } from "./bookFunctionality.js";

let cachedUsers = null;

export function clearUsersCache() {
    cachedUsers = null;
}

async function loadUsers(force = false) {
    if (cachedUsers && !force) return cachedUsers;

    cachedUsers = await getUsers();
    return cachedUsers;
}

export function renderDashboard(users, filter, container, tags = '', currentUser = null) {
    let html = '';

    const tagsArray = tags.trim().toLowerCase().split(' ').filter(Boolean);

    users.forEach(u => {
        if (filter === 'private') {
            if (!currentUser) return;
            if (u.id !== currentUser.id) return;
        }

        (u.projects || []).forEach(p => {
            const isPublic = p.isPublic;

            if ((filter === 'public' && !isPublic) || (filter === 'private' && isPublic)) return;

            const projectTags = (p.tags || []).map(t => t.toLowerCase());

            const hasTagMatch =
                tagsArray.length === 0 ||
                tagsArray.every(tag => projectTags.includes(tag));

            if (!hasTagMatch) return;

            html += initCard(p.fileName, u.nickname, isPublic, `${!p.tags[0] ? `(0)` : p.tags[0]} ${p.tags.length>1 ? `(+${p.tags.length-1})` : ``}`);
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

async function updatePrivate() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    document?.querySelector('.radio-block').classList.remove('radio-block');
}

export async function initDashboardPage() {
    const container = document.querySelector('.books-container');
    const radios = document.querySelectorAll('input[name="folder"]');
    const tags = document.querySelector('.tags-input');
    updatePrivate();

    let intervalId;
    let currentFilter = 'public';

    cachedUsers = await loadUsers(true);
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

        const users = await loadUsers(true);
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