import { dataWords } from '../storages.js';
import {pasteCard} from './card.js';

export const initCreatePage = () => {
    const addBtn = document.querySelector('.add');
    const cardStructure = document.querySelector('.card-structure');
    const downloadBtn = document.querySelector('.download');
    const importBtn = document.querySelector('.import');
    const listOfCards = {
        words1: [],
        words2: [],
    };

    importBtn.addEventListener('click', () => {
        for(let i = 0; i < dataWords.words1.length; i++){
            cardStructure.insertAdjacentHTML('beforeend', pasteCard(i, dataWords.words1[i], dataWords.words2[i]));
            listOfCards.words1.push(dataWords.words1[i]);
            listOfCards.words2.push(dataWords.words2[i]);
        }
    });

    downloadBtn.addEventListener('click', () => {
        const jsonStr = JSON.stringify(listOfCards, null, 2);

        const blob = new Blob([jsonStr], {type: "application/json"});

        const url = URL.createObjectURL(blob);
        Object.assign(document.createElement('a'), {href: url, download: `${listOfCards.words1[0]}-${listOfCards.words1.length}`}).click();
        URL.revokeObjectURL(url);
    });

    addBtn.addEventListener('click', () => {
        cardStructure.insertAdjacentHTML('beforeend', pasteCard(listOfCards.words1.length, '', ''));
    });

    cardStructure.addEventListener('change', (e) => {
        if(!e.target.classList.contains('image') && !e.target.classList.contains('preimage')) return;

        const cardId = e.target.closest('.prop-card').id;

        const field = e.target.classList.contains('image') ? 'words1' : 'words2';

        listOfCards[field][cardId] = e.target.value;
        console.table(listOfCards);
    });
};