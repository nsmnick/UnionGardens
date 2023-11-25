<?php

/**
 * This configuration will be read and overlaid on top of the
 * default configuration. Command line arguments will be applied
 * after this file is read.
 */

return [
    // If true, missing properties will be created when
    // they are first seen. If false, we'll report an
    // error message.
    'allow_missing_properties' => true,

    // Allow null to be cast as any type and for any
    // type to be cast to null.
    'null_casts_as_any_type' => true,

    // Backwards Compatibility Checking
    'backward_compatibility_checks' => false,

    // Run a quick version of checks that takes less time
    'quick_mode' => true,

    // Only emit critical issues to start with
    // (0 is low severity, 5 is normal severity, 10 is critical)
    'minimum_severity' => 10,

    // Supported values: `'5.6'`, `'7.0'`, `'7.1'`, `'7.2'`, `'7.3'`, `'7.4'`,
    // `'8.0'`, `'8.1'`, `null`.
    // If this is set to `null`,
    // then Phan assumes the PHP version which is closest to the minor version
    // of the php executable used to execute Phan.
    'target_php_version' => '8.1',

    // A list of directories that should be parsed for class and
    // method information. After excluding the directories
    // defined in exclude_analysis_directory_list, the remaining
    // files will be statically analyzed for errors.
    //
    // Thus, both first-party and third-party code being used by
    // your application should be included in this list.
    'directory_list' => [
        'public/'
    ],

    // A directory list that defines files that will be excluded
    // from static analysis, but whose class and method
    // information should be included.
    //
    // Generally, you'll want to include the directories for
    // third-party code (such as 'vendor/') in this list.
    //
    // n.b.: If you'd like to parse but not analyze 3rd
    //       party code, directories containing that code
    //       should be added to the `directory_list` as
    //       to `exclude_analysis_directory_list`.
    'exclude_analysis_directory_list' => [
        'vendor/',
        'public/wp-includes/ID3/'
    ]
];
