import { t, updateTexts } from "../../language/languageController.js";
import { getCurrentUser, supabase, updateUser } from "../../services/services.js";
import { initCard } from "./card.js";

export function initCreatorPage() {
    const container = document.querySelector('.prop-card-container');
    const addButton = document.querySelector('.add-new-card');
    const swapAllButton = document.querySelector('.swap-all-rows');
    const clearButton = document.querySelector('.delete-all-cards');
    const importButton = document.querySelector('#fileImport');

    const bookName = document.querySelector('.book-name');
    const tags = document.querySelector('.filter-tags');

    const letters = document.querySelector('.letters');
    const divider = document.querySelector('.divider');
    const spliter = document.querySelector('.spliter');
    const pushLettersButton = document.querySelector('.push-letters');

    const desktopSaveButton = document.querySelector('.desktop-save');
    const dataSaveButton = document.querySelector('.data-save');

    const listOfCards = {
        fileName: t('unnamed'),
        tags: [],
        words1: [],
        words2: [],
        words3: []
    };

    loadSavedData();

    const paragraph = (val) => {
        const map = {
            '!p2': '\n\n',
            '!абзац2': '\n\n',
            '!уступ2': '\n\n',

            '!p': '\n',
            '!абзац': '\n',
            '!уступ': '\n',

            '!tab': '\t',
            '!таб': '\t',
            '!вкладка': '\t'
        };

        let result = val.toLowerCase().trim();

        Object.keys(map)
            .sort((a, b) => b.length - a.length)
            .forEach(key => {
                result = result.replaceAll(key, map[key]);
            });

        return result;
    };

    function cardIdUpdate() {
        [...container.children].forEach((card, index) => {
            card.dataset.index = index;

            const num = card.querySelector('.number');
            if (num) num.textContent = index + 1;
        });
    }

    function pushNewCardData(image, preimage, addition) {
        const index = listOfCards.words1.length;
        listOfCards.words1.push(preimage);
        listOfCards.words2.push(image);
        listOfCards.words3.push(addition);

        container.insertAdjacentHTML(
            'beforeend',
            initCard(index, preimage, image, addition)
        );

        cardIdUpdate();
        updateTexts();
    }
    
    function loadSavedData(){
        const savedData = sessionStorage.getItem('creatorData');

        if (savedData) {
            const data = JSON.parse(savedData);

            clearContainer();

            const words1 = data.words1 || [];
            const words2 = data.words2 || [];
            const words3 = data.words3 || [];

            bookName.value = data.fileName || '';
            tags.value = (data.tags || []).join(' ');

            words1.forEach((w1, i) => {
                pushNewCardData(
                    w1,
                    words2[i] || '',
                    words3[i] || ''
                );
            });

            console.table(listOfCards);
            sessionStorage.removeItem('creatorData');
        }
    }

    function createNewCard() {
        pushNewCardData('', '', '');
    }

    async function importNewBook(e) {
        const file = e.target.files[0];
        if (!file) return;

        const text = await file.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            alert(t('invalidData'));
            return;
        }

        if (!data.words1 || !data.words2) {
            alert(t('wrongStructure'));
            return;
        }

        if (data.words1.length !== data.words2.length) {
            alert(t('differentLength'));
            return;
        }

        for (let i = 0; i < data.words1.length; i++) {
            pushNewCardData(
                data.words1[i],
                data.words2[i],
                (data.words3 || [])[i] || ''
            );
        }

        e.target.value = '';
        
    }

    function deleteCard(id, card) {
            listOfCards.words1.splice(id, 1);
            listOfCards.words2.splice(id, 1);
            listOfCards.words3.splice(id, 1);

            card.remove();
            cardIdUpdate();
        }

    function rerenderOneCard(id) {
        const oldCard = container.children[id];
        if (!oldCard) return;

        const wrapper = document.createElement('div');

        wrapper.innerHTML = initCard(
            id,
            listOfCards.words2[id] || '',
            listOfCards.words1[id] || '',
            listOfCards.words3[id] || ''
        );

        oldCard.replaceWith(wrapper.firstElementChild);

        cardIdUpdate();
        updateTexts();
    }

    function swapRows(id) {
        [listOfCards.words1[id], listOfCards.words2[id]] = [
            listOfCards.words2[id] ?? '',
            listOfCards.words1[id] ?? ''
        ];

        rerenderOneCard(id);
    }

    function containerFunctions(e) {
        const card = e.target.closest('.prop-card');
        if (!card) return;

        const cardId = +card.dataset.index;
        if (Number.isNaN(cardId)) return;

        if (e.target.closest('.delete-card')) {
            deleteCard(cardId, card);
            return;
        }

        if (e.target.closest('.swap-rows')) {
            swapRows(cardId, card);
            return;
        }
    }

    function inputChange(e) {
        if (
            !e.target.classList.contains('image-input') &&
            !e.target.classList.contains('preimage-input') &&
            !e.target.classList.contains('addition-input')
        ) return;

        const card = e.target.closest('.prop-card');
        if (!card) return;

        const cardId = +card.dataset.index;
        if (Number.isNaN(cardId)) return;

        const field = e.target.classList.contains('image-input')
            ? 'words2'
            : e.target.classList.contains('preimage-input')
            ? 'words1'
            : 'words3';

        listOfCards[field][cardId] = e.target.value;
    }

    function swapAllRows() {
        [listOfCards.words1, listOfCards.words2] = [
            listOfCards.words2,
            listOfCards.words1
        ];

        rerenderCards();
    }

    function rerenderCards() {
        container.innerHTML = '';

        for (let i = 0; i < listOfCards.words1.length; i++) {
            container.insertAdjacentHTML(
                'beforeend',
                initCard(
                    i,
                    listOfCards.words2[i] || '',
                    listOfCards.words1[i] || '',
                    listOfCards.words3[i] || ''
                )
            );
        }

        cardIdUpdate();
        updateTexts();
    }

    function clearContainer(){
        listOfCards.words1 = [];
        listOfCards.words2 = [];
        listOfCards.words3 = [];
        container.innerHTML = '';
    }

    function removeAllCards(){
        const confirmed = window.confirm(t('confirmMessage'));
        if (!confirmed) return;
        clearContainer();
    }

    function download(){
        listOfCards.fileName = bookName.value.trim() || t('unnamed');
        listOfCards.tags = tags.value.trim().split(/\s+/).filter(Boolean);
        const jsonStr = JSON.stringify(listOfCards, null, 2);

        const blob = new Blob([jsonStr], {type: "application/json"});
        const url = URL.createObjectURL(blob);

        let name = bookName.value.trim();

        if (!name) {
            name = `${listOfCards.fileName}-${Date.now()}`;
        }

        if (!name.endsWith('.json')) {
            name += '.json';
        }

        Object.assign(document.createElement('a'), {
            href: url,
            download: name
        }).click();

        URL.revokeObjectURL(url);
    }

    async function dataPush() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        listOfCards.fileName = bookName.value.trim() || t('unnamed');
        listOfCards.tags = tags.value.trim().split(/\s+/).filter(Boolean) || [];

        const currentUser = await getCurrentUser();
        if (!currentUser) {
            alert(t('userNotFound'));
            return;
        }

        const projects = currentUser.projects || [];

        const updatedProjects = [
            ...projects.filter(p => p.fileName !== listOfCards.fileName),
            {
                fileName: listOfCards.fileName,
                isPublic: false,
                tags: listOfCards.tags,
                cards: {
                    image: listOfCards.words2,
                    preimage: listOfCards.words1,
                    addition: listOfCards.words3
                }
            }
        ];

        await updateUser(currentUser, ['projects'], [updatedProjects]);
    }

    function pushNewLetters(){
        if(spliter.value === divider.value){
            alert(t('dividerError'));
            return;
        } 
        if(spliter.value === "" || divider.value === ""){
            alert(t('emptyFields'));
            return;
        }

        const splitValue = paragraph(spliter.value);
        const array = letters.value.split(splitValue);

        const divideValue = paragraph(divider.value);
        const arrayOfarrays = array.map(e => 
            e.split(divideValue).map(i => i.trim())
        );

        arrayOfarrays.forEach(([w1, w2, w3 = '']) => {
            pushNewCardData(w1, w2, w3);
        });

        letters.value = '';
    }


    container.addEventListener('input', inputChange);
    container.addEventListener('click', containerFunctions);
    addButton.addEventListener('click', createNewCard);
    importButton.addEventListener('change', importNewBook);
    swapAllButton.addEventListener('click', swapAllRows);
    clearButton.addEventListener('click', removeAllCards);
    desktopSaveButton.addEventListener('click', download);
    dataSaveButton.addEventListener('click', dataPush);
    pushLettersButton.addEventListener('click', pushNewLetters);

    return () => {
        pushLettersButton.removeEventListener('click', pushNewLetters);
        dataSaveButton.removeEventListener('click', dataPush);
        desktopSaveButton.removeEventListener('click', download);
        clearButton.removeEventListener('click', removeAllCards);
        swapAllButton.removeEventListener('click', swapAllRows);
        addButton.removeEventListener('click', createNewCard);
        importButton.removeEventListener('change', importNewBook);
        container.removeEventListener('click', containerFunctions);
        container.removeEventListener('input', inputChange);
    };
}