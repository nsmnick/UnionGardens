<?php 

if($current_panel)
{

    $heading = $current_panel['main_heading'];
    $images = $current_panel['background_images'];
?>

   

<!-- Page Hero -->
<?php

	$hero_images_html = '';

	if ($images) {
		foreach ($images as $image) {
			$hero_images_html .= '<div class="content__home-hero__background-images__image">'
					.wp_get_attachment_image($image['image'], 'full')
				.'</div>';
		}
	}

	echo '<section class="content content__home-hero">'
		.'<div id="hero-slider" class="content__home-hero__background-images animate-fade">'
			.$hero_images_html
		.'</div>'
		.'<div class="content__home-hero__container container">'
			.'<h1>'.$heading.'</h1>'
		.'</div>'		
	.'</section>';

?>
<!-- End Page Hero -->

<?php 
}
?>
