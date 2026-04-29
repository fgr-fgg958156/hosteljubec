import { deadIcon } from "../../../assets/icons.js";
import { config } from "../../components/config.js";
import { sliceString } from "../dashboard/book.js";

export function updateHomePage(words, runnyWords, index, isRandom, showInput, frontSpan, additionalSpan, backSpan, counter, lineContainer, fileName){
    if(!words.image?.length) return;
    const currentFront = isRandom ? runnyWords.preimage[index] : words.preimage[index] ?? '';

    imageConverter(frontSpan, currentFront);
    
    const additionalText = isRandom ? runnyWords.addition[index] : words.addition[index];

    additionalSpan.textContent = cutTheString(additionalText || '', config.maxAdditionChar);

    if(!additionalText) {
        additionalSpan.classList.add('hide');
    } else {
        additionalSpan.classList.remove('hide');
    }   
    backSpan.textContent  = isRandom ? cutTheString(runnyWords.image[index], config.maxChar) : cutTheString(words.image[index], config.maxChar) ?? '';
    counter.textContent  = isRandom ? `кількість : ${runnyWords.image.length}` :`${index + 1} / ${words.image.length}`;
    fileName.textContent = words.fileName;
    if(showInput){
        lineContainer.classList.remove('display-none');
    }
    else{
        lineContainer.classList.add('display-none');
    }
}

function cutTheString(str, lgh) {
    if(!str) return '';
    return(str.slice(0, lgh));
}

export function deadIconWrapper() {
    const wrapper = document.createElement('div');
    wrapper.className = 'upload-container max-img-height';
    wrapper.innerHTML = `${deadIcon}</br><span>гепнуте покликання</span>`;
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
        span.textContent = cutTheString(currentFront, config.maxChar);
    }
}