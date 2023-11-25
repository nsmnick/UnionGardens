<?php

// Custom sidebars.
if (function_exists('register_sidebar')) {
	register_sidebar(
		array(
			'name' => 'Default Sidebar'
			, 'id' => 'default-sidebar'
			, 'description' => 'Default Sidebar'
			, 'before_widget' => '<div>'
			, 'after_widget' => '</div>'
			, 'before_title' => '<p>'
			, 'after_title' => '</p>'
		)
	);
	register_sidebar(
		array(
			'name' => 'Blog Sidebar'
			, 'id' => 'blog'
			, 'description' => 'Blog Sidebar'
			, 'before_widget' => '<div class="widget %2$s">'
			, 'after_widget' => '</div>'
			, 'before_title' => '<p class="widget-title">'
			, 'after_title' => '</p>'
		)
	);
}
