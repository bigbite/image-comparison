/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

/**
 * Setting control for the hasCaption attribute
 *
 * @param {object}   props               Component props
 * @param {bool}     props.hasCaption    Has a caption
 * @param {function} props.setAttributes Update block attributes
 */
const SettingsCaption = ({ hasCaption, setAttributes }) => (
  <ToggleControl
    checked={hasCaption}
    label={__('Caption', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ hasCaption: value })}
    help={__('Allows a caption to be added', 'bigbite-image-comparison')}
  />
);

export default SettingsCaption;
