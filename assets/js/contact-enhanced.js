// Contact Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Form Validation and Interaction
    const form = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.form-input');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add input validation feedback
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        });
    });

    // Form submission with animation
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state to button
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = '✓ Request Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #4de5e5 0%, #6ffbfb 100%)';
                
                // Show success message
                showSuccessMessage();
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    inputs.forEach(input => {
                        input.classList.remove('valid', 'invalid');
                    });
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✓</span>
                <h3>Thank You!</h3>
                <p>We've received your appointment request and will contact you within 24 hours.</p>
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            animation: slideIn 0.5s;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOut 0.5s';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 3000);
    }

    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
        
        .success-content {
            max-width: 400px;
        }
        
        .success-icon {
            display: inline-block;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #4de5e5 0%, #6ffbfb 100%);
            color: white;
            border-radius: 50%;
            font-size: 2rem;
            line-height: 60px;
            margin-bottom: 1rem;
        }
        
        .success-content h3 {
            color: #1a4d4d;
            margin-bottom: 0.5rem;
        }
        
        .success-content p {
            color: #666;
        }
        
        .form-input.valid {
            border-color: #4de5e5;
        }
        
        .form-input.invalid {
            border-color: #ff6b6b;
        }
    `;
    document.head.appendChild(animationStyle);

    // Set minimum date to today for date picker
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Animate expect items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const expectObserver = new IntersectionObserver(function(entries) {
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
    document.querySelectorAll('.expect-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        expectObserver.observe(item);
    });

    // Enhanced hover effect for info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon');
            if (icon) {
                icon.style.animation = 'rotate 0.5s';
            }
        });
        
        item.addEventListener('animationend', function(e) {
            if (e.target.classList.contains('icon')) {
                e.target.style.animation = '';
            }
        });
    });

    // Add rotation animation
    const rotateStyle = document.createElement('style');
    rotateStyle.textContent = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(rotateStyle);

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

    // Collapsible footer menu for mobile
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const collapsible = this.parentElement;
            collapsible.classList.toggle('active');
        });
    });

    console.log('✨ Contact Enhanced loaded successfully!');
});