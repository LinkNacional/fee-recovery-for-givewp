<?php

/**
 * Fired when the plugin is uninstalled.
 *
 * When populating this file, consider the following flow
 * of control:
 *
 * - This method should be static
 * - Check if the $_REQUEST content actually is the plugin name
 * - Run an admin referrer check to make sure it goes through authentication
 * - Verify the output of $_GET makes sense
 * - Repeat with other user roles. Best directly by using the links/query string parameters.
 * - Repeat things for multisite. Once for a single site in the network, once sitewide.
 *
 * This file may be updated more in future version of the Boilerplate; however, this is the
 * general skeleton and outline for how the file should work.
 *
 * For more information, see the following discussion:
 * https://github.com/tommcfarlin/WordPress-Plugin-Boilerplate/pull/123#issuecomment-28541913
 *
 * @see       https://www.linknacional.com
 * @since      1.0.0
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

$lkn_recovery_fee_all_options = give_get_settings();

$lkn_recovery_fee_all_options = array_filter($lkn_recovery_fee_all_options, function ($key) {
    return strpos($key, 'lkn_fee_recovery_setting') === 0;
}, \ARRAY_FILTER_USE_KEY);
$lkn_recovery_fee_all_options = array_keys($lkn_recovery_fee_all_options);

if (count($lkn_recovery_fee_all_options) > 0) {
    for ($c = 0; $c < count($lkn_recovery_fee_all_options); $c++) {
        give_delete_option($lkn_recovery_fee_all_options[$c]);
    }
}