export function resetRunnyWords(runnyWords, words){
    if(!words) return;
    runnyWords.image = [...words.image];
    runnyWords.preimage = [...words.preimage];
    runnyWords.addition = [...words.addition];
}