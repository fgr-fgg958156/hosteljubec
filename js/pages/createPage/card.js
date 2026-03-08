export const pasteCard = (id, image, preimage) => `
    <div class="prop-card" id='${id}'>
        <div class="card-input">
            <input type="text" placeholder="Прообраз" class="preimage" value="${preimage}">
            <input type="text" placeholder="Образ" class="image" value="${image}">
        </div>
    </div>
`;