<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://www.linknacional.com
 * @since      1.0.0
 *
 * @package    Fee_Recovery_For_Givewp
 * @subpackage Fee_Recovery_For_Givewp/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Fee_Recovery_For_Givewp
 * @subpackage Fee_Recovery_For_Givewp/includes
 * @author     Link Nacional <contato@linknacional.com>
 */
class Fee_Recovery_For_Givewp_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'fee-recovery-for-givewp',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
