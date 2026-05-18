export function initHostja(){
    const hostja = document.createElement('div');
    hostja.classList.add('hostja');
    hostja.id = 'hostja';
    hostja.innerHTML = `
        <img src="assets/hostja/body.png" class="part body">
        <img src="assets/hostja/head.png" class="part head">

        <img src="assets/hostja/arm.png" class="part left-arm">
        <img src="assets/hostja/arm.png" class="part right-arm">

        <img src="assets/hostja/leg.png" class="part left-leg">
        <img src="assets/hostja/leg.png" class="part right-leg">
        <img src="assets/hostja/shadow.png" class="part shadow">
    `;
    
    document.querySelector('.container').prepend(hostja);
}