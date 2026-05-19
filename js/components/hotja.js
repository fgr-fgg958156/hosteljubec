export function initHostja(borderColour = "#802830", fillColour = "#F04050"){
    const hostja = document.createElement('div');
    hostja.classList.add('hostja');
    hostja.id = 'hostja';
    hostja.innerHTML = `
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="part body">
            <path d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14V36H0V14Z" fill="${borderColour}"/>
            <path d="M2 14C2 7.37258 7.37258 2 14 2C20.6274 2 26 7.37258 26 14V34H2V14Z" fill="${fillColour}"/>
        </svg>

        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg" class="part head">
            <path d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14Z" fill="${borderColour}"/>
            <path d="M26 14C26 20.6274 20.6274 26 14 26C7.37258 26 2 20.6274 2 14C2 7.37258 7.37258 2 14 2C20.6274 2 26 7.37258 26 14Z" fill="${fillColour}"/>
            <path d="M8 24H20V29H8V24Z" fill="${fillColour}"/>
            <path d="M9 19C9 18.4477 9.44772 18 10 18H18C18.5523 18 19 18.4477 19 19C19 19.5523 18.5523 20 18 20H10C9.44772 20 9 19.5523 9 19Z" fill="${borderColour}"/>
            <path d="M9 15C9 16.1046 8.10457 17 7 17C5.89543 17 5 16.1046 5 15C5 13.8954 5.89543 13 7 13C8.10457 13 9 13.8954 9 15Z" fill="${borderColour}"/>
            <path d="M23 15C23 16.1046 22.1046 17 21 17C19.8954 17 19 16.1046 19 15C19 13.8954 19.8954 13 21 13C22.1046 13 23 13.8954 23 15Z" fill="${borderColour}"/>
        </svg>

        <svg width="13" height="31" viewBox="0 0 13 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="part left-arm">
            <path d="M7 2H10V31H0V7C3.74482e-07 3.25486 2.94111 0.196329 6.63965 0.00878906L7 0V2Z" fill="${borderColour}"/>
            <path d="M7 2H13V12H8V29H2V7C2 4.23858 4.23858 2 7 2Z" fill="${fillColour}"/>
        </svg>

        <svg width="13" height="31" viewBox="0 0 13 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="part right-arm">
            <path d="M7 2H10V31H0V7C3.74482e-07 3.25486 2.94111 0.196329 6.63965 0.00878906L7 0V2Z" fill="${borderColour}"/>
            <path d="M7 2H13V12H8V29H2V7C2 4.23858 4.23858 2 7 2Z" fill="${fillColour}"/>
        </svg>

        <svg width="11" height="27" viewBox="0 0 11 27" fill="none" xmlns="http://www.w3.org/2000/svg" class="part left-leg">
            <path d="M0 3H11V27H0V3Z" fill="${borderColour}"/>
            <path d="M2 0H9V25H2V0Z" fill="${fillColour}"/>
        </svg>        
        
        <svg width="11" height="27" viewBox="0 0 11 27" fill="none" xmlns="http://www.w3.org/2000/svg" class="part right-leg">
            <path d="M0 3H11V27H0V3Z" fill="${borderColour}"/>
            <path d="M2 0H9V25H2V0Z" fill="${fillColour}"/>
        </svg>

        <svg width="42" height="12" viewBox="0 0 42 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="part shadow">
            <ellipse cx="21" cy="6" rx="21" ry="6" fill="#0D1117" fill-opacity="0.25"/>
        </svg>
    `;
    
    document.querySelector('.container').prepend(hostja);
}
//<img src="assets/hostja/body.png" class="part body"></img>
//<img src="assets/hostja/head.png" class="part head"></img>
// <img src="assets/hostja/arm.png" class="part left-arm">
// <img src="assets/hostja/arm.png" class="part right-arm">
// <img src="assets/hostja/leg.png" class="part left-leg">
// <img src="assets/hostja/leg.png" class="part right-leg">
// <img src="assets/hostja/shadow.png" class="part shadow">