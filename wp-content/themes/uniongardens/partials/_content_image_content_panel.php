<?php 

if($current_panel)
{
    $image = $current_panel['image'];
    $heading = $current_panel['heading'];
    $sub_heading = $current_panel['sub_heading'];
    $content = $current_panel['content'];
    $inline_button = $current_panel['inline_button'];


    $bottom_button = $current_panel['bottom_button'];
    $background_colour = $current_panel['config_background_colour'];
    $image_position = $current_panel['image_position'];

    $image_pos_class="content-container__col--left";
    if($image_position=="Right")
    {
        $image_pos_class="content-container__col--right";
    }

    $config_background_colour = $current_panel['config_background_colour'];
    $bg_colour_class = 'content__content-panel--' . str_replace(' ','-',strtolower($config_background_colour));
    
    
?>

    <section class="panel content content__image-content-panel <?php echo $bg_colour_class;?>">
        <div class="container">
            
            <div class="content-container">
                <div class="content-container__col <?php echo $image_pos_class;?>">
                    <div class="image animate-fade" style="background-image:url('<?php echo $image;?>');"></div>
                </div>
                <div class="content-container__col">

                    <div class="content-panel">
                        <h2 class="animate"><?php echo $heading;?></h2>
                        <h3 class="animate-fade"><?php echo $sub_heading;?></h3>
                        <div class="global-detail-container animate-fade">
                            <?php echo $content;?>
                        </div>

                        <?php if($inline_button['button_text']!='') {
                            echo '<a href="'.$inline_button['button_url'].'" class="button button--mt-40 animate-fade">'.$inline_button['button_text'].'</a>';
                        }
                        ?>
                    </div>

                </div>
            </div>

            <?php if($bottom_button['button_text']!='') {
                echo '<div class="button-center-container button-center-container--mt-40 animate-fade">';
                    echo '<a href="'.$bottom_button['button_url'].'" class="button">'.$bottom_button['button_text'].'</a>';
                echo '</div>';
            }
            ?>
            
            
        </div>
    </section>
<?php 
}
?>
