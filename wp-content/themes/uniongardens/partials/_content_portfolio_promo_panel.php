<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $introduction = $current_panel['introduction'];
    $properties = $current_panel['properties'];
    $button = $current_panel['button'];
    $background_colour = $current_panel['config_background_colour'];
    
    $config_background_colour = $current_panel['config_background_colour'];
    $bg_colour_class = 'content__portfolio-promo-panel--' . str_replace(' ','-',strtolower($config_background_colour));
 

?>

    <section class="panel content content__portfolio-promo-panel <?php echo $bg_colour_class;?>">
       
        <div class="container">
            
            <?php if($heading) {?>
                <h2 class="animate"><?php echo $heading;?></h2>
            <?php } ?>
            
            <?php if($introduction) {?>
                <div class="introduction animate-fade">
                    <?php echo $introduction;?>
                </div>
            <?php } ?>
           
            <?php if($properties) {?>

                <div class="property-container">

                    <?php foreach($properties as $property) 
                    {
                        $main_image = $property['main_image'];
                        $hover_image = $property['hover_image'];
                        $find_out_more_button = $property['find_out_more_button'];
                        $property_id = $property['property'];
                        $property_link = get_permalink($property_id);
                    ?>
                        <div class="property-container__col">

                            <?php
                            
                            echo '<a href="'.$property_link.'">';
                            
                            echo '<div class="property-container animate-fade">';
                            
                                echo '<div class="property-block">';
                                    
                                    
                                    
                                    echo '<div class="property-block__main-image" style="background-image: url('.$main_image.')">';
                                    echo '</div>';

                                    echo '<div class="property-block__hover-image" style="background-image: url('.$hover_image.')">';
                                    echo '</div>';

                                    

                                echo '</div>';

                                echo '<h3>'.$property['heading'].'</h3>';
                                echo '<p class="caption">'.$property['caption'].'</p>';
                            
                            echo '</div>';
                        
                            echo '</a>';

                            if($find_out_more_button)
                            {
                                echo '<a href="'.$property_link.'" class="button animate-fade">Find out more</a>';
                            }

                            ?>
                            
                        </div>
                    <?php 
                    }
                    ?>

                </div>

            <?php }

            if($button['button_text']) { 
                echo '<div class="button-center-container pt-40">';
                    echo '<a href="'.$button['button_url'].'" class="button animate-fade">'.$button['button_text'].'</a>';
                echo '</div>';
            }

            ?>

        </div>

    </section>
<?php 
}
?>
