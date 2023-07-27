<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @see       https://www.linknacional.com
 * @since      1.0.0
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @author     Link Nacional <contato@seenacional.com>
 */
final class Fee_Recovery_For_Givewp_Admin {
    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     *
     * @var string the ID of this plugin
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     *
     * @var string the current version of this plugin
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     *
     * @param string $plugin_name the name of this plugin
     * @param string $version     the version of this plugin
     */
    public function __construct($plugin_name, $version) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;

        add_filter( 'give_get_sections_general', array($this, 'add_new_setting_section') );
        add_filter( 'give_get_settings_general', array($this, 'add_settings_into_section') );
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles(): void {
        /*
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Fee_Recovery_For_Givewp_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Fee_Recovery_For_Givewp_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/fee-recovery-for-givewp-admin.css', array(), $this->version, 'all' );
    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts(): void {
        /*
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Fee_Recovery_For_Givewp_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Fee_Recovery_For_Givewp_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/fee-recovery-for-givewp-admin.js', array('jquery'), $this->version, false );
        wp_localize_script($this->plugin_name,'lkn_recovery_fee_admin',array(
            'notice' => esc_html__('Get new features with', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
        ));
    }

    public function add_new_setting_section($sections) {
        $sections['lkn-fee-recovery'] = __('Fee recovery', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN);

        return $sections;
    }

    public function add_settings_into_section($settings) {
        $currentSection = give_get_current_setting_section();

        if ('lkn-fee-recovery' === $currentSection) {
            $pluginEnabled = give_get_option('lkn_fee_recovery_setting_field', 'disabled');

            $settings[] = array(
                'type' => 'title',
                'id' => 'lkn_fee_recovery',
            );

            $settings[] = array(
                'name' => __('Fee recovery', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                'id' => 'lkn_fee_recovery_setting_field',
                'desc' => __('Enable or disable the option to add the payment fee amount for the donor.', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                'type' => 'radio',
                'default' => 'disabled',
                'options' => array(
                    'global' => __('Global', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                    'gateway' => __('By payment method', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                    'form' => __('By form',FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                    'disabled' => __('Disable', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                ),
            );

            $settings = apply_filters('fee_recovery_for_givewp_settings_menu', $settings);

            if ('global' === $pluginEnabled) {
                $settings[] = array(
                    'name' => __('Fixed fee', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                    'id' => 'lkn_fee_recovery_setting_field_fixed',
                    'desc' => __('Fixed fee to be added per donation.', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                    'type' => 'number',
                    'default' => 0,
                );

                $settings[] = array(
                    'name' => __('Percentage fee', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                    'id' => 'lkn_fee_recovery_setting_field_percent',
                    'desc' => __('Percentage fee to be added per donation.', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                    'type' => 'number',
                    'default' => 0,
                );
            }

            $settings[] = array(
                'name' => __('Rate field description', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                'id' => 'lkn_fee_recovery_setting_field_description',
                'desc' => __('This description appears on the donation form, use "##" to add the fee amount.', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
                'type' => 'text',
                'default' => __('Cover the payment fee?', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN),
            );

            $settings[] = array(
                'id' => 'lkn_fee_recovery',
                'type' => 'sectionend',
            );
        }

        return $settings;
    }
}
