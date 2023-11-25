<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<title><?php wp_title(' - ', TRUE, 'right'); ?></title>

	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	
	<link rel="shortcut icon" type="image/png" href="<?php echo THEMEROOT;?>/images/favicon.jpg">
	

	<script>(function(){document.documentElement.className='js'})();</script>

	
	<?php wp_head(); ?>

	<?php echo get_field('embed_script_header','options');?>

</head>




<body <?php body_class();?>>

	<?php echo get_field('embed_script_body','options');?>

	<header>			
	
	<div class="page-header">
			
			<nav id="main-menu" class="page-header__main-menu animate-fade">

				<ul class="main-menu">

					<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor mobile-only"><a href="<?php echo site_url();?>">Home</a>
					</li>
					
					<?php
						wp_nav_menu([
							'theme_location' => 'main-menu'
							, 'container' => ''
							, 'items_wrap' => '%3$s'
						]);
					?>
						
				</ul>

			</nav>


			<div class="page-header__mobile-logo-container">	
				<a href="<?php echo site_url();?>">
					<div class="page-header__mobile-logo">	
					</div>
				</a>
			</div>

			<div class="page-header__menu-button-container">

				<div class="hamburger-toggle" data-menu="1">
					<div class="hamburger-toggle__left"></div>
					<div class="hamburger-toggle__right"></div>
				</div>
				
			</div>


		</div>
	
	</header>

    