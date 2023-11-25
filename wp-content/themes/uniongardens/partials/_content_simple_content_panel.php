<?php 

if($current_panel)
{
    $content = $current_panel['content'];

    $panel_colour = $current_panel['panel_colour'];
    $colour_class = "content__simple-content-panel--" . strtolower($panel_colour);


?>

    <section class="panel content content__simple-content-panel <?php echo $colour_class;?>">
       
        <div class="container">
            <div class="content">
                <div class="global-detail-container animate-fade">
                    <?php echo $content;?>
                </div>
            </div>

        </div>

    </section>
<?php 
}
?>
