import { checkmarkIcon, keyboardIcon, leftArrowIcon, publishIcon, righArrowIcon, shuffleIcon, uploadIcon } from "../../../assets/icons.js";
import { dataSettings } from "../../utils/storage.js";

export const homePage = 
`
    <div class="card-container display-flex justify-content-center align-items-center flex-direction-column">
        <div class="main-max-width display-flex justify-content-space-between flex-direction-row margin-bottom-12px flex-wrap-wrap">
            <div class="flex-2 min-width-144px margin-right-12px">
                <span class="header-span file-name margin-vertical-12px text-cut" data-lang="name"></span>
            </div>
            <div class="display-flex justify-content-space-between align-items-center flex-direction-row gap-12px flex-1 flex-wrap-nowrap">
                <div class="display-flex justify-content-center align-items-center flex-direction-column">
                    <input type="file" id="fileInput" accept=".json" hidden>
                    <label for="fileInput" class="text-button custom-file-upload padding-horizontal-12px gap-12px display-flex justify-content-space-around align-items-center">
                        ${uploadIcon} 
                        <span data-lang="download"></span>
                    </label>
                </div>
                <div class="display-flex align-items-center gap-12px flex-nowrap">
                    <label class="checkbox-container">
                        <input type="checkbox" class="keyboard checkbox-button">
                        <span>${keyboardIcon}</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" class="random checkbox-button">
                        <span>${shuffleIcon}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="mode-container container display-flex justify-content-center align-items-center flex-direction-column"></div>
        <div class="main-max-width additional-text-colour padding-top-12px border-top">
            <span data-lang="tags"></span>:
        </div>
        <div class="tags-container main-max-width display-flex align-items-center flex-direction-row flex-wrap-wrap gap-12px">
            
        </div>
    </div>
`;