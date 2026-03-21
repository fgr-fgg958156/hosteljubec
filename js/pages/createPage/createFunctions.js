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
        words3: []
    };
    
    const words = dataWords();

    importBtn.addEventListener('click', () => {
        for(let i = 0; i < words.words1.length; i++){
            cardStructure.insertAdjacentHTML('beforeend', pasteCard(i, words.words1[i], words.words2[i], (words.words3 || [])[i] || ''));
            listOfCards.words1.push(words.words1[i]);
            listOfCards.words2.push(words.words2[i]);
            listOfCards.words3.push((words.words3 || [])[i] || '');
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
        cardStructure.insertAdjacentHTML('beforeend', pasteCard(listOfCards.words1.length, '', '', ''));
    });

    cardStructure.addEventListener('change', (e) => {
        if(!e.target.classList.contains('image') && !e.target.classList.contains('preimage') && !e.target.classList.contains('addition')) return;

        const cardId = e.target.closest('.prop-card').id;

        const field = e.target.classList.contains('image') ? 'words1' : e.target.classList.contains('preimage') ? 'words2' : 'words3';

        listOfCards[field][cardId] = e.target.value;
        console.table(listOfCards);
    });
};