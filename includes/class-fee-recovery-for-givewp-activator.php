<?php

/**
 * Fired during plugin activation.
 *
 * @see       https://www.linknacional.com
 * @since      1.0.0
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 *
 * @author     Link Nacional <contato@seenacional.com>
 */
final class Fee_Recovery_For_Givewp_Activator {
    /**
     * Short Description. (use period).
     *
     * Long Description.
     *
     * @since    1.0.0
     */
    public static function activate(): void {
        // Load plugin helper functions.
        if ( ! function_exists('deactivate_plugins') || ! function_exists('is_plugin_active')) {
            require_once ABSPATH . '/wp-admin/includes/plugin.php';
        }

        $is_deactivate_plugin = false;
        $is_give_active = defined('GIVE_PLUGIN_BASENAME') ? is_plugin_active(GIVE_PLUGIN_BASENAME) : false;

        if ( ! $is_give_active) {
            add_action('admin_notices', array('Fee_Recovery_For_Givewp_Activator', 'inactive_notice'));

            $is_deactivate_plugin = true;
        }

        // Don't let this plugin activate.
        if ($is_deactivate_plugin) {
            // Deactivate plugin.
            deactivate_plugins(FEE_RECOVERY_FOR_GIVEWP_BASENAME);

            if (isset($_GET['activate'])) {
                unset($_GET['activate']);
            }
        }
    }

    /**
     * Notice for No Core Activation.
     */
    public static function inactive_notice(): void {
        // Admin notice.
        $message = sprintf(
            '<div class="notice notice-error"><p><strong>%1$s</strong> %2$s <a href="%3$s" target="_blank">%4$s</a> %5$s.</p></div>',
            __('Activation error:', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
            __('You need the plugin', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
            'https://wordpress.org/plugins/give/',
            __('GiveWP', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
            __('installed and active for Fee recovery for GiveWP to activate', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN)
        );

        echo $message;
    }
}
