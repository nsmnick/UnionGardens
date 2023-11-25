<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $content = $current_panel['content'];
    $button = $current_panel['button'];
    
?>

    <section class="panel content content__cta-panel">
       
        <div class="container">
            
            <h2 class="animate"><?php echo $heading;?></h2>
            <div class="cta-introduction animate-fade">
                <?php echo $content;?>
            </div>

            <?php if($button) { ?>
                <div class="button-center-container pt-40">
                    <a class="button button--white animate-fade" href="<?php echo $button['button_url'];?>"><?php echo $button['button_text'];?></a>
                </div>
            <?php } ?>

            
        </div>

    </section>
<?php 
}
?>
