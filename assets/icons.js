const mainIconSize = 24;
const smallIconSize = 18;
const svgMainSizeProps = `height="${mainIconSize}" width="${mainIconSize}" shape-rendering="geometricPrecision"`;
const svgSmallSizeProps = `height="${smallIconSize}" width="${smallIconSize}" shape-rendering="geometricPrecision"`;

const mainIconFill = `fill="var(--light-text-colour)"`;
const whiteIconFill = `fill="#fff"`;
const grayIconFill = `fill="var(--additional-text-colour)"`;

export const uploadIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgSmallSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M446.67-315.33v-356L332-556.67l-47.33-48L480-800l195.33 195.33-47.33 48-114.67-114.66v356h-66.66ZM226.67-160q-27 0-46.84-19.83Q160-199.67 160-226.67V-362h66.67v135.33h506.66V-362H800v135.33q0 27-19.83 46.84Q760.33-160 733.33-160H226.67Z"/>
    </svg>`;
export const checkmarkIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
    </svg>`;
export const whiteCheckmarkIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${whiteIconFill} viewBox="0 -960 960 960">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
    </svg>`;
export const leftArrowIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
    </svg>`;
export const righArrowIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 0 24 24">
        <path d="M16.175 13L10.575 18.6L12 20L20 12L12 4L10.575 5.4L16.175 11H4V13H16.175Z"/>
    </svg>`;
export const keyboardIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M160-200q-33 0-56.5-23.5T80-280v-400q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v400q0 33-23.5 56.5T800-200H160Zm0-80h640v-400H160v400Zm160-40h320v-80H320v80ZM200-440h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM200-560h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM160-280v-400 400Z"/>
    </svg>`;
export const shuffleIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/>
    </svg>`;
export const confettiIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${whiteIconFill} viewBox="0 -960 960 960">
        <path d="m80-80 200-560 360 360L80-80Zm132-132 282-100-182-182-100 282Zm370-246-42-42 224-224q32-32 77-32t77 32l24 24-42 42-24-24q-14-14-35-14t-35 14L582-458ZM422-618l-42-42 24-24q14-14 14-34t-14-34l-26-26 42-42 26 26q32 32 32 76t-32 76l-24 24Zm80 80-42-42 144-144q14-14 14-35t-14-35l-64-64 42-42 64 64q32 32 32 77t-32 77L502-538Zm160 160-42-42 64-64q32-32 77-32t77 32l64 64-42 42-64-64q-14-14-35-14t-35 14l-64 64ZM212-212Z"/>
    </svg>`;
export const homeIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
    </svg>`;
export const cardsStackIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M130-189 81-546q-5-32 15.5-58t52.5-31l61 435 283-40h267q-8 21-24.5 35.5T695-187l-477 66q-33 5-58-15t-30-53Zm190-127q-33 0-56.5-23.5T240-396v-364q0-33 23.5-56.5T320-840h480q33 0 56.5 23.5T880-760v364q0 33-23.5 56.5T800-316H320Zm0-80h480v-364H320v364Zm0 0v-364 364ZM210-200Zm190-400h320v-80H400v80Zm0 120h200v-80H400v80Z"/>
    </svg>`;
export const loginIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
    </svg>`;
export const personIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z"/>
    </svg>`;
export const sunIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm141.5-310.5Q680-397 680-480t-58.5-141.5Q563-680 480-680t-141.5 58.5Q280-563 280-480t58.5 141.5Q397-280 480-280t141.5-58.5ZM480-480Zm0 340 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/>
    </svg>`;
export const moonIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
    </svg>`;
export const whitePlusIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${whiteIconFill} viewBox="0 -960 960 960">
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
    </svg>`;
export const plusIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
    </svg>`;
export const menuIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
    </svg>`;
export const publishIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z"/>
    </svg>`;
