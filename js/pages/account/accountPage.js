import { loaderIcon, partyHat, whiteLoaderIcon } from "../../../assets/icons.js";

export const accountPage = `
    <div class="card-container display-flex flex-direction-column align-items-center gap-12px">
        <div class="main-max-width display-flex flex-direction-row align-items-center">
            <span class="additional-text-colour" data-lang="information">Особиста інформація</span>
        </div>
        <div class="main-max-width display-flex flex-direction-column align-items-stretch border-radius-18px border">
            <div class="container display-flex flex-direction-row align-items-center justify-content-space-between border-bottom padding-12px box-sizing-border-box">
                <div class="display-flex align-items-center gap-12px flex-1 min-width-0">
                    <div class="user-profile-container display-flex align-items-center">
                        <div class="user-profile-image display-flex justify-content-center align-items-center header-span white-text-colour">${whiteLoaderIcon}</div>
                        ${partyHat}
                    </div>
                    <div class="display-flex flex-direction-column flex-1 min-width-0">
                        <span class="header-nickname header-15-span text-cut box-sizing-border-box">...</span>
                        <span class="register-name additional-text-colour text-cut box-sizing-border-box">@...</span>
                    </div>
                </div>
                <div class="save-profile-button display-flex flex-1 blue-square-text-button white-text-colour justify-content-space-around align-items-center padding-10px box-sizing-border-box">
                    <span data-lang="save"></span>
                </div>
            </div>
            <div class="display-flex flex-direction-column align-items-center container">
                <div class="display-flex flex-direction-row align-items-center container border-bottom justify-content-space-between padding-12px box-sizing-border-box">
                    <div class="additional-text-colour flex-1">
                        <label for="nickname" data-lang="nickname"></label>
                    </div>
                    <input type="text" id="nickname" data-lang-placeholder="nickname" class="nickname-edit-input flex-1" value="${''}">
                </div>  
                <div class="display-flex flex-direction-row align-items-center container justify-content-space-between padding-12px box-sizing-border-box">
                    <div class="additional-text-colour flex-1">
                        <label for="password" data-lang="password"></label>
                    </div>
                    <input type="password" id="password" data-lang-placeholder="password" class="password-edit-input flex-1" value="${''}">
                </div>
            </div>
        </div>
        <div class="main-max-width display-flex flex-direction-row align-items-center margin-top-36px">
            <span class="additional-text-colour" data-lang="appearance"></span>
        </div>
        <div class="main-max-width display-flex flex-direction-column align-items-stretch border-radius-18px border">
            <div class="display-flex flex-direction-column align-items-center container">
                <div class="display-flex flex-direction-row align-items-center container border-bottom justify-content-space-between padding-12px box-sizing-border-box">
                    <div class="additional-text-colour flex-1">
                        <label for="theme" data-lang="theme"></label>
                    </div>
                    <div id="theme" class="theme-button display-flex flex-1 main-square-text-button justify-content-center gap-12px align-items-center padding-10px box-sizing-border-box"></div>
                </div>  
                <div class="display-flex flex-direction-row align-items-center container justify-content-space-between padding-12px box-sizing-border-box">
                    <div class="additional-text-colour flex-1">
                        <label for="language" data-lang="language"></label>
                    </div>
                    <div id="language" class="language-button display-flex flex-1 main-square-text-button justify-content-space-around align-items-center padding-10px box-sizing-border-box">
                        <span data-lang="lang"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-max-width display-flex flex-direction-row align-items-center gap-12px justify-content-space-between margin-top-36px">
            <div class="logout-profile-button main-square-text-button display-flex justify-content-space-around align-items-center flex-1">
                <span data-lang="logout"></span>
            </div>
            <div class="delete-profile-button main-square-text-button display-flex justify-content-space-around align-items-center flex-1">
                <span data-lang="delete"></span>
            </div>
        </div>
    </div>
`;