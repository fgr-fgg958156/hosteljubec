import { t } from "../../language/languageController.js";

export function initErrorPage() {
    let airTimer = 10;
    const maxAir = 10;
    let airInterval = null;

    const counter = document.querySelector(".air-counter");
    const hostja = document.getElementById("hostja");

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

    let lastX = 0;
    let lastY = 0;

    updateCounter();

    function updateCounter() {
        counter.textContent = airTimer + " " + t('sec');
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

        head.style.transform = `translateY(-18px)`;

        body.style.transform =
            `translateY(-18px) rotate(${rotateX * 0.8}deg)`;

        leftArm.style.transform =
            `translateY(-18px) rotate(${30 + rotateX + rotateY}deg)`;

        rightArm.style.transform =
            `translateY(-18px) rotate(${-30 + rotateX - rotateY}deg) scaleX(-1)`;

        leftLeg.style.transform =
            `translateY(-18px) rotate(${rotateX - rotateY}deg)`;

        rightLeg.style.transform =
            `translateY(-18px) rotate(${rotateX + rotateY}deg) scaleX(-1)`;

        shadow.style.transform = `scale(0.9)`;
        shadow.style.opacity = "0.5";

        lastX = e.clientX;
        lastY = e.clientY;
    };

    const onUp = () => {
        dragging = false;
        hostja.style.cursor = "grab";

        head.style.transform = "";
        body.style.transform = "";

        leftArm.style.transform = "rotate(30deg)";
        rightArm.style.transform = "rotate(-30deg) scaleX(-1)";

        leftLeg.style.transform = "";
        rightLeg.style.transform = "scaleX(-1)";

        shadow.style.transform = "";
        shadow.style.opacity = "1";

        clearInterval(airInterval);

        airInterval = setInterval(() => {
            airTimer = Math.min(maxAir, airTimer + 1);
            updateCounter();
        }, 1000);
    };

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