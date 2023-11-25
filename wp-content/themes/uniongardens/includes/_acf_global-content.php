<?php 

if( function_exists('acf_add_options_page') ) {

	acf_add_options_page([
		'page_title' => 'Theme Settings'
		, 'menu_title' => 'Theme Settings'
		, 'menu_slug' => 'theme-general-settings'
		, 'capability'=> 'edit_posts'
		, 'redirect' => true
	]);

	acf_add_options_sub_page([
		'page_title' => 'Theme Settings'
		, 'menu_title' => 'General'
		, 'parent_slug' => 'theme-general-settings'
		, 'capability'=> 'edit_posts'
		, 'redirect' => true
	]);



}



