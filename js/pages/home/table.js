
import { updateTexts } from "../../language/languageController.js";
import { imageConverter } from "./update.js";

export function tableMode(words){
    const container = document.createElement('div');

    container.classList.add(
        'test-container',
        'main-max-width',
        'display-flex',
        'justify-content-center',
        'align-items-center',
        'flex-direction-column',
        'padding-bottom-36px'
    );

    const table = document.createElement('table');
    table.classList.add('container', 'box-sizing-border-box');

    table.innerHTML = `
        <thead>
            <tr>
                <th scope="col" data-lang="index" class="additional-text-colour"></th>
                <th scope="col" data-lang="front" class="additional-text-colour"></th>
                <th scope="col" data-lang="back" class="additional-text-colour"></th>
            </tr>
        </thead>
    `;

    const tbody = document.createElement('tbody');

    for(let i = 0; i < words.image.length; i++){

        const tr = document.createElement('tr');

        const indexTd = document.createElement('td');
        indexTd.textContent = i + 1;
        indexTd.classList.add('additional-text-colour');

        const preimageTd = document.createElement('td');
        const imageTd = document.createElement('td');

        const preimageSpan = document.createElement('span');
        const imageSpan = document.createElement('span');

        imageConverter(preimageSpan, words.preimage[i]);
        imageConverter(imageSpan, words.image[i]);

        preimageTd.append(preimageSpan);
        imageTd.append(imageSpan);

        tr.append(
            indexTd,
            preimageTd,
            imageTd
        );

        tbody.append(tr);
    }

    table.append(tbody);
    container.append(table);

    return container;
}