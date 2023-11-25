<?php 

$content_panels = get_field('content_panels');

if( $content_panels )
{
    
	foreach($content_panels as $current_panel)
    {
        $panel_type = $current_panel['acf_fc_layout']; 
        //echo '<h1>' . $panel_type . '</h1>';


        include '_content_' . $panel_type . '.php';

        
        // // Global style that can be applied to all sections
        // $pd_top_class = get_padding_class($panel_config['config_top_padding'],'pt');
        // $pd_bottom_class = get_padding_class($panel_config['config_bottom_padding'],'pb');
        // $hide_panel = $panel_config['config_hide_panel'];
        // $panel_anchor_name = $panel_config['config_panel_name'];

        // $class_include = get_class_include($pd_top_class, $pd_bottom_class);

     
        // if($hide_panel != 'Yes')
        // {

            // if($panel_anchor_name) {
            //     echo panel_anchor_tag($panel_anchor_name);
            // }

       
    }


}




function get_padding_class($option, $placement='pt')
{

    $pd_class="";

    switch ($option) {
        case 'None':
            $pd_class= $placement . "--none";
            break;

        case 'Small':
            $pd_class=$placement . "--small";
            break;
    }

    return $pd_class;
}


// function get_dividing_line_class($option)
// {

//     $line_class="";

//     switch ($option) {
//         case 'Top':
//             $line_class="dl--top";
//             break;

//         case 'Bottom':
//             $line_class="dl--bottom";
//             break;
//     }

//     return $line_class;
// }



function get_class_include($pd_top_class, $pd_bottom_class)
{

    // echo '1:'. $pd_top_class;
    // echo '2:'. $pd_bottom_class;

    $class_string='';

    if($pd_top_class!='')
    {
        $class_string = $pd_top_class . ' ';        
    }

    if($pd_bottom_class!='')
    {
        $class_string .= $pd_bottom_class . ' ';        
    }

    // if($dl_class!='')
    // {
    //     $class_string .= $dl_class . ' ';        
    // }


    // if($bg_colour_class!='')
    // {
    //     $class_string .= $bg_colour_class . ' ';        
    // }

    // if($text_colour_class!='')
    // {
    //     $class_string .= $text_colour_class . ' ';        
    // }


    return $class_string;

}




?>