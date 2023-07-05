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
class Fee_Recovery_For_Givewp_Admin {
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

        wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/fee-recovery-for-givewp-admin.css', array(), $this->version, 'all' );
    }

    /**
     * Register the JavaScript for the admin area.
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

        wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/fee-recovery-for-givewp-admin.js', array('jquery'), $this->version, false );
    }

    public function add_new_setting_section($sections) {
        $sections['lkn-fee-recovery'] = __('Fee recovery', FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN);

        return $sections;
    }

    public function add_settings_into_section($settings) {
        $currentSection = give_get_current_setting_section();
        $gateways = give_get_ordered_payment_gateways( give_get_payment_gateways() );
        $htmlOpt = '';

        if ('lkn-fee-recovery' === $currentSection) {
            $settings[] = array(
                'type' => 'title',
                'id' => 'lkn_fee_recovery',
            );

            $settings[] = array(
                'name' => 'Recuperação de taxa',
                'id' => 'lkn_fee_recovery_setting_field',
                'desc' => 'Habilita ou desabilita a opção de adicionar o valor da taxa de pagamento para o doador.',
                'type' => 'radio',
                'default' => 'disabled',
                'options' => array(
                    'enabled' => 'Habilitar',
                    'disabled' => 'Desabilitar',
                ),
            );

            $settings[] = array(
                'name' => 'Taxa fixa',
                'id' => 'lkn_fee_recovery_setting_field_fixed',
                'desc' => 'Taxa fixa a ser adicionada por doação.',
                'type' => 'number',
                'default' => 0,
            );

            $settings[] = array(
                'name' => 'Taxa percentual',
                'id' => 'lkn_fee_recovery_setting_field_percent',
                'desc' => 'Taxa percentual a ser adicionada por doação.',
                'type' => 'number',
                'default' => 0,
            );

            $settings[] = array(
                'name' => 'Descrição de campo de taxa',
                'id' => 'lkn_fee_recovery_setting_field_',
                'desc' => 'Essa descição aparece no formulário de doação.',
                'type' => 'text',
                'default' => 'Cobrir a taxa de pagamento?',
            );

            $htmlOpt .= <<<'HTML'
            <div class="lkn_fee_recovery_wrap_gateways">
HTML;

            foreach ($gateways as $key => $option) {
                $label = $option['admin_label'];

                $htmlOpt .= <<<HTML
                <div class="lkn-recovery-fee-col">    
                    <div class="lkn-recovery-fee-row">
                        <div class="lkn-recovery-fee-label-wrap">
                            <label for="lkn_fee_recovery_setting_field_gateway_{$key}">{$label}</label>
                        </div>

                        <div class="lkn-recovery-fee-input-wrap">
                            <div>
                                <input name="lkn_fee_recovery_fixed_setting_field_gateway_{$key}" id="lkn_fee_recovery_setting_field_gateway_{$key}" type="number" min="0" step="0.01" value="" class="give-input-field">
                                <div class="give-field-description">Taxa fixa a ser adicionada por doação.</div>
                            </div>

                            <div>
                                <input name="lkn_fee_recovery_percent_setting_field_gateway_{$key}" type="number" min="0" value="" class="give-input-field">
                                <div class="give-field-description">Taxa percentual a ser adicionada por doação.</div>
                            </div>
                        </div>
                    </div>
                </div>
HTML;
            }

            $htmlOpt .= <<<'HTML'
            </div>
HTML;

            echo $htmlOpt;

            $settings[] = array(
                'id' => 'lkn_fee_recovery',
                'type' => 'sectionend',
            );
        }

        return $settings;
    }
}
