<?php 

if($current_panel)
{
    $quotes = $current_panel['quotes'];
    $background_colour = $current_panel['background_colour'];
    $bg_class="content content__quotes--" . strtolower($background_colour);
    ?>


    <section class="panel content content__quotes <?php echo $bg_class;?>">

        <div class="container">

         <div class="quote-marks-open animate-left"></div>
         
            

            <?php
            $slides_html = '';
            $array = [];

            foreach ($quotes as $key=>$quote) {
              
                $slides_html .= '<div class="quotes-slider__slide">'
                                    . '<div class="quote-slide-container">'     
                                        . '<p class="quote">'.$quote['quote'].'</p>'
                                        . '<p class="quote-by">'.$quote['quote_by'].'</p>'
                                    . '</div>'
                                . '</div>';
            }
            
            ?>

            <div class="quotes-bg" style="background-image: url('<?php echo $background_image;?>');"></div>

            <div class="quotes-slider animate-fade">
                <div class="quotes-slider__slides-wrapper">
                    <div class="quotes-slider__slides">
                        <?php echo $slides_html; ?>
                    </div>
            

                    <div class="quotes-slider__pagination"></div>

                </div>
            </div>

            <div class="quote-marks-close animate-right"></div>

        </div>

        

    </section>

<?php 
}
?>



