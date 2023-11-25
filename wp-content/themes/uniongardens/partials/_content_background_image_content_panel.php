<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $content = $current_panel['content'];
    $background_image = $current_panel['background_image'];
?>

    <section class="content content__background-image-content-panel" style="background-image:url('<?php echo $background_image;?>');">
        <div class="container">
            <div class="content-container">

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
