// Mobile menu toggle with accessibility
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu a');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const isActive = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isActive);
            
            // Trap focus in mobile menu when open
            if (!isActive) {
                navLinks[0].focus();
            }
        });
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }
    
    // Navbar scroll effect with hide/show
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    behavior: 'smooth',
                    top: targetPosition
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Animated counter for stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = isDecimal ? start.toFixed(1) : Math.floor(start).toLocaleString();
            }
        }, 16);
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-count'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Animate elements on scroll
    const animateObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animateObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.treatment-card, .testimonial-card, .team-member, .tech-card, .faq-item, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateObserver.observe(el);
    });
    
    // Gallery filter functionality with animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Animate gallery items
            galleryItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        if (item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }
                }, 300);
            });
        });
    });
    
    // Gallery lightbox effect
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            // Create lightbox overlay
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;
            
            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 40px;
                font-size: 40px;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
                transition: transform 0.3s ease;
            `;
            closeBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
            });
            closeBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            overlay.appendChild(lightboxImg);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            
            // Animate in
            setTimeout(() => {
                overlay.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 10);
            
            // Close lightbox on click
            const closeLightbox = () => {
                overlay.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            };
            
            overlay.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);
            
            // Close on escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    });
    
    // Contact form handling with validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('preferredDate');
        if (dateInput) {
            dateInput.setAttribute('min', today);
            
            // Set max date to 6 months from now
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 6);
            dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
        }
        
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = value;
                    } else if (value.length <= 6) {
                        value = value.slice(0, 3) + ' ' + value.slice(3);
                    } else {
                        value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
                    }
                }
                e.target.value = value;
            });
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.classList.add('error');
                    this.setCustomValidity('Please enter a valid email address');
                } else {
                    this.classList.remove('error');
                    this.setCustomValidity('');
                }
            });
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const required = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            required.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Remove error class on input
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                // Scroll to first error field
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: #28a745;
                    color: white;
                    padding: 20px 30px;
                    border-radius: 5px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 9999;
                    animation: slideIn 0.5s ease;
                `;
                successMessage.innerHTML = `
                    <strong>Success!</strong><br>
                    Thank you for your inquiry. We'll contact you within 24 hours.
                `;
                document.body.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.animation = 'slideOut 0.5s ease';
                    setTimeout(() => {
                        document.body.removeChild(successMessage);
                    }, 500);
                }, 5000);
                
                // Reset form
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Video optimization
    const videos = document.querySelectorAll('video');
    if (videos.length > 0) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
    
    // Add loading="lazy" to iframes
    document.querySelectorAll('iframe').forEach(iframe => {
        if (!iframe.hasAttribute('loading')) {
            iframe.setAttribute('loading', 'lazy');
        }
    });
    
    // Accessibility improvements
    // Skip to content functionality
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.tabIndex = -1;
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Keyboard navigation for gallery filters
    filterBtns.forEach((btn, index) => {
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
            if (e.key === 'ArrowRight' && filterBtns[index + 1]) {
                filterBtns[index + 1].focus();
            }
            if (e.key === 'ArrowLeft' && filterBtns[index - 1]) {
                filterBtns[index - 1].focus();
            }
        });
    });
    
    // Performance monitoring
    if ('PerformanceObserver' in window) {
        // Log slow resources
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 1000) {
                    console.warn('Slow resource:', entry.name, entry.duration);
                }
            }
        });
        perfObserver.observe({ entryTypes: ['resource'] });
    }
    
    // Add print styles dynamically
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
        @media print {
            .navbar, .footer, .cta-section, .btn, .hamburger, .mobile-menu {
                display: none !important;
            }
            body {
                font-size: 12pt;
                line-height: 1.5;
            }
            h1, h2, h3 {
                page-break-after: avoid;
            }
            img {
                max-width: 100%;
                page-break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(printStyles);
    
    // Cookie consent (if needed)
    const checkCookieConsent = () => {
        if (!localStorage.getItem('cookieConsent')) {
            const cookieBanner = document.createElement('div');
            cookieBanner.className = 'cookie-banner';
            cookieBanner.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #333;
                color: white;
                padding: 20px;
                text-align: center;
                z-index: 9998;
                animation: slideUp 0.5s ease;
            `;
            cookieBanner.innerHTML = `
                <p style="margin: 0 0 10px 0;">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <button id="acceptCookies" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Accept</button>
            `;
            document.body.appendChild(cookieBanner);
            
            document.getElementById('acceptCookies').addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'true');
                cookieBanner.style.animation = 'slideDown 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(cookieBanner);
                }, 500);
            });
        }
    };
    
    // Check cookie consent after page load
    setTimeout(checkCookieConsent, 2000);
});

// Add CSS animations
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(100%);
        }
    }
    
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25) !important;
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed'));
    });
}

// Page visibility API to pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations or videos
        document.querySelectorAll('video').forEach(video => video.pause());
    } else {
        // Resume animations or videos if needed
        document.querySelectorAll('video').forEach(video => {
            if (video.hasAttribute('autoplay')) {
                video.play();
            }
        });
    }
});
