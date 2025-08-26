// Modern Dental Website - Enhanced JavaScript
// Version: 3.0

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Footer Functionality
    initializeEnhancedFooter();
    
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('.stat-number');
                    if (counter && !counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stat-item');
    animatedElements.forEach(el => observer.observe(el));

    // Counter Animation Function
    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                // Handle decimal numbers
                if (target % 1 !== 0) {
                    element.textContent = target.toFixed(1);
                } else {
                    element.textContent = Math.floor(target).toLocaleString();
                }
            }
        };
        
        updateCounter();
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Hero Text Animation - Disabled to prevent text wrapping
    // const heroTitle = document.querySelector('.hero-content h1');
    // if (heroTitle) {
    //     const text = heroTitle.textContent;
    //     heroTitle.textContent = '';
    //     heroTitle.style.opacity = '1';
    //     
    //     // Split text into spans
    //     text.split('').forEach((char, index) => {
    //         const span = document.createElement('span');
    //         span.textContent = char === ' ' ? '\u00A0' : char;
    //         span.style.display = 'inline-block';
    //         span.style.animation = `fadeInUp 0.5s ${index * 0.02}s forwards`;
    //         span.style.opacity = '0';
    //         heroTitle.appendChild(span);
    //     });
    // }

    // Parallax Effect for Hero Video
    const heroVideo = document.querySelector('.hero-video-bg');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroVideo.style.transform = `translate(-50%, calc(-50% + ${parallax}px))`;
        });
    }

    // Treatment Items Hover Effect
    const treatmentItems = document.querySelectorAll('.treatment-item');
    treatmentItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Add styles
            lightbox.style.cssText = `
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
            
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.className === 'lightbox-close') {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        lightbox.remove();
                    }, 300);
                }
            });
        });
    });

    // Form Validation Enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = '✓ Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #4de5e5 0%, #6ffbfb 100%)';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    });

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.padding = '0 0';
                }
            });
            
            // Toggle current FAQ item
            faqItem.classList.toggle('active');
            if (faqItem.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                faqAnswer.style.padding = '1.5rem 0';
            } else {
                faqAnswer.style.maxHeight = '0';
                faqAnswer.style.padding = '0 0';
            }
        });
    });

    // Collapsible Footer Menu for Mobile
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const collapsible = this.parentElement;
            collapsible.classList.toggle('active');
        });
    });

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4de5e5 0%, #6ffbfb 100%);
        border: none;
        border-radius: 50%;
        color: #1a4d4d;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(77, 229, 229, 0.4);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(100px)';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to back to top button
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    // Preloader (optional)
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Dynamic Copyright Year
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Console Easter Egg
    console.log('%c🦷 Welcome to Cosmetic Dental Cape Town! 🦷', 
                'color: #4de5e5; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%cLooking for a beautiful smile? Book your consultation today!', 
                'color: #1a4d4d; font-size: 14px;');
});

// Enhanced Footer Functionality
function initializeEnhancedFooter() {
    // Add footer-js-loaded class to indicate JavaScript is active
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.classList.add('footer-js-loaded');
    }
    
    // Enhanced collapsible functionality with smooth animations
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const collapsible = this.parentElement;
            const content = collapsible.querySelector('.collapsible-content');
            const arrow = this.querySelector('span:last-child');
            
            // Toggle active class
            collapsible.classList.toggle('active');
            
            if (collapsible.classList.contains('active')) {
                // Open: Set max-height to scrollHeight
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingTop = '20px';
                content.style.paddingBottom = '20px';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                // Close: Set max-height to 0
                content.style.maxHeight = '0';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Enhanced social media link interactions
    const socialLinks = document.querySelectorAll('.social-links-footer a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Make phone numbers and email addresses clickable
    const phoneNumbers = document.querySelectorAll('.footer-contact-info a[href^="tel:"]');
    const emailAddresses = document.querySelectorAll('.footer-contact-info a[href^="mailto:"]');
    
    // Add visual feedback for clickable elements
    [...phoneNumbers, ...emailAddresses].forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textDecoration = 'underline';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textDecoration = 'none';
        });
    });
    
    // Footer CTA button interactions
    const ctaButtons = document.querySelectorAll('.footer-cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Update copyright year dynamically
    const yearSpans = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearSpans.forEach(span => {
        span.textContent = currentYear;
    });
    
    console.log('✨ Enhanced footer functionality initialized');
}

// Page Performance Monitor
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
        
        // Send to analytics if needed
        if (window.gtag) {
            gtag('event', 'timing_complete', {
                'name': 'load',
                'value': pageLoadTime,
                'event_category': 'Performance'
            });
        }
    });
}