import { loaderIcon, lockIcon, plusIcon, publicIcon } from "../../../assets/icons.js";

export const dashboardPage = `
    <div class="card-container display-flex flex-direction-column align-items-center gap-12px">
        <div class="main-max-width display-flex flex-direction-row align-items-center justify-content-space-around gap-12px flex-wrap-wrap">
            <div class="flex-1 display-flex flex-direction-row align-items-center gap-12px min-width-256px">
                <label class="radio-filter-input text-cut padding-horizontal-12px gap-12px display-flex align-items-center">
                    <input type="radio" name="folder" value="public" checked>
                    ${publicIcon}
                    <span data-lang="public" class="text-cut"></span>
                </label>
                <label class="radio-filter-input text-cut padding-horizontal-12px gap-12px display-flex align-items-center radio-block">
                    <input type="radio" name="folder" value="private">
                    ${lockIcon}
                    <span data-lang="private" class="text-cut"></span>
                </label>
            </div>
            <div class="flex-1 display-flex flex-direction-row align-items-center min-width-144px">
                <input type="text" id="tags-input" data-lang-placeholder="tags" class="tags-input max-width" value="${''}">
            </div>
        </div>
        <div class="main-max-width display-flex flex-direction-column align-items-center gap-12px books-container margin-bottom-36px">
            <div class="margin-top-36px">${loaderIcon}</div>
        </div>
    </div>
`;