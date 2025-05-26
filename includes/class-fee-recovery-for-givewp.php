<?php

/**
 * The file that defines the core plugin class.
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @see       https://www.linknacional.com
 * @since      1.0.0
 */

use Give\DonationForms\Blocks\DonationFormBlock\Block;
use Give\Donations\Models\Donation;
use Give\Framework\FieldsAPI\DonationForm;
use Give\Framework\Support\ValueObjects\Money;
use Give\Helpers\Hooks;

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 *
 * @author     Link Nacional <contato@seenacional.com>
 */
final class Fee_Recovery_For_Givewp
{
    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     *
     * @var Fee_Recovery_For_Givewp_Loader maintains and registers all hooks for the plugin
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     *
     * @var string the string used to uniquely identify this plugin
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since    1.0.0
     *
     * @var string the current version of the plugin
     */
    protected $version;

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct()
    {
        if (defined('FEE_RECOVERY_FOR_GIVEWP_VERSION')) {
            $this->version = FEE_RECOVERY_FOR_GIVEWP_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'fee-recovery-for-givewp';

        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run(): void
    {
        $this->loader->run();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @since     1.0.0
     *
     * @return string the name of the plugin
     */
    public function get_plugin_name(): string
    {
        return $this->plugin_name;
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @since     1.0.0
     *
     * @return Fee_Recovery_For_Givewp_Loader orchestrates the hooks of the plugin
     */
    public function get_loader(): Fee_Recovery_For_Givewp_Loader
    {
        return $this->loader;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @since     1.0.0
     *
     * @return string the version number of the plugin
     */
    public function get_version(): string
    {
        return $this->version;
    }

    /**
     * Update donation amount with fees
     *
     * @since 1.0.0
     *
     * @param  array $donation_data
     * @param  array $valid_data
     *
     * @return array
     */
    public function update_amount($donation_data, $valid_data): array
    {
        $enabledFee = give_get_option('lkn_fee_recovery_setting_field', 'disabled');
        $enabledFeeMeta = apply_filters('fee_recovery_update_amount_enabled', $enabledFee, $donation_data['post_data']);
        if (
            isset($donation_data['post_data']['lkn-fee-recovery'])
            && 'yes' === $donation_data['post_data']['lkn-fee-recovery']
            && 'global' === $enabledFee
            && 'global' === $enabledFeeMeta
        ) {
            $price = (float) ($donation_data['price']);
            $feeValue = (float) (give_get_option('lkn_fee_recovery_setting_field_fixed', 0));
            $feeValuePercent = (float) (give_get_option('lkn_fee_recovery_setting_field_percent', 0)) / 100;
            $feeTotal = $price * (1 + $feeValuePercent) + $feeValue;

            $donation_data['price'] = (float) $feeTotal;
        }

        return $donation_data;
    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - Fee_Recovery_For_Givewp_Loader. Orchestrates the hooks of the plugin.
     * - Fee_Recovery_For_Givewp_i18n. Defines internationalization functionality.
     * - Fee_Recovery_For_Givewp_Admin. Defines all hooks for the admin area.
     * - Fee_Recovery_For_Givewp_Public. Defines all hooks for the public side of the site.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.
     *
     * @since    1.0.0
     */
    private function load_dependencies(): void
    {
        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */
        require_once plugin_dir_path(__DIR__) . 'includes/class-fee-recovery-for-givewp-loader.php';

        /**
         * The class responsible for defining internationalization functionality
         * of the plugin.
         */
        require_once plugin_dir_path(__DIR__) . 'includes/class-fee-recovery-for-givewp-i18n.php';

        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once plugin_dir_path(__DIR__) . 'admin/class-fee-recovery-for-givewp-admin.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once plugin_dir_path(__DIR__) . 'public/class-fee-recovery-for-givewp-public.php';

        $this->loader = new Fee_Recovery_For_Givewp_Loader();
    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the Fee_Recovery_For_Givewp_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     */
    private function set_locale(): void
    {
        $plugin_i18n = new Fee_Recovery_For_Givewp_i18n();

        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     */
    private function define_admin_hooks(): void
    {
        $plugin_admin = new Fee_Recovery_For_Givewp_Admin($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
        $this->loader->add_filter('plugin_action_links_' . FEE_RECOVERY_FOR_GIVEWP_BASENAME, $this, 'define_row_meta', 10, 2);
    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @since    1.0.0
     */
    private function define_public_hooks(): void
    {
        $plugin_public = new Fee_Recovery_For_Givewp_Public($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
        $this->loader->add_filter('give_donation_data_before_gateway', $this, 'update_amount', 99, 2);
        $this->loader->add_action('give_init', $this, 'initialize_new_form');
        $this->loader->add_filter('get_post_metadata', $this, 'lkn_fee_update_amount', 10, 4);

        add_action('givewp_donation_form_schema', function (DonationForm $form, $formId): void {
            $enabledFee = give_get_option('lkn_fee_recovery_vfb', 'disabled');

            if ('disabled' !== $enabledFee) {

                $fieldName = 'lkn_fee_recovery_enabled';
                $nonceAction = 'fee_recovery_nonce';
                $nonceValue = wp_create_nonce($nonceAction);

                // Verifica se o campo já existe
                $fields = $form->getFields();
                foreach ($fields as $field) {
                    if ($field->getName() === $fieldName) {
                        return; // Se o campo já existe, sai da função
                    }
                }

                $description = give_get_option('lkn_fee_recovery_setting_field_description', __('Cover the payment fee?', 'fee-recovery-for-givewp'));

                // Cria o campo checkbox
                $field = Give\Framework\FieldsAPI\Checkbox::make($fieldName)
                    ->label($description)
                    ->showInReceipt(false);

                $nonce_field = Give\Framework\FieldsAPI\Hidden::make("fee_recovery_enabled_nonce")
                    ->defaultValue($nonceValue)
                    ->showInReceipt(false);

                // Insere o campo após o campo de email
                $form->insertAfter('email', $field);
                $form->insertAfter('email', $nonce_field);

                // Enfileira o script e localiza variáveis
                $feeValue = (float) give_get_option('lkn_fee_recovery_setting_field_fixed', 0);
                $feeValuePercent = (float) give_get_option('lkn_fee_recovery_setting_field_percent', 0) / 100;

                if ('disabled' !== $enabledFee) {
                    wp_enqueue_script('lkn-fee-recovery-new-form', FEE_RECOVERY_FOR_GIVEWP_URL . '/public/js/fee-recovery-for-givewp-new-form.js', array(), $this->version, true);
                    wp_localize_script('lkn-fee-recovery-new-form', 'varsPhp', array(
                        'description' => $description,
                        'feeValue' => $feeValue,
                        'feeValuePercent' => $feeValuePercent,
                        'enabledFee' => $enabledFee,
                        'currency' => give_currency_symbol(give_get_currency())
                    ));
                }
            }
        }, 10, 2); // Prioridade 10 e 2 argumentos
    }

    public function lkn_fee_custom_metadata()
    {
        add_filter('get_post_metadata', array($this, 'lkn_fee_update_amount'), 10, 4);
    }

    public function lkn_fee_update_amount($value, $object_id, $meta_key, $single)
    {
        static $default_amount = null;
        static $default_give_amount = null;

        if (
            isset($_POST['lkn_fee_recovery_enabled']) &&
            (sanitize_text_field(wp_unslash($_POST['lkn_fee_recovery_enabled'])) === 'true' ||
            sanitize_text_field(wp_unslash($_POST['lkn_fee_recovery_enabled'])) === '1')
        ) {
            if ($default_amount === null) {
                $default_amount = isset($_POST['amount']) ? floatval(wp_unslash($_POST['amount'])) : 0;

                if ($default_amount === 0) {
                    give_set_error(
                        'lkn-invalid-amount', // ID único do erro
                        __('The donation amount must be greater than zero.', 'fee-recovery-for-givewp')
                    );
                }

                $user_ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
                $form_id = isset($_POST['formId']) ? sanitize_text_field(wp_unslash($_POST['formId'])) : 'unknown';
                $transient_key = 'lkn_fee_recovery_' . md5($user_ip . $form_id);
                $feeCheckout = sanitize_text_field(wp_unslash($_POST['lkn_fee_recovery_enabled']));

                set_transient($transient_key, $feeCheckout, 7);
            }

            $feeValue = (float) give_get_option('lkn_fee_recovery_setting_field_fixed', 0);
            $feeValuePercent = (float) give_get_option('lkn_fee_recovery_setting_field_percent', 0) / 100;

            $_POST['amount'] = ceil(($default_amount * $feeValuePercent) + $feeValue + $default_amount);
        }

        if (isset($_POST['give-amount'])) {
            if ($default_give_amount === null) {
                $default_give_amount = isset($_POST['give-amount']) ? floatval(wp_unslash($_POST['give-amount'])) : 0;

                if ($default_give_amount === 0) {
                    give_set_error(
                        'lkn-invalid-amount', // ID único do erro
                        __('The donation amount must be greater than zero.', 'fee-recovery-for-givewp')
                    );
                }

                $user_ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
                $form_id = isset($_POST['give-form-id']) ? sanitize_text_field(wp_unslash($_POST['give-form-id'])) : 'unknown';
                $transient_key = 'lkn_fee_recovery_' . md5($user_ip . $form_id);

                $fee_enabled = get_transient($transient_key);
            }

            if (!empty($fee_enabled)) {
                $feeValue = (float) give_get_option('lkn_fee_recovery_setting_field_fixed', 0);
                $feeValuePercent = (float) give_get_option('lkn_fee_recovery_setting_field_percent', 0) / 100;

                $_POST['give-amount'] = ceil(($default_give_amount * $feeValuePercent) + $feeValue + $default_give_amount);
            }

        }

        return null;
    }

    /**
     * Define meta links for plugin
     *
     * @since 1.0.0
     *
     * @param  array $plugin_meta
     * @param  string $plugin_file
     *
     * @return array
     */
    public function define_row_meta($plugin_meta, $plugin_file): array
    {
        if (! defined(FEE_RECOVERY_FOR_GIVEWP_BASENAME) && ! is_plugin_active(FEE_RECOVERY_FOR_GIVEWP_BASENAME)) {
            return $plugin_meta;
        }

        $new_meta_links['setting'] = sprintf(
            '<a href="%1$s">%2$s</a>',
            admin_url('edit.php?post_type=give_forms&page=give-settings&tab=general&section=lkn-fee-recovery'),
            __('Settings', 'fee-recovery-for-givewp')
        );

        return array_merge($plugin_meta, $new_meta_links);
    }

    // Chamada de Hooks do Formulário 3.0
    public function initialize_new_form(): void
    {
        Hooks::addFilter('givewp_donation_creating', __CLASS__, 'change_amount', 10, 2);
    }

    // Action que faz a mudança do valor da doação
    public static function change_amount(Donation $donation): void
    {
        if (isset($_POST["lkn_fee_recovery_enabled"]) &&
            "true" == $_POST["lkn_fee_recovery_enabled"] &&
            isset($_POST['fee_recovery_enabled_nonce']) &&
            wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['fee_recovery_enabled_nonce'])), 'fee_recovery_nonce')
        ) {
            $price = (float) ($donation->amount->formatToDecimal());
            $feeValue = (float) (give_get_option('lkn_fee_recovery_setting_field_fixed', 0));
            $feeValuePercent = (float) (give_get_option('lkn_fee_recovery_setting_field_percent', 0)) / 100;
            $feeTotal = ($price * (1 + $feeValuePercent) + $feeValue) * 100;

            $donation->amount = new Money($feeTotal, give_get_currency($donation->formId));
        }
    }
}
