import {deadIcon} from "../../icons/icons.js"
import {dataSettings, dataWords, /*dataIndices,*/ setSettings} from '../storages.js';

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
    
    //let usedIndices = dataIndices.indices || [];
    let runnyWords1 = [...(dataWords.words1 || [])];
    let runnyWords2 = [...(dataWords.words2 || [])];
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
        resetRunnyWords();
        update();
    });

    randomCheckbox.addEventListener('change', (e)=>{
        isRandom = e.target.checked;
        setSettings(isRandom, index);
    });

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
            frontSpan.textContent  = currentFront;
        }      
        backSide.textContent  = isRandom ? runnyWords1[index] : words1[index] ?? '';
        counter.textContent  = `${index + 1} / ${words1.length}`;
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
    }

    // const randomDrop = () => {
    //     if(words1.length <= usedIndices.length)
    //         clearIndices();

    //     let val;
    //     do{
    //         val = Math.floor(Math.random() * words1.length);
    //     }while(usedIndices.includes(val))

    //     usedIndices.push(val);
    //     localStorage.setItem('indices', JSON.stringify({'indices' : usedIndices}));
    //     return val;
    // }

    // const clearIndices = () => {
    //     usedIndices = [];
    //     localStorage.setItem('indices', JSON.stringify({'indices' : usedIndices}));
    // }

    const runnyRandom = () => {
        if(runnyWords1.length <= 0) {
            resetRunnyWords();
        }

        runnyWords1.splice(index, 1);
        runnyWords2.splice(index, 1);

        if(runnyWords1.length <= 0) {
            resetRunnyWords();
        }

        return Math.floor(Math.random() * runnyWords1.length);
    }

    const arithmetic = (n) => {
        index = !isRandom ? (n + words1.length) % words1.length : runnyRandom();

        card.classList.remove('is-flipped');
        setSettings(isRandom, index);
        update();
    }

    leftBtn.addEventListener('click', () => arithmetic(index - 1 + words1.length));

    rightBtn.addEventListener('click', () => arithmetic(index + 1));

    // card.addEventListener('click', function(e){
    //     if (e.target.closest('#checkInput') || e.target.closest('.checkWord')) return;
    //     card.classList.toggle('is-flipped');
    // });

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
        startX = e.clientX;
        isDragging = true;
        isMoving = false;
        card.style.transition = 'none';
        card.setPointerCapture(e.pointerId);
    });

    card.addEventListener('pointermove', (e) => {
        if(!isDragging) return;

        let deltaX = e.clientX - startX;

        if(Math.abs(deltaX) > 10)
            isMoving = true;
        
        if(Math.abs(deltaX) > limit)
            deltaX = (deltaX>0 ? 1 : -1) * (limit + (Math.abs(deltaX) - limit) * 0.2);

        card.style.transform = `translateX(${deltaX}px) rotateZ(${deltaX * 0.08}deg)`
    });

    card.addEventListener('pointerup', (e) => {
        if(!isDragging) return;

        const deltaX = e.clientX - startX;

        card.style.transform = '';

        if(isMoving && Math.abs(deltaX) >= gap){
            arithmetic(index + (deltaX>0 ? 1 : -1));
        }
        else{
            card.style.transition = 'transform 0.5s ease';
            if (e.target.closest('#checkInput') || e.target.closest('.checkWord')) return;
                card.classList.toggle('is-flipped');
        }
        isMoving = false;
        isDragging= false;
        
        card.releasePointerCapture(e.pointerId);
    });
};
