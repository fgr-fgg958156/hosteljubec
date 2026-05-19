import { deadIcon, loaderIcon } from "../../../assets/icons.js";
import { config } from "../../components/config.js";
import { sliceString } from "../dashboard/book.js";
import { t, updateTexts } from "../../language/languageController.js";

export function updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName){
    fileName.textContent = words.fileName;
    if(!words.image?.length || !additionalSpan || !backSpan || !frontSpan) return;
    const currentFront = isRandom ? runnyWords.preimage[index] : words.preimage[index] ?? '';
    const currentFront1 = isRandom ? runnyWords.image[index] : words.image[index] ?? '';

    imageConverter(frontSpan, currentFront);
    imageConverter(backSpan, currentFront1);
    
    const additionalText = isRandom ? runnyWords.addition[index] : words.addition[index];

    additionalSpan.innerHTML = additionalText || '';

    if(!additionalText) {
        additionalSpan.classList.add('hide');
    } else {
        additionalSpan.classList.remove('hide');
    }

    counterUpdate(counter, {isRandom, index}, runnyWords, words);
    if(showInput){
        lineContainer?.classList.remove('display-none');
    }
    else{
        lineContainer?.classList.add('display-none');
    }
}

export function counterUpdate(counter, {isRandom, index}, runnyWords, words){
    if(!counter) return;
    counter.textContent  = isRandom ? `${t('quantity')} : ${runnyWords.image.length}` : `${index + 1} / ${words.image.length}`;
}

export function deadIconWrapper() {
    const wrapper = document.createElement('div');
    wrapper.className = 'upload-container max-img-height';
    wrapper.innerHTML = `${deadIcon}</br><span data-lang="urlError"></span>`;
    updateTexts(wrapper);
    return wrapper;
}

export function imageConverter(span, currentFront){
    if (!currentFront) {
        span.innerHTML = '';
        return;
    }

    if (currentFront.startsWith('http://') || currentFront.startsWith('https://')) {
        span.innerHTML = loaderIcon;

        const wrapper = document.createElement('div');
        wrapper.className = 'img-box';

        const img = document.createElement('img');

        img.alt = 'Прообраз';
        img.draggable = false;

        img.onload = function () {
            wrapper.appendChild(img);
            span.replaceChildren(wrapper);
        };

        img.onerror = function () {
            span.replaceChildren(deadIconWrapper());
        };

        img.src = currentFront;

    } else {
        span.innerHTML = currentFront || "";
    }
}