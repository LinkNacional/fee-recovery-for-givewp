<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @see       https://www.linknacional.com
 * @since      1.0.0
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @author     Link Nacional <contato@seenacional.com>
 */
class Fee_Recovery_For_Givewp_Public {
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
     * @param string $plugin_name the name of the plugin
     * @param string $version     the version of this plugin
     */
    public function __construct($plugin_name, $version) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;

        // add_action('give_fields_before_donation_levels', array($this, 'load_page'), 10, 2); // Give\Framework\FieldsAPI\Group and form_id
        add_action('give_after_donation_levels', array($this, 'load_page'), 10, 2); // form_id and array with form args
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {
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
        wp_register_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/fee-recovery-for-givewp-public.css', array(), $this->version, 'all' );
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {
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

        wp_register_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/fee-recovery-for-givewp-public.js', array('jquery'), $this->version, false );
    }

    public function load_page($form_id, $args) {
        wp_enqueue_script($this->plugin_name);
        wp_enqueue_style($this->plugin_name);

        echo load_template(
            plugin_dir_path(__FILE__) . 'partials/fee-recovery-for-givewp-public-display.php',
            true,
            array()
        );
    }
}
