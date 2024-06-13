/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

/**
 * Setting control for the dividerIconGap attribute
 *
 * @param {object}   props                Component props
 * @param {number}   props.dividerIconGap Divider icon gap
 * @param {function} props.setAttributes  Update block attributes
 */
const SettingsDividerIconGap = ({ dividerIconGap, setAttributes }) => (
  <RangeControl
    min={0}
    step={1}
    max={100}
    initialPosition={dividerIconGap}
    label={__('Icon Gap (px)', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ dividerIconGap: value })}
  />
);

export default SettingsDividerIconGap;
