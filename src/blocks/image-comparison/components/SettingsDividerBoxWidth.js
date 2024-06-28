/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

/**
 * Setting control for the dividerBoxWidth attribute
 *
 * @param {object}   props                 Component props
 * @param {number}   props.dividerBoxWidth Divider box width
 * @param {function} props.setAttributes   Update block attributes
 */
const SettingsDividerBoxWidth = ({ dividerBoxWidth, setAttributes }) => (
  <RangeControl
    min={32}
    step={1}
    max={128}
    initialPosition={dividerBoxWidth}
    label={__('Box Width (px)', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ dividerBoxWidth: value })}
  />
);

export default SettingsDividerBoxWidth;
