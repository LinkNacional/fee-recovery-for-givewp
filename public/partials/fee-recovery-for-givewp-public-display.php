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

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<div id="lkn-fee-recovery-checkbox-wrapper">
    <input type="hidden" id="lkn-fee-recovery-value" value="<?php echo $args['feeValue']; ?>" />
    <input type="hidden" id="lkn-fee-recovery-percent" value="<?php echo $args['feeValuePercent']; ?>" />

    <ul>
        <li style="list-style-type: none;padding: 0px 0px !important;background-color: #ffffff;border: none;">
            <div id="lkn-fee-recovery-wrap">
                <input class="give-input" type="checkbox" id="lkn-fee-recovery-input" name="lkn-fee-recovery"
                    value="no">
                <label class="lkn-fee-recovery-label"
                    for="lkn-fee-recovery-input"><?php esc_html_e($args['description']); ?></label>
            </div>
        </li>
    </ul>
</div>

<!-- // TODO add a method to load styles inside the iframe form -->
<style>
    /* #lkn-fee-recovery-checkbox {
        cursor: pointer;
        width: 15px;
        height: 15px;
    }

    #lkn-fee-recovery-wrap {
        padding: 2% 1% 2% 1%;
        position: relative;
        display: block;
        line-height: 1em;
        box-sizing: border-box;
        clear: both;
    }

    .lkn-fee-recovery-label {
        cursor: pointer;
        font-size: 1rem;
    } */
</style>