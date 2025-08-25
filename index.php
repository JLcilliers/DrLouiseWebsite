<?php get_header(); ?>

<!-- Hero Section -->
<section id="home" class="hero">
    <?php 
    $hero_video = get_theme_mod('hero_video', get_template_directory_uri() . '/assets/videos/cosmetic-dental.mp4');
    if ($hero_video): 
    ?>
    <video class="hero-video-bg" autoplay muted loop playsinline>
        <source src="<?php echo esc_url($hero_video); ?>" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <?php endif; ?>
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <h1><?php echo get_theme_mod('hero_title', 'Welcome to Cosmetic Dental'); ?></h1>
        <p><?php echo get_theme_mod('hero_subtitle', 'Cape Town\'s premier clinic for advanced digital and cosmetic dentistry'); ?></p>
        <a href="#contact" class="btn btn-primary"><?php echo get_theme_mod('hero_button_text', 'Book Consultation'); ?></a>
    </div>
</section>

<!-- About Section -->
<section id="about" class="about">
    <div class="container">
        <h2><?php echo get_theme_mod('about_title', 'About Us'); ?></h2>
        <div class="about-content">
            <?php 
            $about_content = get_theme_mod('about_content', 'Welcome to Cosmetic Dental, Cape Town\'s premier clinic for advanced digital and cosmetic dentistry...');
            echo wpautop($about_content);
            ?>
        </div>
    </div>
</section>

<!-- Treatments Section -->
<section id="treatments" class="treatments">
    <div class="container">
        <h2><?php echo get_theme_mod('treatments_title', 'Treatments Offered'); ?></h2>
        <div class="treatments-grid">
            <?php
            $treatments = get_theme_mod('treatments_list', array());
            if (empty($treatments)) {
                // Default treatments
                $treatments = array(
                    array('title' => 'General Dentistry', 'description' => 'Comprehensive dental care including check-ups, cleanings, and preventive treatments'),
                    array('title' => 'Cosmetic Dentistry', 'description' => 'Transform your smile with veneers, bonding, whitening, and digital smile design'),
                    array('title' => 'Restorative Dentistry', 'description' => 'Crowns, bridges, and full mouth rehabilitation to restore function and aesthetics'),
                    array('title' => 'Implant Dentistry', 'description' => 'Permanent tooth replacement with advanced digital implant protocols'),
                    array('title' => 'Endodontics', 'description' => 'Root canal therapy using advanced techniques for comfortable treatment'),
                    array('title' => 'Aligner Orthodontics', 'description' => 'Clear aligner therapy for discreet teeth straightening'),
                    array('title' => 'Facial Aesthetics', 'description' => 'Enhance your natural beauty with professional facial aesthetic treatments'),
                    array('title' => 'Sleep Medicine', 'description' => 'Solutions for sleep apnea and snoring for better rest and health')
                );
            }
            
            foreach ($treatments as $treatment):
            ?>
            <div class="treatment-card">
                <div class="treatment-icon">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35 20C35 20 40 10 50 10C60 10 65 20 65 20L65 70C65 75 60 80 50 80C40 80 35 75 35 70Z" stroke="white" stroke-width="3"/>
                        <path d="M35 40C30 40 25 35 25 30" stroke="white" stroke-width="2"/>
                        <path d="M65 40C70 40 75 35 75 30" stroke="white" stroke-width="2"/>
                    </svg>
                </div>
                <h3><?php echo esc_html($treatment['title']); ?></h3>
                <p><?php echo esc_html($treatment['description']); ?></p>
                <a href="#" class="learn-more">Learn More →</a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section id="testimonials" class="testimonials">
    <div class="container">
        <h2><?php echo get_theme_mod('testimonials_title', 'Testimonials'); ?></h2>
        <div class="testimonials-grid">
            <?php
            $testimonials = get_theme_mod('testimonials_list', array());
            if (empty($testimonials)) {
                // Default testimonials
                $testimonials = array(
                    array('name' => 'Lauren J', 'content' => 'Ever since I was 14, after my front teeth fell out and appointments I had teeth that were breaking, chipping breaking cosmetic surgery and still could not find the solution. After a dentist told me I needed full extractions, I found Dr Louis, who not only saved my natural teeth but also gave me the function I was missing. Best smile and dentist I could have ever dreamed to have!'),
                    array('name' => 'A Secrist', 'content' => 'Having a retired dentist father I\'ve had my fair share of dentistry experience and I have lost my fair share of teeth as a substitute of the failure treatment process and Dr Louis surpasses all my expectations, not only he has the case but also results. I generally can\'t recommend him enough. He has taken on fully trust in him!'),
                    array('name' => 'P Holtzhauzen', 'content' => 'I am over the moon! Best decision of my life I have such an amazing smile! Dr Louis to my one of the kind colleague and most talented persons I know. Just amazing what he does to your teeth. I feel myself confident and can smile with confidence. All the staff is so helpful in solving the most treated with the creative detail and followed by the aspects. He lets kept me informed thought my entire treatment plan. I highly recommend Dr Louis to any one who is in need of dental work. To Louis thank you so much for my life changing smile!')
                );
            }
            
            foreach ($testimonials as $testimonial):
            ?>
            <div class="testimonial-card">
                <h3><?php echo esc_html($testimonial['name']); ?></h3>
                <p>"<?php echo esc_html($testimonial['content']); ?>"</p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Team Section -->
