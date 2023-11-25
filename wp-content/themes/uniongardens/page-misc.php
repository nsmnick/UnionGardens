<?php

/**
* Template Name: Misc Page
*/

get_header();
?>

<section class="content__internal-hero" style="background-image: url('<?php echo get_field('internal_hero_image','options');?>);">
</section>

<section class="panel content content__standard">
    <div class="container">

        <div class="content-container">

            <h1><?php the_title();?></h1>
            <?php the_content();?>
        </div>

    </div>
</section>



<?php
get_footer();
?>