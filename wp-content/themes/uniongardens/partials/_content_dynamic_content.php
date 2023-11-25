<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $content_type = $current_panel['content_type'];
    $no_results_message = $current_panel['no_results_message'];
    

    switch ($content_type) {
		case 'Properties':
			$search_data='properties-search';
			break;
    }

    $category='';
    
    if(isset($_GET["type"]))
    {
        $param=htmlspecialchars($_GET["type"]);
        

        if(isset($param) && ($param=='development-projects' || $param=='investment-portfolio'))
        {
            // Get ID for category
            $term = get_term_by('slug',$param,'nsm_properties_category');
            
            if($term)
            {
                $category = 'data-category="' .  $term->term_id . '"';
            }
        }
    }

?>
    
    <section class="panel content content__dynamic_content">
            
        <div class="container">

            <?php if($heading) {
                echo '<h1 class="animate-fade">'.$heading.'</h1>';
            }
            ?>

            <a name="listing-top" id="listing-top"></a>
            <div id="<?php echo $search_data?>" <?php echo $category;?>></div>
            <div id="<?php echo $search_data?>-lister"></div>

        </div>

    </section>

<?php
}
?>
