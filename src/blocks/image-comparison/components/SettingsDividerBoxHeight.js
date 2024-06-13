/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

/**
 * Setting control for the dividerBoxHeight attribute
 *
 * @param {object}   props                  Component props
 * @param {number}   props.dividerBoxHeight Divider box height
 * @param {function} props.setAttributes    Update block attributes
 */
const SettingsDividerBoxHeight = ({ dividerBoxHeight, setAttributes }) => (
  <RangeControl
    min={32}
    step={1}
    max={128}
    initialPosition={dividerBoxHeight}
    label={__('Box Height (px)', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ dividerBoxHeight: value })}
  />
);

export default SettingsDividerBoxHeight;
