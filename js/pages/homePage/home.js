import {uploadIcon, checkIcon, leftIcon, rightIcon} from "../../icons/icons.js"
import { dataSettings } from "../storages.js";

export const homePage = 
`
    <div class="upload-container">
        <input type="file" id="fileInput" accept=".json" hidden>
        <label for="fileInput" class="custom-file-upload">
            ${uploadIcon}
        </label>
        <span>Втягнути ЙаСОН</span>
    </div>
    <div class="card-structure">
        <div class="card">
            <div class="front">
                <span class="front-span">Прообраз (чоло)</span>
                <span class="additional-span">+</br>Додаток</span>
                <div class="input">
                    <input type="text" id="checkInput" placeholder="Образ (тил)">
                    <button class="checkWord r-button">${checkIcon}</button>
                </div>
            </div>
            <div class="back"><span class="back-span">Образ (тил)</span></div>
        </div>
        <div class="buttons">
            <button class="left r-button">${leftIcon}</button>
            <div class="counter">0/0</div>
            <button class="right r-button">${rightIcon}</button>
        </div>
    </div>
    <div class="upload-container">
        <input type="checkbox" id="isRandom" name="isRandom" ${dataSettings().isRandom ? 'checked' : ''} />
        <label for="isRandom">Випадковість</label>
    </div>
`;