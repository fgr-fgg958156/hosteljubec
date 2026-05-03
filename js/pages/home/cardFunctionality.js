export function initCard(card, onSwipe) {
    let startX = 0;
    const gap = 60;
    const limit = 20;
    const maxDistance = 80;
    let isDragging = false;
    let isMoving = false;

    const onPointerDown = (e) => {
        if (e.target.closest('input, button')) return;
        startX = e.clientX;
        isDragging = true;
        isMoving = false;
        card.style.transition = 'none';
        card.style.opacity = '1';
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

        const opacity = Math.max(0, 1 - Math.abs(deltaX) / maxDistance);

        card.style.transform = `translateX(${deltaX}px) rotateZ(${deltaX * 0.08}deg)`;
        card.style.opacity = opacity;
    };

    const onPointerUp = (e) => {
        if (!isDragging || e.target.closest('input, button')) return;

        const deltaX = e.clientX - startX;

        card.style.transform = '';
        card.style.opacity = '1';

        if (isMoving && Math.abs(deltaX) >= gap) {
            onSwipe(deltaX > 0 ? -1 : 1);
        } else {
            card.style.transition = 'transform 0.5s ease';
            card.classList.toggle('is-flipped');
        }

        isMoving = false;
        isDragging = false;

        card.releasePointerCapture(e.pointerId);
    };

    card.addEventListener('pointerdown', onPointerDown);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerup', onPointerUp);

    return () => {
        card.removeEventListener('pointerdown', onPointerDown);
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerup', onPointerUp);
    };
}