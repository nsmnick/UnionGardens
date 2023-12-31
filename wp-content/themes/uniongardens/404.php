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

            <h1>Page not found</h1>
            
			<h4>Sorry, this page is does not exist or is no longer available.</h4>
			<p>Please use the menu to find the page you are after.</p>

        </div>

    </div>
</section>



<?php
get_footer();
?>