<?php 

	// Register Custom Post Types and their taxonomies


	register_post_type(
	
		'nsm_properties'
		, [
			'labels' => [
				'name' => __( 'Properties' )
				, 'singular_name' => __( 'Properties' )
			]
			, 'public' => true
			, 'has_archive' => false
			, 'show_in_rest' => true
			, 'rewrite' => [
				'slug' => __( 'properties' ),
				'with_front' => false
			]
			, 'extras' => [
				'auto_excerpt' => true
			]
			, 'supports' => ['title','thumbnail','editor','excerpt']
		]
	);



	register_taxonomy('nsm_properties_category', 'nsm_properties', array(
		'hierarchical' => true
		, 'labels' => array(
			'name' => _x( 'Category', 'taxonomy general name' )
			, 'singular_name' => _x( 'Category', 'taxonomy singular name' )
			, 'search_items' =>  __( 'Search Categories' )
			, 'popular_items' => __( 'Popular Categories' )
			, 'all_items' => __( 'All Categories' )
			, 'parent_item' => null
			, 'parent_item_colon' => null
			, 'edit_item' => __( 'Edit Category' )
			, 'update_item' => __( 'Update Category' )
			, 'add_new_item' => __( 'Add New Category' )
			, 'new_item_name' => __( 'New Category Name' )
			, 'separate_items_with_commas' => __( 'Separate Categories with commas' )
			, 'add_or_remove_items' => __( 'Add or remove Categories' )
			, 'choose_from_most_used' => __( 'Choose from the most used Categories' )
			, 'menu_name' => __( 'Categories' )
		)
		, 'show_ui' => true
		, 'show_admin_column' => true
		, 'update_count_callback' => '_update_post_term_count'
		, 'query_var' => true
		, 'show_in_rest' => true
	));

	

	

	// Helper Functions for accessing terms associated with a post


	function get_custom_post_terms($post_id, $taxonomy, $class)
	{
		$terms = get_the_terms($post_id, $taxonomy);

		$cats='';
		
		if($terms)
		{
			foreach ($terms as $term) {
				$cats .= '<span class="' . $class .'">' . $term->name . '</span>';
			}
		}
		
		return $cats;

	}


	function get_custom_post_terms_simple($post_id, $taxonomy, $seperator)
	{
		$terms = get_the_terms($post_id, $taxonomy);

		$cats='';
		
		if($terms)
		{
			foreach ($terms as $term) {
				$cats .= $term->name . $seperator;
			}
		}
		$cats = rtrim($cats, $seperator);
		return $cats;

	}













