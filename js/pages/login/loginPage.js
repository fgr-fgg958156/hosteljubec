export const loginPage = `
    <div class="card-container display-flex flex-direction-column align-items-center gap-12px">
        <div class="main-max-width display-flex flex-direction-column align-items-center gap-12px">
            <div class="width-60per"><span class="header-span" data-lang="login"></span></div>
            <div class="width-60per additional-text-colour margin-top-12px">
                <label for="nickname" data-lang="registerName"></span>
            </div>
            <input type="text" id="nickname" data-lang-placeholder="registerName" class="nickname-input">
            <div class="width-60per additional-text-colour margin-top-12px display-flex justify-content-space-between align-items-center">
                <label for="password" data-lang="password"></label>
                <label for="password" class="blue-interactive-text-colour forgot-password" data-lang="forgotPassword">Забув пароль</label></div>
            <input type="password" id="password" data-lang-placeholder="password" class="password-input">
            <div class="width-60per display-flex flex-direction-column align-items-center gap-12px margin-top-36px">
                <div class="login-button blue-square-text-button gap-12px white-text-colour display-flex justify-content-space-around align-items-center container">
                    <span data-lang="login"></span>
                </div>
                <div class="separator container additional-text-colour" data-lang="or"></div>
                <div class="register-button main-square-text-button gap-12px display-flex justify-content-space-around align-items-center container">
                    <span data-lang="register"></span>
                </div>
            </div>
        </div>
    </div>
`;