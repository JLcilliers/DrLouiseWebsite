<?php get_header(); ?>

<div class="container" style="padding-top: 120px; padding-bottom: 80px;">
    <header class="page-header">
        <?php
        the_archive_title('<h1 class="page-title">', '</h1>');
        the_archive_description('<div class="archive-description">', '</div>');
        ?>
    </header>

    <?php if (have_posts()) : ?>
        <div class="posts-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?> style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="post-thumbnail" style="margin-bottom: 1rem;">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium', array('style' => 'width: 100%; height: 200px; object-fit: cover; border-radius: 5px;')); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <header class="entry-header">
                        <h2 class="entry-title" style="margin-bottom: 1rem;">
                            <a href="<?php the_permalink(); ?>" style="text-decoration: none; color: #333;"><?php the_title(); ?></a>
                        </h2>
                        <div class="entry-meta" style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">
                            <span class="posted-on"><?php echo get_the_date(); ?></span>
                            <span class="byline"> by <?php the_author(); ?></span>
                        </div>
                    </header>

                    <div class="entry-summary">
                        <?php the_excerpt(); ?>
                    </div>

                    <footer class="entry-footer">
                        <a href="<?php the_permalink(); ?>" class="read-more" style="color: #007bff; text-decoration: none; font-weight: 600;">Read More →</a>
                    </footer>
                </article>
            <?php endwhile; ?>
        </div>

        <?php
        the_posts_navigation(array(
            'prev_text' => esc_html__('Older posts', 'cosmetic-dental'),
            'next_text' => esc_html__('Newer posts', 'cosmetic-dental'),
        ));
        ?>

    <?php else : ?>
        <p><?php esc_html_e('Sorry, no posts matched your criteria.', 'cosmetic-dental'); ?></p>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
