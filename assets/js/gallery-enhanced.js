// Gallery Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Stagger animation
                    setTimeout(() => {
                        item.style.animation = 'fadeIn 0.6s forwards';
                    }, index * 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery Lightbox
    const galleryImages = document.querySelectorAll('.gallery-image-wrapper');
    
    galleryImages.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            const caption = this.nextElementSibling.textContent;
            createLightbox(img.src, img.alt, caption);
        });
    });

    function createLightbox(src, alt, caption) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${src}" alt="${alt}">
                <p class="lightbox-caption">${caption}</p>
            </div>
        `;
        
        // Add styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        document.body.appendChild(lightbox);
        
        // Fade in
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
    }

    // Add lightbox styles
    const lightboxStyle = document.createElement('style');
    lightboxStyle.textContent = `
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        }
        
        .lightbox img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2.5rem;
            cursor: pointer;
            transition: transform 0.3s;
            z-index: 10001;
        }
        
        .lightbox-close:hover {
            transform: rotate(90deg);
        }
        
        .lightbox-caption {
            text-align: center;
            color: white;
            margin-top: 1rem;
            font-size: 1.2rem;
            font-weight: 300;
        }
    `;
    document.head.appendChild(lightboxStyle);

    // Animate gallery items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const galleryObserver = new IntersectionObserver(function(entries) {
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
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        galleryObserver.observe(item);
    });

    // Treatment descriptions animation
    const treatmentDescs = document.querySelectorAll('.treatment-desc');
    
    const descObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    treatmentDescs.forEach(desc => {
        desc.style.opacity = '0';
        desc.style.transform = 'translateY(20px)';
        desc.style.transition = 'all 0.6s';
        descObserver.observe(desc);
    });

    // Enhanced hover effect for CTA button
    const ctaButton = document.querySelector('.btn-pulse');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = this.querySelector('::before');
            if (ripple) {
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
            }
        });
    }

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

    console.log('✨ Gallery Enhanced loaded successfully!');
});