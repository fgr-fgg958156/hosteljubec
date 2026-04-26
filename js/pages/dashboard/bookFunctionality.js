import { navigate } from "../../router/router.js";
import { API, getProject, getUsers } from "../../services/services.js";
import { dataLogin, dataSettings, dataWords, setSettings, setWords } from "../../utils/storage.js";
import { renderDashboard, updateUserProjects } from "./dashboardFunctionality.js";

export let isDraging = false;

export function initBookFunctionality(container, updateMethod) {
    const handleClick = async (e) => {
        if (e.target.closest('.display-status')) {
            const book = e.target.closest('.book');
            const nickname = book.querySelector('.book-author')?.textContent;
            const projectName = book.querySelector('.book-name')?.textContent;

            const userData = dataLogin();
            if (!userData?.login) return;
            if (nickname !== `@${userData.nickname}`) return;

            const res = await fetch(API);
            const users = await res.json();

            const user = users.find(u => `@${u.nickname}` === nickname);
            if (!user) return;

            const updatedProjects = user.projects.map(p =>
                p.fileName === projectName
                    ? { ...p, isPublic: !p.isPublic }
                    : p
            );

            await fetch(`${API}/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user, projects: updatedProjects })
            });

            updateUserProjects(user.id, updatedProjects);
            updateMethod();
        }
    };
    
    let activeBook = null;
    let backgroundLayer = null;
    let startX = 0;
    let startY = 0;
    const maxX = 120;
    const threshold = 100;
    const dragLimit = 1;
    let moved = false;
    let moveX = 0;

    const pointerDown = (e) => {
        const book = e.target.closest('.book');
        if (!book) return;

        activeBook = book;
        moved = false;

        backgroundLayer = book.closest('.book-container').querySelector('.book-background');
        startX = e.clientX;
        startY = e.clientY;
        window.addEventListener('pointermove', pointerMove);
        window.addEventListener('pointerup', pointerUp);
        window.addEventListener('pointercancel', pointerUp);
    };

    const pointerMove = (e) => {
        if (!activeBook) return;

        moveX = e.clientX - startX;
        if (moveX > maxX) moveX = maxX;
        if (moveX < -maxX) moveX = -maxX;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (Math.abs(dx) > dragLimit || Math.abs(dy) > dragLimit) {
            moved = true;
        }

        const deleteZone = backgroundLayer.querySelector('.delete-background');
        const editZone = backgroundLayer.querySelector('.edit-background');

        isDraging = true;

        const opacity = Math.min(Math.abs(moveX / threshold), 1);

        editZone.style.backgroundColor = `rgba(168, 177, 255, ${opacity})`;
        deleteZone.style.backgroundColor = `rgba(240, 64, 80, ${opacity})`;

        activeBook.style.transform = `translateX(${moveX}px)`;
    };

    function cleanup(){
        isDraging = false;

        if (backgroundLayer) {
            const deleteZone = backgroundLayer.querySelector('.delete-background');
            const editZone = backgroundLayer.querySelector('.edit-background');

            if (deleteZone) deleteZone.style.backgroundColor = 'transparent';
            if (editZone) editZone.style.backgroundColor = 'transparent';
        }

        if (activeBook) {
            activeBook.style.transform = 'translateX(0px)';
        }

        activeBook = null;
        backgroundLayer = null;

        window.removeEventListener('pointermove', pointerMove);
        window.removeEventListener('pointerup', pointerUp);
        window.removeEventListener('pointercancel', pointerUp);
    }

    const pointerUp = (e) => {
        if (!activeBook) return;
        if (e.target.closest('button, input, label')) {
            cleanup();
            return;
        }

        const deleteZone = backgroundLayer.querySelector('.delete-background');
        const editZone = backgroundLayer.querySelector('.edit-background');

        if (moveX >= threshold) {
            openBook(activeBook);
        }
        else if (moveX <= -threshold) {
            deleteBook(activeBook);
        }
        if (!moved) {
            clickOnBook(activeBook);
        }

        cleanup();
    };

    async function clickOnBook(book) {
        try {
            const infoArray = book.id.split("ѳлѧсїс");

            const project = await getProject(infoArray[1], infoArray[0]);

            navigate('/');
            setWords(project.fileName, project.cards, project.tags);

            const settingsData = dataSettings();
            setSettings(settingsData.isRandom, 0, settingsData.isDark, settingsData.showInput);

        } catch (error) {
            console.error('помилка завантаження проєкту:', error);
        }
    }

    async function openBook(book){
        try{
            const [author, projectName] = book.id.split("ѳлѧсїс");
            const project = await getProject(projectName, author);

            const data = {
                fileName : project.fileName,
                words1: project.cards.image,
                words2: project.cards.preimage,
                words3: project.cards.addition,
                tags: project.tags,
            }

            sessionStorage.setItem(
                'creatorData',
                JSON.stringify(data)
            );
            navigate('/creator');

        } catch (error) {
            console.error("помилка завантаження:", error);
        }
    }

    async function deleteBook(book) {
        try {
            const [author, projectName] = book.id.split("ѳлѧсїс");
            const userData = dataLogin();
            if (!userData?.login) return;

            if (author !== userData.nickname) return;

            const res = await fetch(API);
            const users = await res.json();

            const user = users.find(
                u => u.nickname.toLowerCase() === author.toLowerCase()
            );

            if (!user) return;

            const updatedProjects = user.projects.filter(
                p => p.fileName !== projectName
            );

            await fetch(`${API}/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...user,
                    projects: updatedProjects
                })
            });

            updateUserProjects(user.id, updatedProjects);
            updateMethod();
        } catch (error) {
            console.error("помилка видалення:", error);
        }
    }

    container.addEventListener('click', handleClick);
    container.addEventListener('pointerdown', pointerDown);

    return () => {
        container.removeEventListener('click', handleClick);
        container.removeEventListener('pointerdown', pointerDown);
    };
}