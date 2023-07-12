<?php

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
    <input type="hidden" id="lkn-fee-recovery-value" value="<?php esc_attr_e($args['feeValue']); ?>" />
    <input type="hidden" id="lkn-fee-recovery-percent" value="<?php esc_attr_e($args['feeValuePercent']); ?>" />

    <ul>
        <li style="list-style-type: none;padding: 0px 0px !important;background-color: #ffffff;border: none;">
            <div id="lkn-fee-recovery-wrap">
                <input class="give-input" type="checkbox" id="lkn-fee-recovery-input" name="lkn-fee-recovery"
                    value="no">
                <label class="lkn-fee-recovery-label"
                    for="lkn-fee-recovery-input"><?php esc_html_e($args['description'], FEE_RECOVERY_FOR_GIVEWP_TEXT_DOMAIN); ?></label>
            </div>
        </li>
    </ul>
</div>
