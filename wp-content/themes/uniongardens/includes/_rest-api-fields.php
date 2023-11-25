<?php




function register_custom_rest_fields() {

	$post_type_fields = [
		'nsm_properties' => [
			'featuredImage' => 'get_rest_featured_image'
			,'location' => 'get_rest_property_location'
			,'hide_detail_page' => 'get_rest_hide_detail_page'
		]



	];

	foreach ($post_type_fields as $post_type => $fields) {
		foreach ($fields as $field_name => $function) {
			register_rest_field(
				$post_type
				, $field_name
				, array(
					'get_callback' => $function
					, 'update_callback' => null
					, 'schema' => null
				)
			);
		}
	}

}
add_action( 'rest_api_init', 'register_custom_rest_fields' );





// Generic Functions

function get_rest_bg_featured_image( $object, $field_name, $request ) {

	$url = get_the_post_thumbnail_url($object['id']);
	return 'url('. $url .')';
}

// function get_rest_featured_image( $object, $field_name, $request ) {

// 	$url = get_the_post_thumbnail_url($object['id']);
// 	return $url;
// }

function get_rest_post_date( $object, $field_name, $request ) {

	$return = get_the_date('j M Y');
	return $return;
}


function get_rest_excerpt( $object, $field_name, $request ) {
	return wp_trim_words(get_the_excerpt($object['id']),30);
}

function get_rest_content( $object, $field_name, $request ) {
	return wp_trim_words(get_the_content($object['id']),100);
}



function get_primary_category_id($postID, $taxonomy){

	$terms = get_the_terms($postID,  $taxonomy);
	if (!is_wp_error( $terms )) {
		return !empty($terms[0]->term_id)? $terms[0]->term_id : '';
	}
	return '';
}


function get_primary_category($postID, $taxonomy){

	$terms = get_the_terms($postID,  $taxonomy);
	if (!is_wp_error( $terms )) {
		return !empty($terms[0]->name)? $terms[0]->name : '';
	}
	return '';
}




// Properties


function get_rest_featured_image( $object, $field_name, $request ) {

	$image = get_the_post_thumbnail_url($object['id']);

	if($image)
		return 'url('. get_the_post_thumbnail_url($object['id']).')';
	else
		return 'url('. IMAGES.'/coming-soon.jpg)';
}


function get_rest_property_location( $object, $field_name, $request ) {
	$location = get_post_meta($object['id'],'location', true);
	return $location;
}


function get_rest_hide_detail_page( $object, $field_name, $request ) {
	$hide_detail_page = get_post_meta($object['id'],'hide_detail_page', true);
	return $hide_detail_page;
}


