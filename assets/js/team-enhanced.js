// Team Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate team members on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const teamObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Set initial state and observe
    document.querySelectorAll('.team-member').forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        teamObserver.observe(member);
    });

    // Add glow effect to photos on hover
    const photoWrappers = document.querySelectorAll('.member-photo-wrapper');
    photoWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        wrapper.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Animate specialty items on hover
    const specialtyItems = document.querySelectorAll('.specialty-item');
    specialtyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.specialty-icon');
            if (icon) {
                icon.style.animation = 'rotateIcon 0.5s';
            }
        });
        
        item.addEventListener('animationend', function(e) {
            if (e.target.classList.contains('specialty-icon')) {
                e.target.style.animation = '';
            }
        });
    });

    // Add rotation animation for icons
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotateIcon {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(15deg) scale(1.2); }
            100% { transform: rotate(0deg); }
        }
        
        .specialty-icon {
            display: inline-block;
            transition: transform 0.3s;
        }
    `;
    document.head.appendChild(style);

    // Animate title divider on load
    const titleDivider = document.querySelector('.title-divider');
    if (titleDivider) {
        setTimeout(() => {
            titleDivider.style.animation = 'expandDivider 0.8s forwards';
        }, 500);
    }

    // Add expand animation for divider
    const dividerStyle = document.createElement('style');
    dividerStyle.textContent = `
        @keyframes expandDivider {
            from {
                width: 0;
                opacity: 0;
            }
            to {
                width: 80px;
                opacity: 1;
            }
        }
        
        .title-divider {
            opacity: 0;
        }
    `;
    document.head.appendChild(dividerStyle);

    // Animate section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.style.animation = 'fadeInScale 0.8s forwards';
    }

    // Add fade in scale animation
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
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
    `;
    document.head.appendChild(fadeInStyle);

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

    // Parallax effect for page hero
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            pageHero.style.backgroundPositionY = `${parallax}px`;
        });
    }

    // Enhanced hover effect for CTA button
    const ctaButton = document.querySelector('.btn-pulse');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.animation = 'shake 0.5s';
        });
        
        ctaButton.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }

    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // Collapsible footer menu for mobile
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const collapsible = this.parentElement;
            collapsible.classList.toggle('active');
        });
    });

    console.log('✨ Team Enhanced loaded successfully!');
});