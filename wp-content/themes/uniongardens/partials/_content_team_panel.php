<?php 

if($current_panel)
{
    $heading = $current_panel['heading'];
    $introduction = $current_panel['introduction'];
    $team = $current_panel['team'];
?>

    <section class="panel content content__team-panel">
       
        <div class="container">
            
            <h2 class="animate"><?php echo $heading;?></h2>

            <div class="tp-introduction animate-fade">
                <?php echo $introduction;?>
            </div>

            <?php

            if($team)
            {
                echo '<div class="team-container">';
                foreach($team as $person) {

                    echo '<div class="team-container__col">';
                        
                        echo '<img class="animate-fade" src="'.$person['photo'].'"/>';
                        echo '<h3 class="animate-fade">'.$person['name'].'</h3>';
                        echo '<p class="animate-fade">'.$person['bio'].'</p>';

                    echo '</div>';

                }
                echo '</div>';
            }

            ?>

        </div>

    </section>
<?php 
}
?>
