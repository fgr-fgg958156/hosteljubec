import { deleteIcon, whiteSwapIcon } from "../../../assets/icons.js";

export function initCard(index, front, back, addition) {
    return `
        <div class="prop-card display-flex justify-content-center align-items-center flex-direction-column padding-12px" data-index="${index}">
            <div class="display-flex justify-content-center align-items-center flex-direction-column gap-12px">
                <input type="text" id="back-input-${index}" data-lang-placeholder="front" class="input-line image-input" value="${back}">
                 <input type="text" id="front-input-${index}" data-lang-placeholder="back" class="input-line preimage-input" value="${front}">
                <input type="text" id="addition-input-${index}" data-lang-placeholder="addition" class="input-line addition-input" value="${addition}">
                <div class="display-flex align-items-center gap-12px container">
                    <div class="blue-square-text-button white-text-colour display-flex justify-content-center align-items-center flex-1 swap-rows">
                        ${whiteSwapIcon}
                    </div>
                    <div class="main-square-text-button display-flex justify-content-center align-items-center flex-1 delete-card">
                        ${deleteIcon}
                    </div>
                </div>
            </div>
        </div>
    `
}