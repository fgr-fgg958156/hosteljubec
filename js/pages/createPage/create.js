import {addIcon, downloadIcon, storageIcon} from "../../icons/icons.js"

export const createPage = 
`
    <div class="ui-container top-padding">
        <div class="upload-container">
            <button class="r-button download">${downloadIcon}</button>
            <span>Завантажити ЙаСОН</span>
        </div>
        <div class="upload-container">
            <button class="r-button import">${storageIcon}</button>
            <span>Втягнути дані сховку</span>
        </div>
    </div>
    <div class="top-padding"></div>
        <input type="text" id="fileName" placeholder="Прізвисько ЙаСОНа"> 
    </div>
    <div class="card-structure">
        
    </div>
    <button class="add r-button sticky-fingers">${addIcon}</button>
`;