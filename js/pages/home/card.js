import { checkmarkIcon, keyboardIcon, leftArrowIcon, publishIcon, righArrowIcon, shuffleIcon, uploadIcon } from "../../../assets/icons.js";

export const cardMode = `
    <div class="main-max-width position-relative card-wrapper">
        <div class="sidekick-card position-absolute container box-sizing-border-box"></div>
        <div class="card container box-sizing-border-box">
            <span class="swipe-indicator"></span>
            <div class="front-side display-flex justify-content-center align-items-center flex-direction-column padding-12px">
                <span class="front-span card-span card-text-cut" data-lang="front"></span>
                <div class="additional-span additional-text-colour card-text-cut card-span"><span>+</span><br/><span data-lang="addition"></span></div>
                <div class="line-container display-flex justify-content-center align-items-center flex-direction-row">
                    <input type="text" id="checkInput" data-lang-placeholder="back" class="input-line margin-12px">
                    <button class="check circle-button">${checkmarkIcon}</button>
                </div>
            </div>
            <div class="back-side display-flex justify-content-center align-items-center flex-direction-column padding-12px">
                <span class="back-span card-span card-text-cut" span data-lang="back"></span>
            </div>
        </div>
    </div>
    <div class="min-width-236px margin-top-12px display-flex justify-content-space-between align-items-center flex-direction-row padding-bottom-12px">
        <button class="move-left main-button">${leftArrowIcon}</button>
        <div class="counter margin-horizontal-12px">0/0</div>
        <button class="move-right main-button">${righArrowIcon}</button>
    </div>
`;