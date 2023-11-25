<?php


// Disable front end wp admin menu.
add_filter('show_admin_bar', '__return_false');


// Prevent user enumeration
if (!is_admin() && isset($_SERVER['REQUEST_URI'])) {
	if (preg_match('/(wp-comments-post)/', $_SERVER['REQUEST_URI']) === 0 && !empty($_REQUEST['author'])) {
		openlog('wordpress('.$_SERVER['HTTP_HOST'].')', LOG_NDELAY|LOG_PID,LOG_AUTH);
		syslog(LOG_INFO, "Attempted user enumeration from {$_SERVER['REMOTE_ADDR']}");
		closelog();
		wp_die('Forbidden');
	}
}


// Remove version from scripts and styles
// function shapeSpace_remove_version_scripts_styles($src) {
// 	if (strpos($src, 'ver=')) {
// 		$src = remove_query_arg('ver', $src);
// 	}
// 	return $src;
// }
// add_filter('style_loader_src', 'shapeSpace_remove_version_scripts_styles', 9999);
// add_filter('script_loader_src', 'shapeSpace_remove_version_scripts_styles', 9999);



// Remove standard WP header links
function removeHeadLinks() {
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
	remove_action('wp_head', 'wp_generator');
}
add_action('init', 'removeHeadLinks');


// Clear standard header includes
add_filter('the_generator', '__return_empty_string');
add_filter( 'xmlrpc_enabled', '__return_false' );



// Remove Comments

add_action('admin_init', function () {
    // Redirect any user trying to access comments page
    global $pagenow;
    
    if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url());
        exit;
    }

    // Remove comments metabox from dashboard
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

    // Disable support for comments and trackbacks in post types
    foreach (get_post_types() as $post_type) {
        if (post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
});

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);

// Remove comments page in menu
add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php');
});

// Remove comments links from admin bar
add_action('init', function () {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
});



// Remove unused Rest API End Points

add_filter( 'rest_endpoints', function( $endpoints ){
    if ( isset( $endpoints['/wp/v2/users'] ) ) {
        unset( $endpoints['/wp/v2/users'] );
    }
    if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
    }

    if ( isset( $endpoints['/wp/v2/settings'] ) ) {
        unset( $endpoints['/wp/v2/settings'] );
    }
    if ( isset( $endpoints['/wp/v2/settings/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/settings/(?P<id>[\d]+)'] );
    }

    if ( isset( $endpoints['/wp/v2/statuses'] ) ) {
        unset( $endpoints['/wp/v2/statuses'] );
    }
    if ( isset( $endpoints['/wp/v2/statuses/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/statuses/(?P<id>[\d]+)'] );
    }

    if ( isset( $endpoints['/wp/v2/comments'] ) ) {
        unset( $endpoints['/wp/v2/comments'] );
    }
    if ( isset( $endpoints['/wp/v2/comments/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/comments/(?P<id>[\d]+)'] );
    }


    return $endpoints;
});



// // Gravity Form Entries for editors

$editor = get_role( 'editor' );
$editor->remove_cap('gform_full_access');
$editor->add_cap( 'gravityforms_view_entries' );

add_action('admin_menu', function () {
    $user = new WP_User(get_current_user_id());
    if (!empty($user->roles) && is_array($user->roles) && in_array("editor", $user->roles)) {
        remove_submenu_page( 'gf_edit_forms', 'gf_new_form' ); 
        remove_submenu_page( 'gf_edit_forms', 'gf_settings' ); 
        remove_submenu_page( 'gf_edit_forms', 'gf_help' ); 
        remove_submenu_page( 'gf_edit_forms', 'gf_system_status' );   
    }
},9999);



 // Allow subscribers to see Private posts and pages
function private_posts_subscribers(){
 $subRole = get_role( 'subscriber' );
 $subRole->add_cap( 'read_private_posts' );
 $subRole->add_cap( 'read_private_pages' );
}
add_action( 'init', 'private_posts_subscribers' );

    
 
// Prevent subscribers viewing dashboard profile 
function wpse23007_redirect(){
    if( is_admin() && !defined('DOING_AJAX') && ( current_user_can('subscriber')  ) ){
      wp_redirect(home_url());
      exit;
    }
  }
  add_action('init','wpse23007_redirect');
  
