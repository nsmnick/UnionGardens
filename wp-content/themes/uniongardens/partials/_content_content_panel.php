<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $content = $current_panel['content'];

    $button_text = $current_panel['button_text'];
    $button_url = $current_panel['button_url'];

    $config_background_colour = $current_panel['config_background_colour'];
    $bg_colour_class = 'content__content-panel--' . str_replace(' ','-',strtolower($config_background_colour));
    
?>

    <section class="panel content content__content-panel <?php echo $bg_colour_class;?>">
       
        <div class="container">
            
            <h2 class="animate"><?php echo $heading;?></h2>
            <div class="global-detail-container global-detail-container--narrow animate-fade">
                <?php echo $content;?>
            </div>

            <?php if($button_text) { ?>
                <div class="button-center-container pt-40 animate-fade">
                    <a class="button animate-fade" href="<?php echo $button_url;?>"><?php echo $button_text;?></a>
                </div>
            <?php } ?>

            
        </div>

    </section>
<?php 
}
?>
