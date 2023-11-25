<?php 

if($current_panel)
{

    $heading = $current_panel['heading'];
    $image = $current_panel['image'];

    $bgclass='';
    if($image)
        $bgclass='style="background-image:url(\''.$image.'\');"';
    
?>
    
    <section class="panel content content__internal-hero animate-fade" <?php echo $bgclass;?>>
        <div class="container">

            <div class="content-container">
                <h1><?php echo $heading;?></h1>
            </div>

        </div>
    </section>

<?php 
}
?>
