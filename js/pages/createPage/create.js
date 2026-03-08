import {addIcon, downloadIcon, storageIcon} from "../../icons/icons.js"

export const createPage = 
`
    <div class="ui-container">
        <div class="upload-container">
            <button class="r-button download">${downloadIcon}</button>
            <span>Завантажити ЖАБАсон</span>
        </div>
        <div class="upload-container">
            <button class="r-button import">${storageIcon}</button>
            <span>Втягнути дані сховку</span>
        </div>
    </div>
    <div class="card-structure">
        
    </div>
    <div>
        <button class="add r-button">${addIcon}</button>
    </div>
`;