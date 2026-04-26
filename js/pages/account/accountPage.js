import { partyHat } from "../../../assets/icons.js";
import { dataLogin } from "../../utils/storage.js";

export const accountPage = `
    <div class="card-container display-flex flex-direction-column align-items-center gap-12px">
        <div class="main-max-width display-flex flex-direction-column align-items-center gap-12px">
            <div class="user-profile-container display-flex align-items-center">
                <div class="user-profile-image display-flex justify-content-center align-items-center header-span"></div>
                ${partyHat}
            </div>
            <div class="width-60per additional-text-colour margin-top-12px">
                <label for="nickname" data-lang="nickname"></label>
            </div>
            <input type="text" id="nickname" data-lang-placeholder="nickname" class="nickname-edit-input" value="${''}">
            <div class="width-60per additional-text-colour margin-top-12px display-flex justify-content-space-between align-items-center">
                <label for="password" data-lang="password"></label>
            </div>
            <input type="password" id="password" data-lang-placeholder="password" class="password-edit-input" value="${''}">
            <div class="width-60per display-flex flex-direction-column align-items-center gap-12px margin-top-36px">
                <div class="save-profile-button blue-square-text-button gap-12px white-text-colour display-flex justify-content-space-around align-items-center container">
                    <span data-lang="save"></span>
                </div>
                <div class="separator container additional-text-colour" data-lang="or"></div>
                <div class="logout-profile-button main-square-text-button gap-12px display-flex justify-content-space-around align-items-center container">
                    <span data-lang="logout"></span>
                </div>
                <div class="delete-profile-button main-square-text-button gap-12px display-flex justify-content-space-around align-items-center container">
                    <span data-lang="delete"></span>
                </div>
            </div>
        </div>
    </div>
`;