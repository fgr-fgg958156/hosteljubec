import {dataSettings, dataWords, setSettings} from '../storages.js';

export const initHomePage = () => {
    const fileArray = document.querySelector('#fileInput');
    const frontSide = document.querySelector('.front');
    const frontSpan = document.querySelector('.front-span');
    const backSide = document.querySelector('.back');
    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');
    const counter = document.querySelector('.counter');
    const card = document.querySelector('.card');
    const checkInput = document.querySelector('#checkInput');
    const randomCheckbox = document.getElementById('isRandom');

    let index = dataSettings.index || 0;
    let isRandom = dataSettings.isRandom || false;
    
    let words1 = dataWords.words1 || [];
    let words2 = dataWords.words2 || [];
    update();

    fileArray.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const text = await file.text();

        const data = JSON.parse(text);

        if(data.words1.length !== data.words2.length){
            alert("a != b");
            return;
        }

        words1 = data.words1;
        words2 = data.words2;
        index = 0;

        localStorage.setItem('dataWords', JSON.stringify({
            words1: data.words1,
            words2: data.words2
        }));

        setSettings(dataSettings.isRandom, 0);

        update();
    });

    randomCheckbox.addEventListener('change', (e)=>{
        isRandom = e.target.checked;
        setSettings(isRandom, index);
    });

    function update(){
        if(!words1.length) return;

        frontSpan.textContent  = words2[index];            
        backSide.textContent  = words1[index];
        counter.textContent  = `${index + 1} / ${words1.length}`;
    }

    const arithmetic = (n) => {
        index = !isRandom ? n % words1.length : Math.floor(Math.random() * words1.length);

        card.classList.remove('is-flipped');
        setSettings(isRandom, index);
        update();
    }

    leftBtn.addEventListener('click', () => arithmetic(index - 1 + words1.length));

    rightBtn.addEventListener('click', () => arithmetic(index + 1));

    card.addEventListener('click', function(e){
        if (e.target.closest('#checkInput') || e.target.closest('.checkWord')) return;
        card.classList.toggle('is-flipped');
    });

    const normalize = (str) => str.trim().toLowerCase();

    const checkAnswer = (input) => {
        if(normalize(input.value) === normalize(words1[index])){
            arithmetic(index + 1);
            
            input.value = '';
            input.focus();
        }
    };

    frontSide.addEventListener('click', function(e){
        if(!e.target.closest('.checkWord')) return;
        checkAnswer(checkInput);
    });

    frontSide.addEventListener('keydown', function(e){
        if(e.key !== 'Enter') return;
        if(e.target !== checkInput) return;
        checkAnswer(checkInput);
    });
};