export const skullIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M240-80v-170q-39-17-68.5-45.5t-50-64.5q-20.5-36-31-77T80-520q0-158 112-259t288-101q176 0 288 101t112 259q0 42-10.5 83t-31 77q-20.5 36-50 64.5T720-250v170H240Zm80-80h40v-80h80v80h80v-80h80v80h40v-142q38-9 67.5-30t50-50q20.5-29 31.5-64t11-74q0-125-88.5-202.5T480-800q-143 0-231.5 77.5T160-520q0 39 11 74t31.5 64q20.5 29 50.5 50t67 30v142Zm100-200h120l-60-120-60 120Zm-80-80q33 0 56.5-23.5T420-520q0-33-23.5-56.5T340-600q-33 0-56.5 23.5T260-520q0 33 23.5 56.5T340-440Zm280 0q33 0 56.5-23.5T700-520q0-33-23.5-56.5T620-600q-33 0-56.5 23.5T540-520q0 33 23.5 56.5T620-440ZM480-160Z"/>
    </svg>`;
export const deadIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M356.5-381.5Q301-343 276-280h408q-25-63-80.5-101.5T480-420q-68 0-123.5 38.5ZM312-480l44-42 42 42 42-42-42-42 42-44-42-42-42 42-44-42-42 42 42 44-42 42 42 42Zm250 0 42-42 44 42 42-42-42-42 42-44-42-42-44 42-42-42-42 42 42 44-42 42 42 42ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/>
    </svg>`;
export const lockIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
    </svg>`;
export const publicIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/>
    </svg>`;
export const whiteDeleteIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${whiteIconFill} viewBox="0 -960 960 960">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
    </svg>`;
export const deleteIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
    </svg>`;
export const editIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${whiteIconFill} viewBox="0 -960 960 960">
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
    </svg>`;
export const airIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${grayIconFill} viewBox="0 -960 960 960">
        <path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z"/>
    </svg>`
export const pushIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${whiteIconFill} viewBox="0 -960 960 960">
        <path d="M200-120q-33 0-56.5-23.5T120-200v-400q0-33 23.5-56.5T200-680h160v80H200v400h560v-400H600v-80h160q33 0 56.5 23.5T840-600v400q0 33-23.5 56.5T760-120H200Zm280-200L320-480l56-56 64 63v-487h80v487l64-63 56 56-160 160Z"/>
    </svg>`;
export const swapIcon =`
    <svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/>
    </svg>`;
export const whiteSwapIcon =
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${whiteIconFill} viewBox="0 -960 960 960">
        <path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/>
    </svg>`;
export const languageIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${mainIconFill} viewBox="0 -960 960 960">
        <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480.5-880t155 31.5q72.5 31.5 127 86t86 127Q880-563 880-480.5T848.5-325q-31.5 73-86 127.5t-127 86Q563-80 480.5-80T325-111.5ZM480-162q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/>
    </svg>`;
export const loaderIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${grayIconFill} viewBox="0 -960 960 960" class="loader">
        <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z"/>
    </svg>`;
export const whiteLoaderIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" ${svgMainSizeProps} ${whiteIconFill} viewBox="0 -960 960 960" class="loader">
        <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z"/>
    </svg>`;
export const partyHat = `
    <svg width="42" height="60" viewBox="0 0 42 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="party-hat">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 18L42 60H0L21 18Z" fill="#A8B1FF"/>
        <path d="M38.7354 53.4717L27.4297 60H11.4307L35.1514 46.3037L38.7354 53.4717Z" fill="#4255FF"/>
        <path d="M31.5674 39.1357L1.85449 56.29L8.34668 43.3047L27.9834 31.9678L31.5674 39.1357Z" fill="#4255FF"/>
        <path d="M24.3994 24.7988L14.8408 30.3174L21 18L24.3994 24.7988Z" fill="#4255FF"/>
        <path d="M19.1488 1.4797C19.5944 -0.493232 22.4056 -0.493232 22.8512 1.4797C23.14 2.75835 24.6074 3.36614 25.7158 2.66623C27.426 1.58628 29.4137 3.57405 28.3338 5.28424C27.6339 6.39262 28.2416 7.85995 29.5203 8.14878C31.4932 8.59444 31.4932 11.4056 29.5203 11.8512C28.2416 12.14 27.6339 13.6074 28.3338 14.7158C29.4137 16.426 27.426 18.4137 25.7158 17.3338C24.6074 16.6339 23.14 17.2416 22.8512 18.5203C22.4056 20.4932 19.5944 20.4932 19.1488 18.5203C18.86 17.2416 17.3926 16.6339 16.2842 17.3338C14.574 18.4137 12.5863 16.426 13.6662 14.7158C14.3661 13.6074 13.7584 12.14 12.4797 11.8512C10.5068 11.4056 10.5068 8.59444 12.4797 8.14878C13.7584 7.85995 14.3661 6.39262 13.6662 5.28424C12.5863 3.57405 14.574 1.58628 16.2842 2.66623C17.3926 3.36614 18.86 2.75835 19.1488 1.4797Z" fill="#A8B1FF"/>
    </svg>`;