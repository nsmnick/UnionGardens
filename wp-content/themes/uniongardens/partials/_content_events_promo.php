<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $introduction = $current_panel['introduction'];

    $button_text = $current_panel['button_text'];
    $button_url = $current_panel['button_url'];

    $args = array(
        'numberposts' => 3,
        'post_type'   => 'events'
    );

    $args['meta_key'] = 'event_date';
    $args['orderby'] = 'meta_value_num';
    $args['meta_type'] = 'DATE';
    $args['order'] = 'ASC';

    $args['meta_query'] = array(
        array(
            'key' => 'event_date',
            'value' => date("Ymd"), 
            'compare' => '>='
        )                   
    );

    $events = get_posts( $args );

    if($events)
    {
        ?>

        <section class="panel content content__events-promo">
            <div class="container">

                <div class="flats"></div>
                <h2 class="animate-fade"><?php echo $heading;?></h2>

                <?php if($introduction) { ?>
                    <p class="introduction animate-fade"><?php echo $introduction;?></p>
                <?php } ?>

                <div class="events-container animate-fade">

                    <?php foreach($events as $event) 
                    {
                        $event_date = get_post_meta($event->ID, 'display_date', true);
                        $event_time = get_post_meta($event->ID, 'display_time', true);
                        $location = get_post_meta($event->ID, 'location', true);
                        $contact_name = get_post_meta($event->ID, 'contact_name', true);
                        $contact_email = get_post_meta($event->ID, 'contact_email', true);
                        $contact_phone_number = get_post_meta($event->ID, 'contact_phone_number', true);
                        $cost = get_post_meta($event->ID, 'cost', true);
                        $find_out_more_link = get_post_meta($event->ID, 'find_out_more_link', true);
                        $thumbnail_url =  get_the_post_thumbnail_url($event->ID);

                        if(!$thumbnail_url)
                            $thumbnail_url = THEMEROOT . '/images/community-event.jpg';
                    ?>
                        <div class="events-container__col animate">

                            <?php
                                echo '<div class="events-promo-container">';          
                                echo '<div class="events-promo-container__logo">';
                                    echo '<img class="logo" src="' . $thumbnail_url . '">';
                                echo '</div>';

                                echo '<div class="events-promo-container__content">';

                                    echo '<h3>' . $event->post_title . '</h3>';
                                    
                                    echo '<p>';
                                        echo $event->post_content;
                                    echo '</p>';

                                    if($event_date) {
                                        echo '<p>';
                                            echo '<span>Date: </span>' . $event_date;
                                        echo '</p>';
                                    }

                                    if($event_time) {
                                        echo '<p>';
                                            echo '<span>Time: </span>' . $event_time;
                                        echo '</p>';
                                    }

                                    if($location) {
                                        echo '<p>';
                                            echo '<span>Location: </span>' . $location;
                                        echo '</p>';
                                    }

                                    if($cost) {
                                        echo '<p>';
                                            echo '<span>Cost: </span>' . $cost;
                                        echo '</p>';
                                    }

                                    if($contact_name) {
                                        echo '<p>';
                                            echo '<span>Contact: </span>' . $contact_name;
                                        echo '</p>';
                                    }

                                    if($contact_email) {
                                        echo '<p>';
                                            echo '<span>Email: </span>' . $contact_email;
                                        echo '</p>';
                                    }

                                    if($contact_phone_number) {
                                        echo '<p>';
                                            echo '<span>Phone: </span>' . $contact_phone_number;
                                        echo '</p>';
                                    }                                    

                                echo '</div>';

                                if($event_date) {
                                    echo '<div class="events-promo-container__link">';
                                        echo '<a target="_blank" rel="noreferrer noopener" class="button button--small" href="' . $find_out_more_link . '">Find out More</a>';
                                    echo '</div>';
                                }
                                
                                echo '</div>';

                                ?>

                        </div>
                    <?php 
                    } 
                    ?>
                        
                </div>

            
                <?php if($button_text) { ?>
                <div class="button-center-container">
                    <a class="button animate-fade" href="<?php echo $button_url;?>"><?php echo $button_text;?></a>
                </div>
            <?php } ?>


            </div>
        </section>

<?php 
    }
                
}
?>
