import {editIcon, lockIcon, publicIcon, whiteDeleteIcon } from "../../../assets/icons.js";
//import { t } from "../../language/languageController.js";

export function initCard(name, author, isPublic, firstTag = '(0)'){
    return `
    <div class="book-container position-relative display-flex">
        <div class="book-background position-absolute display-flex">
            <div class="flex-1 edit-background display-flex flex-direction-row align-items-center padding-horizontal-36px">${editIcon}</div>
            <div class="flex-1 delete-background display-flex flex-direction-row-reverse align-items-center padding-horizontal-36px">${whiteDeleteIcon}</div>
        </div>
        <div id="${author}ѳлѧсїс${name}" class="book display-flex flex-direction-row align-items-center justify-content-space-between padding-12px position-relative">
                <div class="min-width-144px flex-1 display-flex flex-direction-column justify-content-space-between margin-horizontal-12px">
                    <span class="additional-text-colour book-author text-cut">${author} | <span class="blue-text-colour">${firstTag}</span></span>
                    <span class="header-15-span book-name text-cut">${name}</span>
                </div>
            <button class="display-status circle-button margin-horizontal-12px">${isPublic ? publicIcon : lockIcon}</button>
        </div>
    </div>
    `
}

export function sliceString(str, length) {
    return str.length > length
        ? str.slice(0, length).trim() + "…"
        : str;
}