import { t } from "../../language/languageController.js";
import { dataSettings } from "../../utils/storage.js";

export function initCard(card, onSwipe) {
    const indicator = card.querySelector('.swipe-indicator');
    let startX = 0;
    const gap = 60;
    const limit = 20;
    const maxDistance = 100;
    let isDragging = false;
    let isMoving = false;

    const onPointerDown = (e) => {
        if (e.target.closest('input, button')) return;
        window.getSelection()?.removeAllRanges();

        startX = e.clientX;
        isDragging = true;
        isMoving = false;
        card.style.transition = 'none';
        card.style.opacity = '1';
        card.style.borderColor = 'var(--border-colour)';
        card.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (e.target.closest('input, button')) return;
        if (!isDragging) return;
        e.preventDefault();

        let deltaX = e.clientX - startX;

        if (Math.abs(deltaX) > 10)
            isMoving = true;

        if (Math.abs(deltaX) > limit)
            deltaX = (deltaX > 0 ? 1 : -1) * (limit + (Math.abs(deltaX) - limit) * 0.3);

        const { isRandom, learningMode } = dataSettings();

        if (learningMode && isRandom && indicator) {
            const progress = Math.min(1, Math.abs(deltaX) / maxDistance);

            if (Math.abs(deltaX) > 20) {
                indicator.textContent = deltaX > 0 ? t('know') : t('learning');
                indicator.style.opacity = progress;

                indicator.style.color = deltaX > 0
                    ? 'rgb(153, 241, 205)'
                    : 'rgb(255, 147, 70)';
            } else {
                indicator.style.opacity = '0';
            }
            const shadowProgress = Math.min(0.3, Math.abs(deltaX) / maxDistance);

            let colour = deltaX > 0
                ? `rgba(153, 241, 205, ${progress})`
                : `rgba(255, 147, 70, ${progress})`;
            let shadowColour = deltaX > 0
                ? `rgba(153, 241, 205, ${shadowProgress})`
                : `rgba(255, 147, 70, ${shadowProgress})`;

            card.style.borderColor = colour;
            card.style.boxShadow = `0 0 0 4px ${shadowColour}`;
        }

        card.style.transform = `translateX(${deltaX}px) rotateZ(${deltaX * 0.06}deg)`;
    };

    const onPointerUp = (e) => {
        if (!isDragging || e.target.closest('input, button')) return;

        const deltaX = e.clientX - startX;

        card.style.opacity = '1';
        card.style.borderColor = 'var(--border-colour)';
        card.style.boxShadow = 'none';
        indicator.style.opacity = '0';

        if (isMoving) {
            card.classList.remove('is-flipped');
            if (Math.abs(deltaX) >= gap) {
                const direction = deltaX > 0 ? 1 : -1;
                card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                card.style.transform = `translateX(${direction * 500}px) rotateZ(${direction * 20}deg)`;
                card.style.opacity = '0';
                setTimeout(() => {
                    onSwipe(direction > 0 ? -1 : 1);
                    card.style.transition = 'none';
                    card.style.transform = 'scale(0.98)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            startResizeAnimation();
                        });
                    });
                }, 400);
            } else {
                card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                card.style.transform = 'translateX(0) rotateZ(0)';
            }
        } else {
            card.style.transition = 'transform 0.8s cubic-bezier(.2,.8,.2,1)';
            card.classList.toggle('is-flipped');
            card.style.transform = '';
        }

        isMoving = false;
        isDragging = false;

        card.releasePointerCapture(e.pointerId);
    };

    function startResizeAnimation(){
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
    }

    card.addEventListener('pointerdown', onPointerDown);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerup', onPointerUp);

    return () => {
        card.removeEventListener('pointerdown', onPointerDown);
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerup', onPointerUp);
    };
}