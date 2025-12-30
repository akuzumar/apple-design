window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    // Logic for Hero Reveal
    const h1 = document.querySelector('.reveal-h1');
    const laptop = document.querySelector('.main-laptop');

    if (scroll > 100) {
        h1.style.opacity = "1";
        h1.style.transform = "scale(1)";
        laptop.style.transform = "translateY(0)";
    }

    // Logic for Screen Perspective
    const screen = document.querySelector('.screen-frame');
    if (screen) {
        const rect = screen.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            let rotation = 15 - (scroll * 0.02);
            if (rotation < 0) rotation = 0;
            screen.style.transform = `rotateX(${rotation}deg)`;
        }
    }
});