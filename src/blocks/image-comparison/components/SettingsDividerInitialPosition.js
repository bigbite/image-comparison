/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

/**
 * Setting control for the dividerInitialPosition attribute
 *
 * @param {object}   props                        Component props
 * @param {number}   props.dividerInitialPosition Dividers initial position
 * @param {function} props.setAttributes          Update block attributes
 */
const SettingsDividerInitialPosition = ({ dividerInitialPosition, setAttributes }) => (
  <RangeControl
    min={0}
    step={1}
    max={100}
    initialPosition={dividerInitialPosition}
    label={__('Divider Initial Position', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ dividerInitialPosition: value })}
  />
);

export default SettingsDividerInitialPosition;
