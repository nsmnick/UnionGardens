<?php
get_header(); 
?>

<section class="panel content content__internal-hero content__internal-hero--yellow">
<div class="container">

    <div class="content-container">
        <h1 class="animate-fade animate"><?php the_title();?></h1>
    </div>

</div>
</section>



<section class="panel content content__simple-content-panel content__simple-content-panel--yellow">
       
       <div class="container">

           <div class="content">

                <div class="back-to-archives"><< <a href="/archives/">Back to archives</a></div>   

                <div class="global-detail-container animate-fade">
                   <?php the_content();?>
                </div>
           </div>

       </div>

   </section>


<?php 


include_once 'partials/_content_cta_panel.php';

get_footer();
?>

