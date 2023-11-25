<?php


define( 'META_KEY_NAME', 'film_view_count' );

// Function used to remove page views.  Can be called from a pge.
function delete_page_view_counts_post_meta() {
   global $wpdb;
   $table = $wpdb->prefix.'postmeta';
   $wpdb->delete ($table, array('meta_key' => META_KEY_NAME));
}



// Count viewed posts
function set_post_view_count($postID) {

    $count = get_post_meta($postID, META_KEY_NAME, true);

    if($count==''){
        $count = 1;
        delete_post_meta($postID, META_KEY_NAME);
        add_post_meta($postID, META_KEY_NAME, '1');
    }else{
        $count++;
        update_post_meta($postID, META_KEY_NAME, $count);
    }
}
//To keep the count accurate, lets get rid of prefetching
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);


function get_post_views_count($postID){
    $count = get_post_meta($postID, META_KEY_NAME, true);
    
    if($count==''){
        delete_post_meta($postID, META_KEY_NAME);
        add_post_meta($postID, META_KEY_NAME, '1');
        return '1';
    }
    return $count;
    return 0;
}


function get_most_viewed_posts($section_id, $number=5)
{

    if($section_id != 0){
        $params['films'] = $section_id;
        $tax_query[] = buildCategoriesSearch('films',$params);
    }

	$args = array( 'numberposts' => $number
			,'post_status' => 'publish'
			,'post_type'=>'films'
            ,'tax_query' =>$tax_query
			,'meta_key'=>META_KEY_NAME
			,'orderby'=>'meta_value_num'
			,'order' => 'DESC'
		);

	$posts = get_posts($args);

    wp_reset_postdata();

	return $posts;

}
