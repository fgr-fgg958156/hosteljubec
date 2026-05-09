import { airIcon, checkmarkIcon, whiteCheckmarkIcon, whiteCross } from "../../../assets/icons.js";
import { updateTexts } from "../../language/languageController.js";
import { getProject } from "../../services/services.js";
import { dataSettings, dataWords, setSettings } from "../../utils/storage.js";
import { cardMode } from "./card.js";
import { initCard } from "./cardFunctionality.js";
import { initCheckboxFunctionality } from "./checkboxFunctionality.js";
import { initFileLoader } from "./fileLoader.js";
import { initOption } from "./option.js";
import { resetRunnyWords } from "./resetRunnyWords.js";
import { initTag } from "./tag.js";
import { testMode } from "./test.js";
import { updateHomePage } from "./update.js";

export let runnyWords = null;
export let words = null;

export function initHomePage(){
    const settings = dataSettings();
    const wordsData = dataWords();
    const container = document.querySelector('.mode-container');
    container.innerHTML = settings.testMode ? testMode : cardMode;
    const card = container.querySelector('.card');
    updateTexts(card);

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
    const optionsContainer = document.querySelector('.options-container');
    const fileName = document.querySelector('.file-name');
    
    const tagsContainer = document.querySelector('.tags-container');
    const coolDownMS = settings.cooldown || 2000;

    const safeWords = {
        image: wordsData?.image ?? [],
        preimage: wordsData?.preimage ?? [],
        addition: wordsData?.addition ?? []
    };

    let index = safeWords.image.length > (settings.index ?? 0) ? (settings.index ?? 0) : 0;
    let isRandom = settings.isRandom ?? false;
    let learningMode = settings.learningMode ?? false;
    let showInput = settings.showInput ?? false;

    randomCheckbox.checked = isRandom;
    inputCheckbox.checked = showInput;
    
    words = wordsData;
    runnyWords = structuredClone(wordsData);

    loadTags();
    loadOptions();
    
    updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName);

    initFileLoader((data) => {
        words = data;
        runnyWords = structuredClone(data);
        index = 0;

        const freshSettings = dataSettings();
        setSettings({...freshSettings, index: 0});

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

    function shuffle(array) {
        return array.map(v => ({ v, r: Math.random() })).sort((a, b) => a.r - b.r).map(({ v }) => v);
    }

    function loadOptions() {
        if (!optionsContainer || !words?.image?.length) return;
    
        optionsContainer.innerHTML = '';
    
        const correctWords = isRandom ? runnyWords.image : words.image;
    
        const correct = correctWords[index];
    
        const wrong = words.image.filter(word => word !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
    
        const options = [...wrong, correct];
    
        const shuffled = shuffle(options);
    
        shuffled.forEach((text, i) => {
            const isCorrect = text === correct;
    
            optionsContainer.insertAdjacentHTML(
                'beforeend',
                initOption(i + 1, isCorrect ? 'back-span' : 'wrong', text)
            );
    
            const el = optionsContainer.lastElementChild;
    
            el.dataset.value = text;
            el.dataset.correct = isCorrect;
        });
    
        updateTexts();
    }

    const arithmetic = (step) => {
        index = !isRandom
            ? (index + step + words?.image?.length) % words?.image?.length
            : !learningMode ? runnyRandom() : step === -1 ? runnyRandom() : Math.floor(Math.random() * runnyWords.image.length);

        card?.classList.remove('is-flipped');

        const freshSettings = dataSettings();
        setSettings(isRandom, index, freshSettings.isDark, freshSettings.showInput, freshSettings.learningMode, freshSettings.testMode, freshSettings.cooldown);

        updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName);
    };

    leftButton?.addEventListener('click', () => arithmetic(-1));
    rightButton?.addEventListener('click', () => arithmetic(1));

    const normalize = (str) => str.trim().toLowerCase();

    const checkAnswer = (input) => {
        if(normalize(input.value) === normalize(isRandom ? runnyWords.image[index] : words.image[index])){
            arithmetic(index + 1);
            
            input.value = '';
            input.focus();
            const rect = container?.getBoundingClientRect();
            confetti({position: {x: rect.left + rect.width / 2,y: rect.top + rect.height / 2}});
        }
    };

    frontSide?.addEventListener('click', function(e){
        if(!e.target.closest('.check')) return;
        checkAnswer(inputLine);
    });

    frontSide?.addEventListener('keydown', function(e){
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

    let coolDown = false;

    optionsContainer?.addEventListener('click', (e) => {
        const option = e.target.closest('.option');
        if (!option || coolDown) return;

        const isCorrect = option.dataset.correct === 'true';
        coolDown = true;
        const height = option.offsetHeight;

        if (isCorrect) {
            option.style.height = `${height}px`;
            option.innerHTML = whiteCheckmarkIcon;
            option.style.borderColor = 'rgb(24, 174, 121)';
            option.querySelector('svg').style.fill = 'rgb(24, 174, 121)';
            option.style.backgroundColor = `rgb(24, 174, 121, 0.3)`;

            const rect = container?.getBoundingClientRect();
            confetti({
                position: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                }
            });
            setTimeout(() => {
                coolDown = false;
                arithmetic(learningMode && isRandom ? -1 : 1);
                loadOptions();
            }, coolDownMS);
        } else {
            const correctOption = optionsContainer.querySelector('[data-correct="true"]');
            option.style.height = `${height}px`;
            option.innerHTML = whiteCross;
            option.style.borderColor = 'rgb(240, 64, 80)';
            option.querySelector('svg').style.fill = 'rgb(240, 64, 80)';
            option.style.backgroundColor = `rgb(240, 64, 80, 0.3)`;
            if(correctOption){
                correctOption.style.border = '2px dashed rgb(24, 174, 121)';
            }
            setTimeout(() => {
                coolDown = false;
                arithmetic(1);
                loadOptions();
            }, coolDownMS);
        }
    });

    let destroyCard = null;
    if (card) {
        destroyCard = initCard(card, arithmetic);
    }
    return () => {
        destroyCard?.();
    };
}
