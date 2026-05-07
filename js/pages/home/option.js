export function initOption(index, classMode, text){
    return `
    <div class="option box-sizing-border-box flex-1 gap-12px">
        <div class="circle-number">${index}</div>
        <span class="${classMode} card-text-cut">${text}</span>
    </div>
    `
}