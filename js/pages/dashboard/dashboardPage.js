import { lockIcon, plusIcon, publicIcon } from "../../../assets/icons.js";
import { dataLogin } from "../../utils/storage.js";

export function dashboardPage () {
    return `
        <div class="card-container display-flex flex-direction-column align-items-center gap-12px">
            <div class="main-max-width display-flex flex-direction-row align-items-center justify-content-space-around gap-12px flex-wrap-wrap">
                <div class="display-flex flex-direction-row align-items-center gap-12px flex-1 justify-content-space-around">
                    <label class="radio-filter-input padding-horizontal-12px gap-12px display-flex justify-content-space-around align-items-center">
                        <input type="radio" name="folder" value="public" checked>
                        ${publicIcon}
                        <span data-lang="public"></span>
                    </label>
                    ${
                        dataLogin()?.login ? 
                        `<label class="radio-filter-input padding-horizontal-12px gap-12px display-flex justify-content-space-around align-items-center">
                        <input type="radio" name="folder" value="private">
                        ${lockIcon}
                        <span data-lang="private"></span>
                        </label>` 
                        : ``
                    }
                </div>
                <input type="text" id="tags-input" data-lang-placeholder="tags" class="tags-input flex-1 min-width-144px" value="${''}">
            </div>
            <div class="main-max-width display-flex flex-direction-column align-items-center gap-12px books-container">
                
            </div>
        </div>
    `;
} 