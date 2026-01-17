/* 
  Ravi Suthar - Data Analyst Portfolio 
  Main JavaScript
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
                
                // If it's the title, animate the underline
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('in-view');
                }
                
                // If it involves counters, trigger numbers
                if (entry.target.querySelector('.stat-number')) {
                    startCounters(entry.target);
                }
                
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    // Elements to observe
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-scale, .fade-in-side, .section-title, .impact-stats');
    animatedElements.forEach(el => observer.observe(el));


    // --- 2. Smooth Scrolling for Navigation ---
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


    // --- 3. Statistic Counters Animation ---
    function startCounters(container) {
        const counters = container.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + (counter.parentElement.querySelector('.stat-icon').innerText === '👥' ? '+' : '+');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCounter();
        });
    }


    // --- 4. Custom Cursor Effect (Desktop Only) ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with delay (via CSS transition)
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
            
            // Interactive elements hover state
            const hoveredElement = document.elementFromPoint(posX, posY);
            if (hoveredElement && (
                hoveredElement.tagName === 'A' || 
                hoveredElement.tagName === 'BUTTON' ||
                hoveredElement.closest('a') ||
                hoveredElement.closest('.skill-card') ||
                hoveredElement.closest('.project-card')
            )) {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = 'var(--neon-green)';
                cursorDot.style.backgroundColor = 'transparent';
            } else {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'var(--electric-blue)';
                cursorDot.style.backgroundColor = 'var(--neon-green)';
            }
        });
    }


    // --- 5. Magnetic Buttons Effect (Optional Polish) ---
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

});
