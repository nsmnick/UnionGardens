<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $sub_heading = $current_panel['sub_heading'];
    $form_id = $current_panel['form_id'];

?>

    <section class="panel content content__form-panel">
       
        <div class="container container--narrow">
            
            <h2 class="heading animate-fade"><?php echo $heading;?></h2>

            <p class="sub-heading  animate-fade"><?php echo $sub_heading;?></p>

            <div class="gravity-form-container animate-fade">
                <?php 
                    echo do_shortcode('[gravityform id="'.$form_id.'" title="false" description="false" ajax="true"]');
                ?>
            </div>

            
        </div>

    </section>
<?php 
}
?>
