<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $content = $current_panel['content'];
    $images = $current_panel['images'];
?>

    <section class="content content__image-slider-content-panel">
       
        <div class="content-container">
            <div class="content-container__col1">
                <?php
                $images_html = '';

                if ($images) {
                    foreach ($images as $image) {
                        $images_html .= '<div class="background-images__image">'
                                    .wp_get_attachment_image($image['image'], 'full')
                                    .'</div>';
                    }
                }

	 
                echo '<div id="iscp-slider" class="background-images">'
			        .$images_html
		            .'</div>';

                ?>
		
            </div>

            <div class="content-container__col2">
                
                <h2 class="animate"><?php echo $heading;?></h2>
                <div class="global-detail-container animate-fade">
                    <?php echo $content;?>
                </div>

            </div>
        </div>

    </section>

<?php 
}
?>
