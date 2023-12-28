<?php

/**
 * The plugin bootstrap file.
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @see              https://www.linknacional.com
 * @since             1.0.0
 *
 * @wordpress-plugin
 * Plugin Name:       Fee recovery for GiveWP
 * Plugin URI:        https://wordpress.org/plugins/fee-recovery-for-givewp
 * Description:       Add donor option to cover payment expenses
 * Version:           1.1.1
 * Author:            Link Nacional
 * Author URI:        https://www.linknacional.com/wordpress/
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       fee-recovery-for-givewp
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    exit;
}

/*
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'FEE_RECOVERY_FOR_GIVEWP_VERSION', '1.1.1' );
define( 'FEE_RECOVERY_FOR_GIVEWP_BASENAME', plugin_basename(__FILE__) );

// Plugin text domain for translations
define( 'FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN', 'fee-recovery-for-givewp' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-fee-recovery-for-givewp-activator.php.
 */
function activate_fee_recovery_for_givewp(): void {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-fee-recovery-for-givewp-activator.php';
    Fee_Recovery_For_Givewp_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-fee-recovery-for-givewp-deactivator.php.
 */
function deactivate_fee_recovery_for_givewp(): void {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-fee-recovery-for-givewp-deactivator.php';
    Fee_Recovery_For_Givewp_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_fee_recovery_for_givewp' );
register_deactivation_hook( __FILE__, 'deactivate_fee_recovery_for_givewp' );
add_action('plugins_loaded', 'activate_fee_recovery_for_givewp', 999);

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-fee-recovery-for-givewp.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_fee_recovery_for_givewp(): void {
    $plugin = new Fee_Recovery_For_Givewp();
    $plugin->run();
}
run_fee_recovery_for_givewp();
