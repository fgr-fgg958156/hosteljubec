import { airIcon, folderIcon, cardIcon, openFolderIcon, editIcon, whiteDeleteIcon} from "../../../assets/icons.js";
import { updateTexts } from "../../language/languageController.js";
import { getUsers, getCurrentUser, supabase } from "../../services/services.js";
import { dataSettings } from "../../utils/storage.js";
import { initCard } from "./book.js";
import { initBookFunctionality, isDraging } from "./bookFunctionality.js";
import { initFolderBookFunctionality } from "./folderBookFunctionality.js";

let cachedUsers = null;

export function clearUsersCache() {
    cachedUsers = null;
}

async function loadUsers(force = false) {
    if (cachedUsers && !force) return cachedUsers;

    cachedUsers = await getUsers();
    return cachedUsers;
}

function getOpenFolders() {
    return [...document.querySelectorAll('details[open]')]
        .map(d => d.querySelector('summary')?.textContent?.trim());
}

function restoreOpenFolders(openNames) {
    document.querySelectorAll('details').forEach(d => {
        const name = d.querySelector('summary')?.textContent?.trim();
        if (openNames.includes(name)) {
            d.open = true;
        }
    });
}

function renderTree(tree, level = 1.5, author) {
    let html = '<ul>';

    for (const key in tree) {
        if (key === 'children') {
            tree[key].forEach(project => {
                html += `
                <li class="book-container">
                    <summary id="${author}ѳлѧсїс${project.fileName}" style="--level:${level}" class="${project.isPublic ? 'isPublic' : ''} file-book book-style-folder">
                        ${cardIcon}<span class="text-cut">${project.fileName}</span>
                    </summary>
                </li>`;
            });

            continue;
        }

        html += `
            <li>
                <details>
                    <summary style="--level:${level}">
                        <span class="folder-icons">
                            <span class="folder-closed">${folderIcon}</span>
                            <span class="folder-open">${openFolderIcon}</span>
                        </span>
                        <span class="text-cut">${key}</span>
                    </summary>
                    ${renderTree(tree[key], level+1, author)}
                </details>
            </li>
        `;
    }

    html += '</ul>';

    return html;
}

export function renderDashboard(users, container, tags = '', currentUser = null, foldersMode = false) {
    let html = '';

    const tagsArray = tags.trim().toLowerCase().split(' ').filter(Boolean);
    const filter = document.querySelector('input[name="folder"]:checked')?.value || 'public';
    const tree = {};

    if(foldersMode){
        html += `<ul class="tree container box-sizing-border-box">`;
    }

    users.forEach(u => {
        if (filter === 'private') {
            if (!currentUser) return;
            if (u.id !== currentUser.id) return;
        }

        (u.projects || []).forEach(p => {
            const isPublic = p.isPublic;

            if ((filter === 'public' && !isPublic) || (filter === 'private' && isPublic)) return;

            const projectTags = (p.tags || []).map(t => t.toLowerCase());

            const hasTagMatch = tagsArray.length === 0 || tagsArray.every(tag => projectTags.includes(tag)) || tagsArray.includes(u.nickname);

            if (!hasTagMatch) return;

            if(!foldersMode){
                html += initCard(p.fileName, u.nickname, isPublic, `${!p.tags[0] ? `(0)` : p.tags[0]} ${p.tags.length>1 ? `(+${p.tags.length-1})` : ``}`);
                return;
            }
                
            let current = tree;
            projectTags.forEach(tag => {
                if (!current[tag]) {
                    current[tag] = {};
                }

                current = current[tag];
            });

            if (!current.children) {
                current.children = [];
            }

            current.children.push(p);
        });
        if (foldersMode) {
            html += `
                <li>
                    <details>
                        <summary style="--level:${0.5}">
                            <span class="folder-icons">
                                <span class="folder-closed">${folderIcon}</span>
                                <span class="folder-open">${openFolderIcon}</span>
                            </span>
                            <span class="text-cut">${u.nickname}</span>
                        </summary>
                        ${renderTree(tree ,1.5, u.nickname)}
                    </details>
                </li>
            `;
        }
    });

    if(foldersMode){
        html += `</ul>`;
    }

    if (!html || html === '<ul class="tree container box-sizing-border-box"></ul>') {
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
    const foldersMode = dataSettings().foldersMode;
    updatePrivate();

    //let intervalId;

    cachedUsers = await loadUsers(true);
    let currentUser = await getCurrentUser();

    let lastHash = null;

    const update = () => {
        const openFolders = getOpenFolders();

        renderDashboard(cachedUsers, container, tags.value, currentUser, foldersMode);

        restoreOpenFolders(openFolders);
    };

    radios.forEach(radio => {
        radio.addEventListener('change', update);
    });

    tags.addEventListener('input', update);

    update();

    // intervalId = setInterval(async () => {
    //     if (document.hidden || isDraging) return;

    //     const users = await loadUsers(true);
    //     const newHash = JSON.stringify(users);

    //     if (newHash === lastHash) return;

    //     lastHash = newHash;
    //     cachedUsers = users;

    //     update();
    // }, 15000);

    initBookFunctionality(container, update);
    initFolderBookFunctionality(container, update);

    return () => {
        radios.forEach(radio => {
            radio.removeEventListener('change', update);
        });

        tags.removeEventListener('input', update);

        //clearInterval(intervalId);
    };
}