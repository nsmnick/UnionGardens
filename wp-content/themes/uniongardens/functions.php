<?php

// Define constants.
define('THEMEROOT', get_stylesheet_directory_uri());
define('IMAGES', THEMEROOT.'/assets/images');


include_once 'includes/_config-init.php';

// Frontend styles.
add_action('wp_enqueue_scripts', 'enqueue_style');
// Frontend scripts.
add_action('wp_enqueue_scripts', 'enqueue_scripts');
// Custom init.
add_action('init', 'custom_init');


// Frontend scripts.
function enqueue_additional_scripts() {
	wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'enqueue_additional_scripts');

function enqueue_additional_styles()
{
    wp_enqueue_style('swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', false);
}
add_action('wp_enqueue_scripts', 'enqueue_additional_styles');


function nav_add_site_logo($item_output, $item) {
	//   var_dump($item_output, $item);
	if ('Logo' == $item->title) {
		return '<div class="site-header-logo--container"><a class="no-padding" href="'.site_url().'"><div class="site-header-logo"></div></a></div>';
	}
	return $item_output;
  }
  add_filter('walker_nav_menu_start_el','nav_add_site_logo',10,2);
  
  


function the_title_trim($title) {

	$title = esc_attr($title);

	$findthese = array(
		'#Protected:#',
		'#Private:#'
	);

	$replacewith = array(
		'', // What to replace "Protected:" with
		'' // What to replace "Private:" with
	);

	$title = preg_replace($findthese, $replacewith, $title);
	return $title;
}
add_filter('the_title', 'the_title_trim');


// Includes

include_once 'includes/_lockdown.php';
include_once 'includes/_custom-login.php';

include_once 'includes/_acf_global-content.php';
include_once 'includes/_init-menus.php';
include_once 'includes/_init-sidebars.php';

