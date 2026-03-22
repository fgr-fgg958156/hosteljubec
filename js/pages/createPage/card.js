import { deleteIcon } from "../../icons/icons.js";

export const pasteCard = (id, image, preimage, addition) => `
    <div class="prop-card" id='${id}'>
        <div class="number">${id + 1}</div>
        <div class="ui-container">
            <div class="card-input">
                <input type="text" placeholder="Прообраз (чоло)" class="preimage" value="${preimage}">
                <input type="text" placeholder="Образ (тил)" class="image" value="${image}">
                <input type="text" placeholder="Додаток" class="addition" value="${addition}">
            </div>
            <div><button class="r-button delete-card">${deleteIcon}</button></div>
        </div>
    </div>
`;