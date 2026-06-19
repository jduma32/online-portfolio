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

    dispatchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(dispatchForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });

            const result = await response.json();
            if (result.success) {
                alert("Dispatch successful! Message received.");
                dispatchForm.reset();
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Network error. Please check your connection.");
        }
    });