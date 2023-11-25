<?php 

define('ASSETPATHS', get_assets());


// echo 'XXX';
// echo print_r(ASSETPATHS);

function get_assets()
{
    $assets_map = THEMEROOT . '/assets/assets-manifest.json';
    //  echo $assets_map;
    // die();

    // //if (file_exists($assets_map)) {
    //     return json_decode(file_get_contents($assets_map), true);
    // // } else {
    // //     echo ' NOT FOUND';
    // // }

    $testuser = TESTUSER . ':' . TESTUSER;
    $auth = base64_encode($testuser);
    $context = stream_context_create([
    "http" => [
        "header" => "Authorization: Basic $auth"
    ]
    ]);
    $manifest = file_get_contents($assets_map, false , $context);
    return json_decode($manifest, true);


    return [];
}

function enqueue_style()
{
    if (array_key_exists('app.css', ASSETPATHS)) {
        wp_enqueue_style('core', THEMEROOT . '/assets/' . ASSETPATHS['app.css'], false);
    }
}

function enqueue_scripts()
{
    wp_enqueue_script('jquery');

    if (array_key_exists('app.js', ASSETPATHS)) {
        wp_enqueue_script(
            'custom-script',
            THEMEROOT . '/assets/' . ASSETPATHS['app.js'],
            ['jquery'],
            false,
            true
        );
    }
}

