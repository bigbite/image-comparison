/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

/**
 * Setting control for the dividerThickness attribute
 *
 * @param {object}   props                  Component props
 * @param {number}   props.dividerThickness Divider thickness
 * @param {function} props.setAttributes    Update block attributes
 */
const SettingsDividerThickness = ({ dividerThickness, setAttributes }) => (
  <RangeControl
    min={0}
    max={64}
    step={1}
    initialPosition={dividerThickness}
    label={__('Thickness (px)', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ dividerThickness: value })}
  />
);

export default SettingsDividerThickness;
