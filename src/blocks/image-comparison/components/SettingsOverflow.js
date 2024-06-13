/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

/**
 * Setting control for the overflow attribute
 *
 * @param {object}   props               Component props
 * @param {bool}     props.overflow      Overflow attribute
 * @param {function} props.setAttributes Update block attributes
 */
const SettingsOverflow = ({ overflow, setAttributes }) => (
  <ToggleControl
    checked={overflow}
    label={__('Overflow', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ overflow: value })}
    help={__('Allow the divider to overflow the container', 'bigbite-image-comparison')}
  />
);

export default SettingsOverflow;
