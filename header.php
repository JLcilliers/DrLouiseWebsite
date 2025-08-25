<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-wrapper">
                <a href="<?php echo home_url(); ?>" class="logo">
                    <?php 
                    $logo = get_theme_mod('custom_logo');
                    if ($logo) {
                        $logo_img = wp_get_attachment_image_src($logo, 'full');
                        echo '<img src="' . esc_url($logo_img[0]) . '" alt="' . get_bloginfo('name') . '">';
                    } else {
                        echo '<img src="' . get_template_directory_uri() . '/assets/images/logo-white.png" alt="' . get_bloginfo('name') . '">';
                    }
                    ?>
                </a>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_class' => 'nav-menu',
                    'container' => false,
                    'fallback_cb' => 'cosmetic_dental_fallback_menu'
                ));
                ?>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>
