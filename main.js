// Countdown timer — Tapa blanda: 30 de marzo 2026
(function () {
    const launchDate = new Date('2026-03-12T00:00:00').getTime();
    const section = document.querySelector('.countdown-section');
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (!daysEl) return;

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function update() {
        const now = Date.now();
        const diff = launchDate - now;

        if (diff <= 0) {
            section.classList.add('launched');
            const countdown = document.getElementById('countdown');
            if (countdown) countdown.remove();

            const msg = document.createElement('p');
            msg.className = 'countdown-launched-msg';
            msg.textContent = 'Ya disponible en tapa blanda';
            section.querySelector('.countdown-content')
                .insertBefore(msg, section.querySelector('.countdown-cta'));

            const ctaBtn = section.querySelector('.countdown-cta .btn');
            if (ctaBtn) ctaBtn.textContent = 'Comprar Ahora en Amazon';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(minutes);
        secondsEl.textContent = pad(seconds);

        requestAnimationFrame(() => setTimeout(update, 1000));
    }

    update();
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and review cards
document.querySelectorAll('.feature-card, .review-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});
