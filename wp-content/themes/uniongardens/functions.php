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
	//wp_enqueue_script('swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', false, true);
}
add_action('wp_enqueue_scripts', 'enqueue_additional_scripts');

function enqueue_additional_styles()
{
    wp_enqueue_style('swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', false);
	//wp_enqueue_style('swiper', THEMEROOT .'/style.css', false);
}
add_action('wp_enqueue_scripts', 'enqueue_additional_styles');


// Enable thumbnail support for this theme.
add_theme_support('post-thumbnails');



function nav_add_site_logo($item_output, $item) {
	//   var_dump($item_output, $item);
	if ('Logo' == $item->title) {
		return '<div class="site-header-logo--container"><a class="no-padding" href="'.site_url().'"><div class="site-header-logo"></div></a></div>';
	}
	return $item_output;
  }
  add_filter('walker_nav_menu_start_el','nav_add_site_logo',10,2);
  
  



// Post excerpt settings.
function custom_excerpt_length($length) {
  return 30;
}
add_filter('excerpt_length', 'custom_excerpt_length', 999);

function new_excerpt_more($more) {
  return '&hellip;';
}
add_filter('excerpt_more', 'new_excerpt_more');



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



function buildCategoriesSearch($term, $params) {

	if( array_key_exists($term,$params))
		return array( 'taxonomy' => $term, 'field' => 'term_id','terms' => $params[$term]);
}

function panel_anchor_tag($panel_anchor_name) {

	
   if($panel_anchor_name!='') 
        return' <a id="' . $panel_anchor_name . '" name="' . $panel_anchor_name . '"></a>';
    else 
        return '';
}


/* Change Gravity Forms' Ajax Spinner into a transparent image */
add_filter( 'gform_ajax_spinner_url', 'spinner_url', 10, 2 );
function spinner_url( $image_src, $form ) {
    return  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
}

function taxo_primary_term_name($taxo, $post_id){

	$wpseo_primary_term = new WPSEO_Primary_Term($taxo, $post_id );
	$wpseo_primary_term = $wpseo_primary_term->get_primary_term();
  
	return $wpseo_primary_term = get_term($wpseo_primary_term);
}

add_shortcode('social-media-icons', 'socialMediaIcons');
function socialMediaIcons()
{
    $return='';
    $return .= '<div class="social-media animate-fade">';
    $return .= '<a target="_blank" rel="noreferrer noopener" href="'.get_field('facebook_url','options').'">';
    $return .= '<div class="social-media__icon social-media__icon--facebook mr--10">';
    $return .= '</div>';
    $return .= '</a>';
    $return .= '<a target="_blank" rel="noreferrer noopener" href="'.get_field('instagram_url','options').'">';
    $return .= '<div class="social-media__icon social-media__icon--instagram">';
    $return .= '</div>';
    $return .= '</a>';
    $return .= '</div>';

    return $return;
}



add_filter('admin_post_thumbnail_html', 'add_featured_image_text');
function add_featured_image_text($content) {

	global $post;

	//$content .= $post->post_type;

	if($post->post_type == 'events')
    	$content .= '<p>This image should be 834 by 518 pixels</p>';
    
    if($post->post_type == 'post')
    	$content .= '<p>This image should be 834 by 518 pixels</p>';

    return $content;
}


// Includes

include_once 'includes/_lockdown.php';
include_once 'includes/_custom-login.php';

include_once 'includes/_acf_global-content.php';
include_once 'includes/_init-menus.php';
include_once 'includes/_init-sidebars.php';
include_once 'includes/_register-custom-post-types.php';
include_once 'includes/_rest-api-fields.php';
include_once 'includes/_page-views.php';

