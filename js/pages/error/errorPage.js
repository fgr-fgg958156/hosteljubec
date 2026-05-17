import { airIcon } from "../../../assets/icons.js";

export const errorPage = `
    <div class="card-container display-flex flex-direction-column align-items-center gap-12px">
        <div class="main-max-width display-flex flex-direction-column margin-bottom-12px flex-wrap-wrap">
            <span class="header-span margin-vertical-12px" data-lang="error404"></span>
            <div class="additional-text-colour display-flex flex-direction-row align-items-center"><span data-lang="dustPhrase"></span> ${airIcon}</div>
            <div class="additional-text-colour display-flex flex-direction-row align-items-center"><span data-lang="air"></span><span class="air-counter">0</span></div>
        </div>
    </div>
    <div class="hostja" id="hostja">
        <img src="assets/hostja/body.png" class="part body">
        <img src="assets/hostja/head.png" class="part head">

        <img src="assets/hostja/arm.png" class="part left-arm">
        <img src="assets/hostja/arm.png" class="part right-arm">

        <img src="assets/hostja/leg.png" class="part left-leg">
        <img src="assets/hostja/leg.png" class="part right-leg">
        <img src="assets/hostja/shadow.png" class="part shadow">
    </div>
`;