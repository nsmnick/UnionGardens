<?php

get_header();
?>

<section class="content__hero" style="background-image: url('<?php echo get_field('hero_image');?>);">
</section>

<a name="about-the-development" id="about-the-development"></a>
<section class="panel panel--ext-bot content content__introduction">
    <div class="container">

        <div class="content-container">
            <h1 class="fade-in"><?php echo get_field('introduction_heading');?></h1>
            
            <div class="introduction animate">
                <?php echo get_field('introduction_bold');?>
            </div>

            <div class="global-detail-container animate">
                <?php echo get_field('introduction');?>
            </div>

            <div class="layout-image animate-fade">
                <img src="<?php echo get_field('introduction_image');?>"/>
            </div>
        </div>

    </div>
</section>


<a name="image-gallery" id="image-gallery"></a>
<section class="panel panel--ext-top content content__gallery">
    <div class="container">

        <?php $image_gallery = get_field('image_gallery');
        
        echo '<h2 class="animate-fade">'.$image_gallery['heading'].'</h2>';

        $slides_html = '';
        $thumbs_html = '';
        $array = [];

        foreach ($image_gallery['images'] as $key=>$image) {
          
            $slides_html .= '<div class="swiper-slide">'
                            . '<img src="'.$image['image'].'"/>';

            if($image['caption'])
            {
                $slides_html .= '<p>' . $image['caption'] . '</p>';
            }

            $slides_html .= '</div>';

            $thumbs_html .= '<div class="swiper-slide">'
                            . '<img src="'.$image['image'].'"/>'
                            . '</div>';
        }
        
        ?>

        <div class="gallery-slider-container" class="animate-fade">

        

            <div class="slider-container">
                <div class="swiper gallery-slider">
                    <div class="swiper-wrapper">
                        <?php echo $slides_html; ?>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>

            <div class="thumbs-container">
                <div thumbsSlider="" class="swiper thumbs-slider">
                    <div class="swiper-wrapper">
                        <?php echo $thumbs_html; ?>
                    </div>
                </div>
            </div>

        </div>

        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <script>
            var galleryThumbsSlider = new Swiper('.thumbs-slider', {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            });

            var gallerySlider = new Swiper('.gallery-slider', {
                spaceBetween: 10,
                thumbs: {
                    swiper: galleryThumbsSlider,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        </script>

        

    </div>
</section>


<a name="typical-floorplans" id="typical-floorplans"></a>
<section class="panel content content__gallery content__gallery--floorplans">
    <div class="container">

        <?php $floorplan_gallery = get_field('floor_plans');
        
        echo '<h2 class="animate-fade">'.$floorplan_gallery['heading'].'</h2>';

        $slides_html = '';
        $thumbs_html = '';
        $array = [];

        foreach ($floorplan_gallery['images'] as $key=>$image) {
          
            $slides_html .= '<div class="swiper-slide">'
                            . '<img src="'.$image['image'].'"/>';

            if($image['caption'])
            {
                $slides_html .= '<p class="caption">' . $image['caption'] . '</p>';
            }

            $slides_html .= '</div>';

            $thumbs_html .= '<div class="swiper-slide">'
                            . '<img src="'.$image['image'].'"/>'
                            . '</div>';
        }
        
        ?>

        <div class="gallery-slider-container animate-fade">

            <div class="slider-container">
                <div class="swiper fp-gallery-slider">
                    <div class="swiper-wrapper">
                        <?php echo $slides_html; ?>
                    </div>
                    <div class="swiper-button-next fp-swiper-button-next"></div>
                    <div class="swiper-button-prev fp-swiper-button-prev"></div>
                </div>
            </div>

            <div class="thumbs-container">
                <div thumbsSlider="" class="swiper fp-thumbs-slider">
                    <div class="swiper-wrapper">
                        <?php echo $thumbs_html; ?>
                    </div>
                </div>
            </div>

        </div>

        <script>
            var fpGalleryThumbsSlider = new Swiper('.fp-thumbs-slider', {
            spaceBetween: 10,
            slidesPerView: 4,
            centerInsufficientSlides: true,
            freeMode: true,
            watchSlidesProgress: true,
            });

            var fpGallerySlider = new Swiper('.fp-gallery-slider', {
                spaceBetween: 10,
                thumbs: {
                    swiper: fpGalleryThumbsSlider,
                },
                navigation: {
                    nextEl: ".fp-swiper-button-next",
                    prevEl: ".fp-swiper-button-prev",
                },
            });
        </script>

        

    </div>
</section>


<a name="express-interest" id="express-interest"></a>
<section class="panel content content__form">
    <div class="container">
        <h2 class="animate-fade"><?php echo get_field('form_heading');?></h2>
        <div class="gravity-form-container animate">
            <?php echo do_shortcode('[gravityform id="1" title="false" description="false" ajax="true"]'); ?>
            <p class="privacy"><?php echo get_field('form_privacy_message');?></p>
        </div>
    </div>
</section>

<?php
get_footer();
?>