import {deadIcon} from "../../icons/icons.js"
import {dataSettings, dataWords, setSettings} from '../storages.js';

export const initHomePage = () => {
    const fileArray = document.querySelector('#fileInput');
    const frontSide = document.querySelector('.front');
    const additionalSpan = document.querySelector('.additional-span');
    const frontSpan = document.querySelector('.front-span');
    const backSide = document.querySelector('.back');
    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');
    const counter = document.querySelector('.counter');
    const card = document.querySelector('.card');
    const checkInput = document.querySelector('#checkInput');
    const randomCheckbox = document.getElementById('isRandom');

    const settings = dataSettings();
    const words = dataWords();

    let index = settings.index || 0;
    let isRandom = settings.isRandom || false;
    const maxChar = 100;
    
    let words1 = words.words1 || [];
    let words2 = words.words2 || [];
    let words3 = words.words3 || [];
    
    let runnyWords1 = [...words1];
    let runnyWords2 = [...words2];
    let runnyWords3 = [...words3];

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
        words3 = data.words3 || [];
        index = 0;

        localStorage.setItem('dataWords', JSON.stringify({
            words1: data.words1,
            words2: data.words2,
            words3: data.words3
        }));

        const freshSettings = dataSettings();
        setSettings(freshSettings.isRandom, 0, freshSettings.isDark);
        resetRunnyWords();
        update();
    });

    randomCheckbox.addEventListener('change', (e)=>{
        isRandom = e.target.checked;
        const freshSettings = dataSettings();
        setSettings(isRandom, index, freshSettings.isDark);
        resetRunnyWords();
        update();
    });
    
    function cutTheString(str, lgh) {
        if(!str) return '';
        return(str.slice(0, lgh));
    }

    function update(){
        if(!words1.length) return;
        const currentFront = isRandom ? runnyWords2[index] : words2[index] ?? '';

        if(currentFront.startsWith('http://') || currentFront.startsWith('https://')){
            const img = document.createElement('img');
            img.src = currentFront;
            img.alt = 'Прообраз';
            img.loading = 'lazy';
            img.onerror = function() {
                this.replaceWith(deadIconWrapper());
            };
            img.draggable = false;
            frontSpan.innerHTML = '';
            frontSpan.appendChild(img);
        } else {
            frontSpan.textContent  = cutTheString(currentFront, maxChar);
        }  
        additionalSpan.textContent = isRandom ? cutTheString(runnyWords3[index], maxChar) : cutTheString(words3[index], maxChar) ?? '';    
        backSide.textContent  = isRandom ? cutTheString(runnyWords1[index], maxChar) : cutTheString(words1[index], maxChar) ?? '';
        counter.textContent  = isRandom ? `кількість : ${runnyWords1.length}` :`${index + 1} / ${words1.length}`;
    }

    function deadIconWrapper() {
        const wrapper = document.createElement('div');
        wrapper.className = 'upload-container';
        wrapper.innerHTML = `${deadIcon}<span>гепнуте покликання</span>`;
        return wrapper;
    }

    const resetRunnyWords = () => {
        runnyWords1 = [...(words1)];
        runnyWords2 = [...(words2)];
        runnyWords3 = [...(words3)];
    }

    const runnyRandom = () => {
        if(runnyWords1.length <= 0) {
            resetRunnyWords();
        }

        runnyWords1.splice(index, 1);
        runnyWords2.splice(index, 1);
        runnyWords3.splice(index, 1);

        if(runnyWords1.length <= 0) {
            resetRunnyWords();
        }

        return Math.floor(Math.random() * runnyWords1.length);
    }

    const arithmetic = (n) => {
        index = !isRandom ? (n + words1.length) % words1.length : runnyRandom();

        card.classList.remove('is-flipped');
        const freshSettings = dataSettings();
        setSettings(isRandom, index, freshSettings.isDark);
        update();
    }

    leftBtn.addEventListener('click', () => arithmetic(index - 1 + words1.length));
    rightBtn.addEventListener('click', () => arithmetic(index + 1));

    const normalize = (str) => str.trim().toLowerCase();

    const checkAnswer = (input) => {
        if(normalize(input.value) === normalize(isRandom ? runnyWords1[index] : words1[index])){
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

    let startX = 0;
    const gap = 60;
    const limit = 20;
    let isDragging = false;
    let isMoving = false;

    card.addEventListener('pointerdown', (e) => {
        if (e.target.closest('input, button')) return;
        startX = e.clientX;
        isDragging = true;
        isMoving = false;
        card.style.transition = 'none';
        card.setPointerCapture(e.pointerId);
    });

    card.addEventListener('pointermove', (e) => {
        if(!isDragging) return;

        let deltaX = e.clientX - startX;

        if(Math.abs(deltaX) > 0)
            isMoving = true;
        
        if(Math.abs(deltaX) > limit)
            deltaX = (deltaX>0 ? 1 : -1) * (limit + (Math.abs(deltaX) - limit) * 0.2);

        card.style.transform = `translateX(${deltaX}px) rotateZ(${deltaX * 0.08}deg)`
    });

    card.addEventListener('pointerup', (e) => {
        if(!isDragging || e.target.closest('input, button')) return;

        const deltaX = e.clientX - startX;

        card.style.transform = '';

        if(isMoving && Math.abs(deltaX) >= gap){
                arithmetic(index + (deltaX>0 ? -1 : 1));
        }
        else{
            card.style.transition = 'transform 0.5s ease';
            if (!e.target.closest('input, button')) {
                card.classList.toggle('is-flipped');
            }
        }
        isMoving = false;
        isDragging= false;
        
        card.releasePointerCapture(e.pointerId);
    });
    
    update();
};
