document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.centered-div');

    let startX, startY, currentX, currentY, offsetX, offsetY;

    cards.forEach(card => {
        card.addEventListener('mousedown', startDragging);
        card.addEventListener('touchstart', startDragging);

        function startDragging(event) {
            if (event.type === 'touchstart') {
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
            } else {
                startX = event.clientX;
                startY = event.clientY;
                document.addEventListener('mousemove', dragCard);
                document.addEventListener('mouseup', stopDragging);
            }

            currentX = startX;
            currentY = startY;

            card.style.transition = 'none';
            card.addEventListener('touchmove', dragCard);
            card.addEventListener('touchend', stopDragging);
        }

        function dragCard(event) {
            if (event.type === 'touchmove') {
                currentX = event.touches[0].clientX;
                currentY = event.touches[0].clientY;
            } else {
                currentX = event.clientX;
                currentY = event.clientY;
            }

            offsetX = currentX - startX;
            offsetY = currentY - startY;

            card.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX / 10}deg)`;
        }

        function stopDragging() {
            const isMoved = Math.abs(offsetX) > 100 || Math.abs(offsetY) > 100;

            if (isMoved) {
                card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                card.style.transform = `translate(${offsetX * 3}px, ${offsetY * 3}px) rotate(${offsetX / 10}deg)`;
                card.style.opacity = '0';

                card.addEventListener('transitionend', () => {
                    card.remove();
                    const nextCard = document.querySelector('.centered-div');
                    if (nextCard) {
                        nextCard.style.transform = 'none';
                        nextCard.style.opacity = '1';
                    }
                });
            } else {
                card.style.transition = 'transform 0.3s ease';
                card.style.transform = 'none';
            }

            document.removeEventListener('mousemove', dragCard);
            document.removeEventListener('mouseup', stopDragging);
            card.removeEventListener('touchmove', dragCard);
            card.removeEventListener('touchend', stopDragging);
        }
    });
});
