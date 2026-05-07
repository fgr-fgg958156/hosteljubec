import { deadIcon } from "../../../assets/icons.js";
import { config } from "../../components/config.js";
import { sliceString } from "../dashboard/book.js";
import { t } from "../../language/languageController.js";

export function updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName){
    if(!words.image?.length || !additionalSpan || !backSpan || !frontSpan) return;
    const currentFront = isRandom ? runnyWords.preimage[index] : words.preimage[index] ?? '';

    imageConverter(frontSpan, currentFront);
    
    const additionalText = isRandom ? runnyWords.addition[index] : words.addition[index];

    additionalSpan.innerHTML = additionalText || '';

    if(!additionalText) {
        additionalSpan.classList.add('hide');
    } else {
        additionalSpan.classList.remove('hide');
    }   
    backSpan.textContent  = isRandom ? runnyWords.image[index] : words.image[index] ?? '';
    counterUpdate(counter, {isRandom, index}, runnyWords, words);
    fileName.textContent = words.fileName;
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
    wrapper.innerHTML = `${deadIcon}</br><span data-lang="urlError">гепнуте покликання</span>`;
    return wrapper;
}

function imageConverter(span, currentFront){
    if (!currentFront) {
        span.textContent = '';
        return;
    }
    if(currentFront.startsWith('http://') || currentFront.startsWith('https://')){
        const wrapper = document.createElement('div');
        wrapper.className = 'img-box';

        const img = document.createElement('img');
        img.src = currentFront;
        img.alt = 'Прообраз';
        img.loading = 'lazy';
        img.draggable = false;

        img.onerror = function() {
            wrapper.replaceWith(deadIconWrapper());
        };

        wrapper.appendChild(img);

        span.replaceChildren(wrapper);

    } else {
        if(!span) return;
        span.textContent = currentFront || "";
    }
}