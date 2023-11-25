<?php 
if($current_panel)
{
    $image = $current_panel['image'];
?>
    <section class="panel content content__image-panel">
        <div class="container container--narrow">  
            <img class="animate-fade" src="<?php echo $image;?>"/>
        </div>
    </section>
<?php 
}
?>
