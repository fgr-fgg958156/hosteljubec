import { checkmarkIcon, keyboardIcon, leftArrowIcon, publishIcon, righArrowIcon, shuffleIcon, uploadIcon } from "../../../assets/icons.js";

export const testMode = `
    <div class="test-container main-max-width display-flex justify-content-center align-items-center flex-direction-column">
        <div class="container display-flex gap-12px flex-direction-column min-height-240">
            <div class="additional-text-colour">
                <span data-lang="term"></span>
            </div>
            <span class="front-span card-text-cut" data-lang="front"></span>
            <div class="display-flex flex-direction-column justify-content-center additional-span additional-text-colour card-text-cut gap-12px"><span>+</span><span data-lang="addition"></span></div>
        </div>
        <div class="additional-text-colour container">
            <span data-lang="choosePhrase"></span>
        </div>
        <div class="container options-container margin-top-12px display-flex gap-12px flex-wrap-wrap flex-direction-row">
            <div class="option box-sizing-border-box flex-1 gap-12px"><div class="circle-number">1</div><span class="back-span card-text-cut" data-lang="back"></span></div>
        </div>
    </div>
    <div class="main-max-width margin-top-36px display-flex justify-content-center align-items-center padding-bottom-12px">
        <div class="counter margin-horizontal-12px">0/0</div>
    </div>
`;