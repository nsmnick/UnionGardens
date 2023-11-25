<?php

// Custom Login

// Used to change the backend admin login screen.
// Accompanying login.min.css file in theme folder which requires an image swapped out.


function admin_style() {
  wp_enqueue_style('admin-styles', get_template_directory_uri().'/login.min.css');
}
add_action('login_enqueue_scripts', 'admin_style');


function custom_loginlogo_url($url) {
	return site_url();
}
add_filter( 'login_headerurl', 'custom_loginlogo_url' );

