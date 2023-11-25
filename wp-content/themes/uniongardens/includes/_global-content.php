<?php 


// GLOBAL CONTENT

// Creates a set of global fields that can be used through out the website. 
// An free alternative to ACF Theme settings

// To use a field in a page use: get_option('field_name',true);



add_action('admin_menu', 'global_content_page_create');
function global_content_page_create() {
    $page_title = 'Global Content';
    $menu_title = 'Global Content';
    $capability = 'edit_posts';
    $menu_slug = 'global_text';
    $function = 'my_global_text_edit';
    $icon_url = '';
    $position = 24;

    if( current_user_can('editor') || current_user_can('administrator') ) {
    	add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position );
    }
}




function my_global_text_edit() {


	// Site Name

	$global_fields['site_heading'] = array('type'=>'heading', 'label'=>'Site Details', 'value'=>'');
	$global_fields['site_name'] = array('type'=>'text', 'label'=>'Site Name', 'value'=>'');

	
	//Home Page
	$global_fields['latest_resources_heading'] = array('type'=>'heading', 'label'=>'Latest Resources Heading', 'value'=>'');
	$global_fields['latest_resources_heading_text'] = array('type'=>'text', 'label'=>'Heading', 'value'=>'');
	$global_fields['latest_resources_heading_intro'] = array('type'=>'text', 'label'=>'Intro', 'value'=>'');


	// Footer 

	$global_fields['share_resource_heading'] = array('type'=>'heading', 'label'=>'Share Resource Message', 'value'=>'');
	$global_fields['share_resource_subject'] = array('type'=>'text', 'label'=>'Subject', 'value'=>'');

	

	// Footer 

	$global_fields['footer_heading'] = array('type'=>'heading', 'label'=>'Footer Content', 'value'=>'');
	$global_fields['copyright'] = array('type'=>'text', 'label'=>'Copyright Message', 'value'=>'');
	



	// Company Details

	// $global_fields['company_details_heading'] = array('type'=>'heading', 'label'=>'Company Details', 'value'=>'');
	// $global_fields['company_address'] = array('type'=>'textarea', 'label'=>'Address', 'value'=>'');

	// $global_fields['case_study_id'] = array('type'=>'text', 'label'=>'Case Study ID', 'value'=>'');


	// // Social Media Fields
	// $global_fields['sm_heading'] = array('type'=>'heading', 'label'=>'Social Media Links', 'value'=>'');
	// $global_fields['instagram_link'] = array('type'=>'text', 'label'=>'Instagram', 'value'=>'');
	// $global_fields['twitter_link'] = array('type'=>'text', 'label'=>'Twitter', 'value'=>'');
	// $global_fields['linkedin_link'] = array('type'=>'text', 'label'=>'LinkedIn', 'value'=>'');
	
	



	if( !current_user_can('editor') && !current_user_can('administrator') ) {  
        wp_die('Unauthorized user');
    }

    //check_admin_referrer( 'wpshout_option_page_footer_action' );

    echo '<h1 style="font-size: 23px;font-weight: 400;margin: 0;padding: 5px 0px 4px;line-height: 29px;">Global Content</h1>';

   
    if ( ! empty( $_POST ) && check_admin_referer( 'wpshout_option_page_footer_action', 'wpshout_option_page_footer_action' ) ) 
    {
    	foreach ($global_fields as $key => $global_field) {
    		if($global_field['type']!='heading')
    			//echo $key . ':' . $_POST[$key] . '<br/>';
    			update_option($key, $_POST[$key] );
    	}

    	
    }
	


	echo '<form method="POST">';


	foreach ($global_fields as $key => $global_field) {
		
		if($global_field['type']!='heading') {
			//echo $key . ':' . stripslashes(get_option($key)) . '<br/>';
    		$global_field['value'] = stripslashes(get_option($key, ''));

    		
    	}

    
		switch($global_field['type'])
		{
			
			case 'heading':

				echo '<h2 style="font-size: 18px;font-weight: 400;margin: 0;padding: 25px 0px 4px;line-height: 29px;">'.$global_field['label'].'</h2>';
    			echo '<hr>';

				break;



			case 'text':

				echo '<p>';
				echo '<label style="display: inline-block; vertical-align:top; width: 200px; margin-bottom: 5px;" for="'.$key.'">'.$global_field['label'].'</label>';
				echo '<input style="width: 90%;" name="'.$key.'" id="'.$key.'" value="'.$global_field['value'].'">';
				echo '</p>';

				break;


			case 'textarea':

				echo '<p>';
				echo '<label style="display: inline-block; vertical-align:top; width: 200px; margin-bottom: 5px;" for="'.$key.'">'.$global_field['label'].'</label>';
				echo '<textarea style="width: 90%;" name="'.$key.'" id="'.$key.'">'.$global_field['value'].'</textarea>';
				echo '</p>';

				break;


		}

    }

	
	wp_nonce_field( 'wpshout_option_page_footer_action', 'wpshout_option_page_footer_action' );

	echo '<p><br/><br/>';
	echo '<input type="submit" value="Save" class="button button-primary button-large">';
	echo '</p>';
	echo '</form>';

}

function get_global_field($fieldname) {
	return stripslashes(get_option($fieldname, ''));
}


function get_global_replace_date_field($fieldname) {

	$globalfield = stripslashes(get_option($fieldname, ''));
	$globalfield = str_replace('%%date%%', Date('Y'), $globalfield);
	return $globalfield;

}




