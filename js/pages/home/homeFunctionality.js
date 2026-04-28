import { airIcon } from "../../../assets/icons.js";
import { updateTexts } from "../../language/languageController.js";
import { getProject } from "../../services/services.js";
import { dataSettings, dataWords, setSettings } from "../../utils/storage.js";
import { initCard } from "./cardFunctionality.js";
import { initCheckboxFunctionality } from "./checkboxFunctionality.js";
import { initFileLoader } from "./fileLoader.js";
import { resetRunnyWords } from "./resetRunnyWords.js";
import { initTag } from "./tag.js";
import { updateHomePage } from "./update.js";

export function initHomePage(){
    const card = document.querySelector('.card');
    if (!card) return;

    const randomCheckbox = document.querySelector('.random');
    const inputCheckbox = document.querySelector('.keyboard');

    const rightButton = document.querySelector('.move-right');
    const leftButton = document.querySelector('.move-left');

    const frontSide = document.querySelector('.front-side');
    const frontSpan = document.querySelector('.front-span');
    const backSpan = document.querySelector('.back-span');
    const additionalSpan = document.querySelector('.additional-span');
    const counter = document.querySelector('.counter');
    const inputLine = document.querySelector('.input-line');
    const lineContainer = document.querySelector('.line-container');
    const fileName = document.querySelector('.file-name');
    
    const tagsContainer = document.querySelector('.tags-container');

    const settings = dataSettings();
    const wordsData = dataWords();

    const safeWords = {
        image: wordsData?.image ?? [],
        preimage: wordsData?.preimage ?? [],
        addition: wordsData?.addition ?? []
    };

    let index = safeWords.image.length > (settings.index ?? 0) ? (settings.index ?? 0) : 0;
    let isRandom = settings.isRandom ?? false;
    let showInput = settings.showInput ?? false;

    randomCheckbox.checked = isRandom;
    inputCheckbox.checked = showInput;
    
    let words = null;
    let runnyWords = null;
    words = wordsData;
    runnyWords = structuredClone(wordsData);

    loadTags();
    
    updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName);

    initFileLoader((data) => {
        words = data;
        runnyWords = structuredClone(data);
        index = 0;

        const freshSettings = dataSettings();
        setSettings(freshSettings.isRandom, 0, freshSettings.isDark, freshSettings.showInput);

        updateNReset();
        loadTags();
    });

    initCheckboxFunctionality(randomCheckbox, "isRandom", dataSettings, (settings) => localStorage.setItem("dataSettings", JSON.stringify(settings)), updateState);
    initCheckboxFunctionality(inputCheckbox, "showInput", dataSettings, (settings) => localStorage.setItem("dataSettings", JSON.stringify(settings)), updateState);

    function updateState() {
        const settings = dataSettings();

        isRandom = settings.isRandom;
        showInput = settings.showInput;
        index = settings.index || 0;

        randomCheckbox.checked = isRandom;
        inputCheckbox.checked = showInput;

        updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName);
    }

    const runnyRandom = () => {
        if(runnyWords.image.length <= 0) {
            resetRunnyWords(runnyWords, words);
        }

        runnyWords.image.splice(index, 1);
        runnyWords.preimage.splice(index, 1);
        runnyWords.addition.splice(index, 1);

        if(runnyWords.image.length <= 0) {
            resetRunnyWords(runnyWords, words);
        }

        return Math.floor(Math.random() * runnyWords.image.length);
    }

    const arithmetic = (step) => {
        index = !isRandom
            ? (index + step + words.image.length) % words.image.length
            : runnyRandom();

        card.classList.remove('is-flipped');

        const freshSettings = dataSettings();
        setSettings(isRandom, index, freshSettings.isDark, freshSettings.showInput);

        updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName);
    };

    leftButton.addEventListener('click', () => arithmetic(-1));
    rightButton.addEventListener('click', () => arithmetic(1));

    const normalize = (str) => str.trim().toLowerCase();

    const checkAnswer = (input) => {
        if(normalize(input.value) === normalize(isRandom ? runnyWords.image[index] : words.image[index])){
            arithmetic(index + 1);
            
            input.value = '';
            input.focus();
            const rect = card.getBoundingClientRect();
            confetti({position: {x: rect.left + rect.width / 2,y: rect.top + rect.height / 2}});
        }
    };

    frontSide.addEventListener('click', function(e){
        if(!e.target.closest('.check')) return;
        checkAnswer(inputLine);
    });

    frontSide.addEventListener('keydown', function(e){
        if(e.key !== 'Enter') return;
        if(e.target !== inputLine) return;
        checkAnswer(inputLine);
    });

    function updateNReset(){
        resetRunnyWords(runnyWords, words);
        updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName);
    }

    function loadTags(){
        tagsContainer.innerHTML = '';
        const project = dataWords();
        const tagsList = project?.tags;

        if(tagsList?.length === 0 || !tagsList){
            tagsContainer.innerHTML = `
                    <div class="display-flex flex-direction-row align-items-center additional-text-colour">
                        <span data-lang="dust"></span> ${airIcon}
                    </div>
                `;
            updateTexts();
            return;
        }

        tagsList?.forEach(tag => {
            tagsContainer.insertAdjacentHTML('beforeend', initTag(tag));
        });
    }

    const destroyCard = initCard(card, arithmetic);
    return () => {
        destroyCard();
    };
}