document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL VIEW REVEAL TIMING ENGINE
    const revealSections = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealSections.forEach(section => revealObserver.observe(section));

    // 2. FOOTER TARGET ELEMENT NAVIGATION
    const topButton = document.getElementById('scrollToTop');
    if (topButton) {
        topButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. INTERACTIVE LOGO TEXT GLITCH MATRIX TRIGGER
    const logoElement = document.getElementById('logoClick');
    if (logoElement) {
        const originalText = logoElement.innerText;
        const glitchChars = 'X/_[]{}*#%!@';
        let isGlitched = false;

        logoElement.addEventListener('click', (e) => {
            e.preventDefault();
            if (isGlitched) return;
            isGlitched = true;

            let iterations = 0;
            const interval = setInterval(() => {
                logoElement.innerText = originalText
                    .split("")
                    .map((char, index) => {
                        if (index < iterations) return originalText[index];
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    }).join("");

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    logoElement.innerText = originalText;
                    isGlitched = false;
                }
                iterations += 1 / 3;
            }, 30);
        });
    }

    // 4. TECH CARDS DATA-FILTER STATE HANDLERS
    const filterButtons = document.querySelectorAll('.tool-item-box');
    const projectCards = document.querySelectorAll('[data-tech]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTech = button.getAttribute('data-filter');

            if (button.classList.contains('active-pill')) {
                button.classList.remove('active-pill');
                projectCards.forEach(card => card.classList.remove('highlight-match', 'dimmed-card'));
                return;
            }

            filterButtons.forEach(btn => btn.classList.remove('active-pill'));
            button.classList.add('active-pill');

            projectCards.forEach(card => {
                const targetTechArray = card.getAttribute('data-tech').split(',');
                if (targetTechArray.includes(selectedTech)) {
                    card.classList.add('highlight-match');
                    card.classList.remove('dimmed-card');
                } else {
                    card.classList.remove('highlight-match');
                    card.classList.add('dimmed-card');
                }
            });
        });
    });

    // 5. BRUTALIST CONTACT DISPATCH VALIDATION ENGINE (image_dacda8.png)
    const dispatchForm = document.getElementById('dispatchForm');
    const formMessage = document.getElementById('formMessage');
    const formError = document.getElementById('formError');

    if (dispatchForm && formMessage && formError) {
        dispatchForm.addEventListener('submit', (e) => {
            // Trim whitespace to see if anything real was actually typed
            if (formMessage.value.trim() === "") {
                e.preventDefault(); // Stop form submission
                formError.style.display = 'block';
                formMessage.style.borderColor = '#dc2626'; // Red alert boundary line
            } else {
                formError.style.display = 'none';
                formMessage.style.borderColor = '#0f172a'; // Clear validation status
                alert('Dispatch ready for delivery pipeline simulation!');
            }
        });

        // Reset the red validation alerts instantly when user starts typing inside textarea
        formMessage.addEventListener('input', () => {
            if (formMessage.value.trim() !== "") {
                formError.style.display = 'none';
                formMessage.style.borderColor = '#0f172a';
            }
        });
    }
});