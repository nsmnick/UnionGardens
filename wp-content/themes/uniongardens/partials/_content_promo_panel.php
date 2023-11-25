<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $introduction = $current_panel['introduction'];
    $items = $current_panel['items'];
?>

    <section class="panel content content__content-promo">
       
        <div class="container">
            
            <?php if($heading) {?>
                <h2 class="animate"><?php echo $heading;?></h2>
            <?php } ?>
            
            <?php if($introduction) {?>
                <div class="introduction animate-fade">
                    <?php echo $introduction;?>
                </div>
            <?php } ?>
           
            <?php if($items) {?>

                <div class="content-promo-container">

                    <?php foreach($items as $item) 
                    {
                        
                        $background_image = $item['background_image'];
                        $meta_heading = $item['meta_heading'];
                        $heading = $item['heading'];
                        $button = $item['button'];
                    ?>
                        <div class="content-promo-container__col">

                            <?php
                            
                            echo '<div class="content-promo-block animate-fade">';
                                
                                echo '<a href="'.$button['button_url'].'">';
                                
                                echo '<div class="content-promo-block__image" style="background-image: url('.$background_image.')">';
                                echo '</div>';

                                echo '<div class="content-promo-block__image-layer">';
                                echo '</div>';

                                echo '<div class="content-promo-block__content">';
                                    
                                    if($meta_heading)
                                        echo '<p class="meta-heading">'.$meta_heading . '</p>';

                                    if($heading)
                                        echo '<h3>'.$heading . '</h3>';


                                        if($button['button_text']) { 
                                            echo '<div class="button-container">';
                                             echo '<div class="button button--white">'.$button['button_text'].'</div>';
                                            echo '</div>';
                                        }

                                 
                                echo '</div>';

                                echo '</a>';

                            echo '</div>';


                            ?>
                            
                        </div>
                    <?php 
                    }
                    ?>

                </div>
            <?php } ?>

        </div>

    </section>
<?php 
}
?>
