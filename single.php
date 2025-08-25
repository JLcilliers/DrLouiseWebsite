<?php get_header(); ?>

<div class="container" style="padding-top: 120px; padding-bottom: 80px;">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <h1 class="entry-title"><?php the_title(); ?></h1>
                <div class="entry-meta">
                    <span class="posted-on">
                        <?php echo get_the_date(); ?>
                    </span>
                    <span class="byline">
                        by <?php the_author(); ?>
                    </span>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content">
                <?php the_content(); ?>
            </div>

            <footer class="entry-footer">
                <?php
                $categories_list = get_the_category_list(', ');
                if ($categories_list) {
                    printf('<span class="cat-links">Posted in %1$s</span>', $categories_list);
                }

                $tags_list = get_the_tag_list('', ', ');
                if ($tags_list) {
                    printf('<span class="tags-links">Tagged %1$s</span>', $tags_list);
                }
                ?>
            </footer>
        </article>

        <?php
        // Navigation between posts
        the_post_navigation(array(
            'prev_text' => '<span class="nav-subtitle">' . esc_html__('Previous:', 'cosmetic-dental') . '</span> <span class="nav-title">%title</span>',
            'next_text' => '<span class="nav-subtitle">' . esc_html__('Next:', 'cosmetic-dental') . '</span> <span class="nav-title">%title</span>',
        ));

        // Comments
        if (comments_open() || get_comments_number()) {
            comments_template();
        }
        ?>
    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
