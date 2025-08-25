    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <?php 
                    $logo = get_theme_mod('custom_logo');
                    if ($logo) {
                        $logo_img = wp_get_attachment_image_src($logo, 'full');
                        echo '<img src="' . esc_url($logo_img[0]) . '" alt="' . get_bloginfo('name') . '">';
                    } else {
                        echo '<img src="' . get_template_directory_uri() . '/assets/images/logo-white.png" alt="' . get_bloginfo('name') . '">';
                    }
                    ?>
                </div>
                
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#treatments">General Dentistry</a></li>
                            <li><a href="#treatments">Cosmetic Dentistry</a></li>
                            <li><a href="#treatments">Restorative Dentistry</a></li>
                            <li><a href="#treatments">Implant Dentistry</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Follow Us</h4>
                        <ul>
                            <li><a href="<?php echo get_theme_mod('instagram_url', '#'); ?>">Instagram</a></li>
                            <li><a href="<?php echo get_theme_mod('linkedin_url', '#'); ?>">LinkedIn</a></li>
                            <li><a href="<?php echo get_theme_mod('whatsapp_url', '#'); ?>">WhatsApp</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Opening Hours</h4>
                        <ul>
                            <li>Monday - Friday</li>
                            <li>8:00 AM - 5:00 PM</li>
                            <li>Saturday - Sunday</li>
                            <li>Closed</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
