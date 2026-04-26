import { deleteIcon, plusIcon, pushIcon, swapIcon, uploadIcon } from "../../../assets/icons.js";

export const creatorPage = `
    <div class="card-container display-flex flex-direction-column align-items-center gap-12px">
        <div class="main-max-width additional-text-colour margin-top-12px display-flex justify-content-space-between align-items-center">
            <label for="bookname" data-lang="bookname"></label>
        </div>
        <div class="main-max-width display-flex flex-direction-row align-items-center gap-12px">
            <input type="text" id="bookname" data-lang-placeholder="bookname" class="book-name flex-2">
            <div class="flex-1">
                <input type="text" id="tags" data-lang-placeholder="tags" class="filter-tags"> 
            </div>
        </div>
        <div class="main-max-width additional-text-colour margin-top-12px display-flex justify-content-space-between align-items-center margin-top-12px">
            <label for="message" data-lang="pages"></label>
        </div>
        <div class="main-max-width display-flex flex-direction-row align-items-center gap-12px">
            <textarea id="message" name="message" data-lang-placeholder="pages" class="letters flex-2"></textarea>
            <div class="display-flex flex-direction-column align-items-center gap-12px flex-1">
                <input type="text" id="divider" data-lang-placeholder="divider" class="divider"> 
                <input type="text" id="spliter" data-lang-placeholder="spliter" class="spliter">
                <div class="push-letters blue-square-text-button gap-12px display-flex justify-content-center align-items-center container">
                    ${pushIcon}
                </div>
            </div>
        </div>
        <div class="main-max-width display-flex justify-content-space-between align-items-center flex-direction-row gap-12px">
            <div class="display-flex justify-content-center align-items-center flex-direction-column">
                <input type="file" id="fileImport" accept=".json" hidden>
                <label for="fileImport" class="text-button padding-horizontal-12px gap-12px display-flex justify-content-space-around align-items-center">
                    ${uploadIcon} 
                    <span data-lang="download"></span>
                </label>
            </div>
            <div class="display-flex align-items-center gap-12px flex-nowrap">
                <button class="check circle-button swap-all-rows">${swapIcon}</button>
                <button class="check circle-button delete-all-cards">${deleteIcon}</button>
            </div>
        </div>
        <div class="prop-card-container container display-flex justify-content-center align-items-center flex-direction-column gap-12px">
        </div>
        <div class="add-new-card main-square-text-button display-flex justify-content-center align-items-center main-max-width">
            ${plusIcon}
        </div>
        <div class="data-save main-max-width display-flex flex-direction-row align-items-center gap-12px margin-top-12px margin-bottom-36px">
            <div class="blue-square-text-button white-text-colour display-flex justify-content-center align-items-center flex-1">
                <span data-lang="toData"></span>
            </div>
            <div class="desktop-save main-square-text-button display-flex justify-content-center align-items-center flex-1">
                <span data-lang="toDesktop"></span>
            </div>
        </div>
    </div>
`;