<section id="team" class="team">
    <div class="container">
        <h2><?php echo get_theme_mod('team_title', 'Our Team'); ?></h2>
        <div class="team-grid">
            <?php
            $team_members = get_theme_mod('team_members', array());
            if (empty($team_members)) {
                // Default team members
                $team_members = array(
                    array('name' => 'Dr Louis Trichardt', 'position' => 'Principal Dentist & Director', 'image' => get_template_directory_uri() . '/assets/images/louis.jpg'),
                    array('name' => 'Kayleigh Cheketri', 'position' => 'Dental Professional', 'image' => get_template_directory_uri() . '/assets/images/kayleigh.jpg'),
                    array('name' => 'Wilmarie Kriel', 'position' => 'Administrative Manager', 'image' => get_template_directory_uri() . '/assets/images/wilmarie.jpg'),
                    array('name' => 'Buhle December', 'position' => 'Treatment Coordinator & Dental Nurse', 'image' => get_template_directory_uri() . '/assets/images/buhle.jpg')
                );
            }
            
            foreach ($team_members as $member):
            ?>
            <div class="team-member">
                <img src="<?php echo esc_url($member['image']); ?>" alt="<?php echo esc_attr($member['name']); ?>">
                <h3><?php echo esc_html($member['name']); ?></h3>
                <p><?php echo esc_html($member['position']); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Technology Section -->
<section id="technology" class="technology">
    <div class="container">
        <h2><?php echo get_theme_mod('technology_title', 'Advanced Technology'); ?></h2>
        <div class="tech-grid">
            <?php
            $technologies = get_theme_mod('technologies_list', array());
            if (empty($technologies)) {
                // Default technologies
                $technologies = array(
                    array('title' => '3Shape Trios 5 Intraoral Scanner', 'description' => 'State-of-the-art wireless intraoral scanner that transforms how we capture digital impressions, eliminating messy molds for a more comfortable and hygienic experience.'),
                    array('title' => 'Vatech Smart X CBCT', 'description' => 'High-resolution 3D imaging system providing detailed views of teeth, jawbone, nerves, and sinuses for superior diagnostics and treatment planning.'),
                    array('title' => 'Woodpecker PT-B', 'description' => 'Innovative all-in-one ultrasonic scaler and air polisher for advanced biofilm removal, making professional cleanings more effective and gentle.')
                );
            }
            
            foreach ($technologies as $tech):
            ?>
            <div class="tech-card">
                <h3><?php echo esc_html($tech['title']); ?></h3>
                <p><?php echo esc_html($tech['description']); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Smile Gallery Section -->
<section id="gallery" class="gallery">
    <div class="container">
        <h2><?php echo get_theme_mod('gallery_title', 'Smile Gallery'); ?></h2>
        <div class="gallery-grid">
            <?php
            $gallery_images = get_theme_mod('gallery_images', array());
            if (empty($gallery_images)) {
                // Default gallery images
                for ($i = 1; $i <= 6; $i++) {
                    $gallery_images[] = get_template_directory_uri() . '/assets/images/' . $i . '.jpg';
                }
            }
            
            foreach ($gallery_images as $index => $image):
            ?>
            <div class="gallery-item">
                <img src="<?php echo esc_url($image); ?>" alt="Smile Transformation <?php echo $index + 1; ?>">
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="contact">
    <div class="container">
        <h2><?php echo get_theme_mod('contact_title', 'Contact Us'); ?></h2>
        <div class="contact-content">
            <div class="contact-info">
                <h3>Contact Info</h3>
                <div class="info-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L12 13L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <a href="mailto:<?php echo get_theme_mod('contact_email', 'reception@cosmeticdental.co.za'); ?>"><?php echo get_theme_mod('contact_email', 'reception@cosmeticdental.co.za'); ?></a>
                </div>
                <div class="info-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <a href="tel:<?php echo get_theme_mod('contact_phone', '0214243148'); ?>"><?php echo get_theme_mod('contact_phone', '021 424 3148'); ?></a>
                </div>
                <div class="info-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.657 16.657L13.414 20.9C13.039 21.276 12.53 21.479 12.001 21.479C11.468 21.479 10.957 21.273 10.586 20.9L6.343 16.657C5.897 16.211 5.226 15.426 4.734 14.726C3.658 13.199 3 11.388 3 9.5C3 5.91 5.91 3 9.5 3C11.388 3 13.181 3.658 14.707 4.734C15.407 5.226 16.211 5.897 16.657 6.343L21 10.586L16.657 14.929M12 9.5C12 8.119 10.881 7 9.5 7C8.119 7 7 8.119 7 9.5C7 10.881 8.119 12 9.5 12C10.881 12 12 10.881 12 9.5Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <address><?php echo get_theme_mod('contact_address', '502 Earlgo Building, Park Road, Gardens'); ?></address>
                </div>
                <div class="info-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span><?php echo get_theme_mod('contact_hours', 'Monday - Friday<br>8:00 AM - 5:00 PM'); ?></span>
                </div>
                
                <a href="#" class="btn btn-outline">Get Directions</a>
                
                <p class="parking-info"><?php echo get_theme_mod('parking_info', 'Parking: Patients are to park at the Lifestyle on Kloof Mall and Cosmetic Dental will validate the parking in the office.'); ?></p>
            </div>
            
            <div class="contact-form">
                <h3>Get in Touch</h3>
                <p>Schedule your appointment or ask us anything – we're here to answer your smile queries.</p>
                
                <?php echo do_shortcode('[contact-form-7 id="1" title="Contact form 1"]'); ?>
            </div>
        </div>
        
        <div class="whatsapp-cta">
            <p>Add WhatsApp nr: <?php echo get_theme_mod('whatsapp_number', '0614043080'); ?></p>
        </div>
    </div>
</section>

<?php get_footer(); ?>
