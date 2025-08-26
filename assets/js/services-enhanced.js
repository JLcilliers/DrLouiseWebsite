// Services Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate progress bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-fill');
                if (progressBar) {
                    // Animate to different widths based on the service
                    if (entry.target.closest('#veneers')) {
                        animateProgressBar(progressBar, 25);
                    } else if (entry.target.closest('#invisalign')) {
                        animateProgressBar(progressBar, 50);
                    }
                }
                
                // Animate process steps
                const steps = entry.target.querySelectorAll('.step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('active');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe all process indicators
    document.querySelectorAll('.process-indicator').forEach(indicator => {
        progressObserver.observe(indicator);
    });

    // Animate progress bar width
    function animateProgressBar(bar, targetWidth) {
        let width = 0;
        const increment = targetWidth / 50;
        const timer = setInterval(() => {
            width += increment;
            if (width >= targetWidth) {
                width = targetWidth;
                clearInterval(timer);
            }
            bar.style.width = width + '%';
        }, 20);
    }

    // Enhanced image hover with modal preview
    const serviceImages = document.querySelectorAll('.service-image');
    serviceImages.forEach(image => {
        image.addEventListener('click', function() {
            const img = this.querySelector('img');
            createImageModal(img.src, img.alt);
        });
    });

    function createImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${src}" alt="${alt}">
                <p class="modal-caption">${alt}</p>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        document.body.appendChild(modal);
        
        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Close modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.className === 'modal-close') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }

    // Micro animations on hover
    const microAnimateElements = document.querySelectorAll('.micro-animate');
    microAnimateElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'microBounce 0.5s';
        });
        
        element.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Add micro bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes microBounce {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(10px); }
            50% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .image-modal .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .image-modal img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        
        .image-modal .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            transition: transform 0.3s;
        }
        
        .image-modal .modal-close:hover {
            transform: rotate(90deg);
        }
        
        .image-modal .modal-caption {
            text-align: center;
            color: white;
            margin-top: 1rem;
            font-size: 1.1rem;
        }
    `;
    document.head.appendChild(style);

    // Animate service cards on scroll
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        cardObserver.observe(card);
    });

    // Enhanced CTA button interaction
    const ctaButton = document.querySelector('.cta-button-enhanced');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function(e) {
            const glow = this.querySelector('.button-glow');
            if (glow) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
            }
        });
    }

    // Animate highlight text on load
    const highlights = document.querySelectorAll('.highlight-text');
    highlights.forEach((highlight, index) => {
        setTimeout(() => {
            highlight.style.animation = 'fadeInScale 0.6s forwards';
        }, index * 200);
    });

    // Add fade in scale animation
    const fadeInScaleStyle = document.createElement('style');
    fadeInScaleStyle.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .highlight-text {
            opacity: 0;
        }
    `;
    document.head.appendChild(fadeInScaleStyle);

    // Treatment combo hover effects
    const treatmentCombos = document.querySelectorAll('.treatment-combo');
    treatmentCombos.forEach(combo => {
        combo.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.combo-icon');
            if (icon) {
                icon.style.animation = 'spin 0.5s';
            }
        });
        
        combo.addEventListener('animationend', function(e) {
            if (e.target.classList.contains('combo-icon')) {
                e.target.style.animation = '';
            }
        });
    });

    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update current year in footer
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    console.log('✨ Services Enhanced loaded successfully!');
});