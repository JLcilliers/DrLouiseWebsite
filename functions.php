<?php
// Theme setup
function cosmetic_dental_setup() {
    // Add theme support for various features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'cosmetic-dental'),
    ));
}
add_action('after_setup_theme', 'cosmetic_dental_setup');

// Enqueue styles and scripts
function cosmetic_dental_scripts() {
    wp_enqueue_style('cosmetic-dental-style', get_stylesheet_uri());
    wp_enqueue_script('cosmetic-dental-script', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'cosmetic_dental_scripts');

// Fallback menu function
function cosmetic_dental_fallback_menu() {
    echo '<ul class="nav-menu">
        <li><a href="#treatments">Treatments</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#team">Our Team</a></li>
        <li><a href="#technology">Technology</a></li>
        <li><a href="#gallery">Smile Gallery</a></li>
        <li><a href="#contact">Contact Us</a></li>
    </ul>';
}

// Customizer settings
function cosmetic_dental_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('hero_section', array(
        'title' => __('Hero Section', 'cosmetic-dental'),
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('hero_title', array(
        'default' => 'Welcome to Cosmetic Dental',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_title', array(
        'label' => __('Hero Title', 'cosmetic-dental'),
        'section' => 'hero_section',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('hero_subtitle', array(
        'default' => 'Cape Town\'s premier clinic for advanced digital and cosmetic dentistry',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_subtitle', array(
        'label' => __('Hero Subtitle', 'cosmetic-dental'),
        'section' => 'hero_section',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('hero_button_text', array(
        'default' => 'Book Consultation',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_button_text', array(
        'label' => __('Hero Button Text', 'cosmetic-dental'),
        'section' => 'hero_section',
        'type' => 'text',
    ));
    
    // About Section
    $wp_customize->add_section('about_section', array(
        'title' => __('About Section', 'cosmetic-dental'),
        'priority' => 31,
    ));
    
    $wp_customize->add_setting('about_title', array(
        'default' => 'About Us',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('about_title', array(
        'label' => __('About Title', 'cosmetic-dental'),
        'section' => 'about_section',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('about_content', array(
        'default' => 'Welcome to Cosmetic Dental, Cape Town\'s premier clinic for advanced digital and cosmetic dentistry...',
        'sanitize_callback' => 'wp_kses_post',
    ));
    
    $wp_customize->add_control('about_content', array(
        'label' => __('About Content', 'cosmetic-dental'),
        'section' => 'about_section',
        'type' => 'textarea',
    ));
    
    // Contact Section
    $wp_customize->add_section('contact_section', array(
        'title' => __('Contact Information', 'cosmetic-dental'),
        'priority' => 32,
    ));
    
    $wp_customize->add_setting('contact_email', array(
        'default' => 'reception@cosmeticdental.co.za',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    $wp_customize->add_control('contact_email', array(
        'label' => __('Contact Email', 'cosmetic-dental'),
        'section' => 'contact_section',
        'type' => 'email',
    ));
    
    $wp_customize->add_setting('contact_phone', array(
        'default' => '021 424 3148',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('contact_phone', array(
        'label' => __('Contact Phone', 'cosmetic-dental'),
        'section' => 'contact_section',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('contact_address', array(
        'default' => '502 Earlgo Building, Park Road, Gardens',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('contact_address', array(
        'label' => __('Contact Address', 'cosmetic-dental'),
        'section' => 'contact_section',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('whatsapp_number', array(
        'default' => '0614043080',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('whatsapp_number', array(
        'label' => __('WhatsApp Number', 'cosmetic-dental'),
        'section' => 'contact_section',
        'type' => 'text',
    ));
    
    // Social Media
    $wp_customize->add_section('social_media', array(
        'title' => __('Social Media', 'cosmetic-dental'),
        'priority' => 33,
    ));
    
    $wp_customize->add_setting('instagram_url', array(
        'default' => '#',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('instagram_url', array(
        'label' => __('Instagram URL', 'cosmetic-dental'),
        'section' => 'social_media',
        'type' => 'url',
    ));
    
    $wp_customize->add_setting('linkedin_url', array(
        'default' => '#',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('linkedin_url', array(
        'label' => __('LinkedIn URL', 'cosmetic-dental'),
        'section' => 'social_media',
        'type' => 'url',
    ));
}
add_action('customize_register', 'cosmetic_dental_customize_register');

// Widget areas
function cosmetic_dental_widgets_init() {
    register_sidebar(array(
        'name' => __('Sidebar', 'cosmetic-dental'),
        'id' => 'sidebar-1',
        'description' => __('Add widgets here.', 'cosmetic-dental'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
}
add_action('widgets_init', 'cosmetic_dental_widgets_init');

// Custom post types for treatments, team members, etc.
function cosmetic_dental_custom_post_types() {
    // Treatments
    register_post_type('treatments', array(
        'labels' => array(
            'name' => __('Treatments', 'cosmetic-dental'),
            'singular_name' => __('Treatment', 'cosmetic-dental'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-heart',
    ));
    
    // Team Members
    register_post_type('team', array(
        'labels' => array(
            'name' => __('Team Members', 'cosmetic-dental'),
            'singular_name' => __('Team Member', 'cosmetic-dental'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-groups',
    ));
    
    // Testimonials
    register_post_type('testimonials', array(
        'labels' => array(
            'name' => __('Testimonials', 'cosmetic-dental'),
            'singular_name' => __('Testimonial', 'cosmetic-dental'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-format-quote',
    ));
}
add_action('init', 'cosmetic_dental_custom_post_types');

// Add meta boxes for custom fields
function cosmetic_dental_add_meta_boxes() {
    add_meta_box(
        'team_member_position',
        __('Position', 'cosmetic-dental'),
        'cosmetic_dental_team_position_callback',
        'team'
    );
    
    add_meta_box(
        'testimonial_author',
        __('Author Name', 'cosmetic-dental'),
        'cosmetic_dental_testimonial_author_callback',
        'testimonials'
    );
}
add_action('add_meta_boxes', 'cosmetic_dental_add_meta_boxes');

function cosmetic_dental_team_position_callback($post) {
    wp_nonce_field('cosmetic_dental_save_meta_box_data', 'cosmetic_dental_meta_box_nonce');
    $value = get_post_meta($post->ID, '_team_position', true);
    echo '<input type="text" id="team_position" name="team_position" value="' . esc_attr($value) . '" size="25" />';
}

function cosmetic_dental_testimonial_author_callback($post) {
    wp_nonce_field('cosmetic_dental_save_meta_box_data', 'cosmetic_dental_meta_box_nonce');
    $value = get_post_meta($post->ID, '_testimonial_author', true);
    echo '<input type="text" id="testimonial_author" name="testimonial_author" value="' . esc_attr($value) . '" size="25" />';
}

function cosmetic_dental_save_meta_box_data($post_id) {
    if (!isset($_POST['cosmetic_dental_meta_box_nonce'])) {
        return;
    }
    
    if (!wp_verify_nonce($_POST['cosmetic_dental_meta_box_nonce'], 'cosmetic_dental_save_meta_box_data')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (isset($_POST['team_position'])) {
        update_post_meta($post_id, '_team_position', sanitize_text_field($_POST['team_position']));
    }
    
    if (isset($_POST['testimonial_author'])) {
        update_post_meta($post_id, '_testimonial_author', sanitize_text_field($_POST['testimonial_author']));
    }
}
add_action('save_post', 'cosmetic_dental_save_meta_box_data');
?>
