import { t } from "../language/languageController.js";

export function initHostjaMovement() {
    let airTimer = 10;
    const maxAir = 10;
    let airInterval = null;

    const hostja = document.getElementById("hostja");
    const hostjaInfo = hostja.getBoundingClientRect();

    const head = document.querySelector(".head");
    const body = document.querySelector(".body");

    const leftArm = document.querySelector(".left-arm");
    const rightArm = document.querySelector(".right-arm");

    const leftLeg = document.querySelector(".left-leg");
    const rightLeg = document.querySelector(".right-leg");

    const shadow = document.querySelector(".shadow");

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;

    let hostjaX = hostjaInfo.left;
    let hostjaY = hostjaInfo.top;

    let lastHostjaX = 0;
    let lastHostjaY = 0;

    let lastX = 0;
    let lastY = 0;

    let speed = 1;
    let angle = 0;
    let walkTime = 0;

    let velocityX = 0;
    let velocityY = 0;

    let changeDirectionInterval = null;
    let thinkingTimer = null;

    let state = "idle"; 
    let throwing = false;

    function moveHostja(x, y) {
        hostja.style.left = x + "px";
        hostja.style.top = y + "px";
    }

    function walking() {
        if(dragging) return;
        const minX = 0;
        const minY = 0;

        if (state === "thinking") {
            speed *= 0.9;
        }

        if(!throwing){
            if(state !== "thinking")
                speed += 0.01;
            animateLegs();
        }
        else{
            speed *= 0.98;
            if (speed < 0.05) {
                throwing = false;
                speed = 0;
            }
            const dx = hostjaX - lastHostjaX;
            const dy = hostjaY - lastHostjaY;

            const rotateX = dx * 2;
            const rotateY = dy * 2;
            const v = Math.hypot(velocityX, velocityY);
            const h = 18 * (speed / (2*v));

            pickingAnim(rotateX, rotateY, h);
            
            lastHostjaX = hostjaX;
            lastHostjaY = hostjaY;
        }

        const maxX = viewportWidth - hostja.offsetWidth * 3;
        const maxY = viewportHeight - hostja.offsetHeight * 1.5;

        hostjaX = Math.max(minX, Math.min(maxX, hostjaX));
        hostjaY = Math.max(minY, Math.min(maxY, hostjaY));
        hostjaX += Math.cos(angle) * speed;
        hostjaY += Math.sin(angle) * speed;

        moveHostja(hostjaX, hostjaY);
    }

    function changeDirection(){
        if (dragging || throwing) return;

        state = "thinking";
        setTimeout(() => {
            setRandomStat();
            state = "moving";
        }, 500 + Math.random() * 1000);
    }

    function setRandomStat() {
        angle = Math.random() * Math.PI * 2;
        speed = 0.5 + Math.random() * 2;
    }

    function loop() {
        walking();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    changeDirectionInterval = setInterval(changeDirection, 3000);

    updateCounter();

    function updateCounter() {
        if(airTimer < 1 && !head.classList.contains('visibility-hidden')){
            const rect = head.getBoundingClientRect();

            const x = rect.left;
            const y = rect.top;
            head.classList.add('visibility-hidden');

            confetti({position: { x: x + rect.width / 2, y: y + rect.height / 2 }});
        }
    }

    const onDown = (e) => {
        dragging = true;

        hostja.setPointerCapture(e.pointerId);

        offsetX = e.clientX - hostja.offsetLeft;
        offsetY = e.clientY - hostja.offsetTop;

        lastX = e.clientX;
        lastY = e.clientY;

        hostja.style.cursor = "grabbing";

        clearInterval(airInterval);

        airInterval = setInterval(() => {
            airTimer = Math.max(0, airTimer - 1);
            updateCounter();
        }, 1000);
    };

    const onMove = (e) => {
        if (!dragging) return;

        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        const minX = 0;
        const minY = 0;

        const maxX = viewportWidth - hostja.offsetWidth * 3;
        const maxY = viewportHeight - hostja.offsetHeight * 1.5;

        x = Math.max(minX, Math.min(maxX, x));
        y = Math.max(minY, Math.min(maxY, y));

        hostja.style.left = x + "px";
        hostja.style.top = y + "px";

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        const rotateX = dx * 2;
        const rotateY = dy * 2;

        pickingAnim(rotateX, rotateY);

        lastX = e.clientX;
        lastY = e.clientY;
        velocityX = dx;
        velocityY = dy;
    };

    function pickingAnim(rotateX, rotateY, height = 18){
        head.style.transform = `translateY(-${height}px)`;

        body.style.transform =
            `translateY(-${height}px) rotate(${rotateX * 0.8}deg)`;

        leftArm.style.transform =
            `translateY(-${height}px) rotate(${30 + rotateX + rotateY}deg)`;

        rightArm.style.transform =
            `translateY(-${height}px) rotate(${-30 + rotateX - rotateY}deg) scaleX(-1)`;

        leftLeg.style.transform =
            `translateY(-${height}px) rotate(${rotateX - rotateY}deg)`;

        rightLeg.style.transform =
            `translateY(-${height}px) rotate(${rotateX + rotateY}deg) scaleX(-1)`;
        
        const h = Math.max(0, Math.min(18, height));

        const scale = 1 - (h / 18) * 0.5;
        const opacity = 1 - (h / 18) * 0.6;

        shadow.style.transform = `scale(${scale})`;
        shadow.style.opacity = `${opacity}`;
    }

    const onUp = (e) => {
        dragging = false;
        hostja.style.cursor = "grab";
        throwing = true;

        hostjaX = parseFloat(hostja.style.left);
        hostjaY = parseFloat(hostja.style.top);

        speed = Math.sqrt(velocityX ** 2 + velocityY ** 2);

        angle = Math.atan2(velocityY, velocityX);

        clearInterval(airInterval);

        airInterval = setInterval(() => {
            airTimer = Math.min(maxAir, airTimer + 1);
            updateCounter();
        }, 1000);
    };

    function animateLegs() {
        const dx = hostjaX - lastHostjaX;
        const dy = hostjaY - lastHostjaY;

        const rotateX = dx * 4;
        const rotateY = dy * 4;
        
        head.style.transform = ``;
        
        shadow.style.transform = `scale(1)`;
        shadow.style.opacity = '1';

        body.style.transform =
            `rotate(${rotateX * 0.5}deg)`;

        leftArm.style.transform =
            `rotate(${30 + rotateX + rotateY}deg)`;

        rightArm.style.transform =
            `rotate(${-30 + rotateX - rotateY}deg) scaleX(-1)`;

        walkTime += 0.3 * speed;

        const moving = Math.abs(dx) + Math.abs(dy) > 0.1;

        if (!moving){
            head.style.transform = ``;
            body.style.transform = ``;
            leftLeg.style.transform = "";
            rightLeg.style.transform = "scaleX(-1)";
            
            lastHostjaX = hostjaX;
            lastHostjaY = hostjaY;
            return;
        }

        const offset = Math.cos(walkTime) * 2;

        leftLeg.style.transform = `translateY(${offset}px)`;
        rightLeg.style.transform = `translateY(${-offset}px) scaleX(-1)`;
        
        lastHostjaX = hostjaX;
        lastHostjaY = hostjaY;
    }

    hostja.addEventListener("pointerdown", onDown);
    hostja.addEventListener("pointermove", onMove);
    hostja.addEventListener("pointerup", onUp);

    return () => {
        hostja.removeEventListener("pointerdown", onDown);
        hostja.removeEventListener("pointermove", onMove);
        hostja.removeEventListener("pointerup", onUp);

        clearInterval(airInterval);
    };
}