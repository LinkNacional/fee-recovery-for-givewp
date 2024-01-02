<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Provide a public-facing view for the plugin.
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @see       https://www.linknacional.com
 * @since      1.0.0
 */
?>

<div id="lkn-fee-recovery-checkbox-wrapper">
	<input type="hidden" id="lkn-fee-recovery-value"
		value="<?php echo esc_attr($args['feeValue']); ?>" />
	<input type="hidden" id="lkn-fee-recovery-percent"
		value="<?php echo esc_attr($args['feeValuePercent']); ?>" />
	<input type="hidden" id="lkn-fee-recovery-enabled"
		value="<?php echo esc_attr($args['feeEnabled']); ?>" />
	<input type="hidden" id="lkn-fee-recovery-original-description"
		value="<?php echo esc_attr($args['description']); ?>" />

	<ul id="lkn-fee-recovery-list-wrap">
		<li id="lkn-fee-recovery-list"
			style="list-style-type: none;padding: 0px 0px !important;background-color: #ffffff;border: none;">
			<div id="lkn-fee-recovery-wrap">
				<input class="give-input" type="checkbox" id="lkn-fee-recovery-input" name="lkn-fee-recovery"
					value="no">
				<label class="lkn-fee-recovery-label"
					for="lkn-fee-recovery-input"><?php echo esc_html($args['description']); ?></label>
			</div>
		</li>
	</ul>
</div>