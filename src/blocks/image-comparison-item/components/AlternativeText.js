/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';

/**
 * Renders alternative text controls
 *
 * @param {object}   props                 Component props
 * @param {number}   props.id              Selected image id
 * @param {string}   props.alternativeText Alternative image text
 * @param {function} props.setAttributes   Update block attributes
 */
const AlternativeText = ({ id, alternativeText, setAttributes }) => (
  <TextareaControl
    disabled={!id}
    maxLength={150}
    value={alternativeText}
    label={__('Alternative Text', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ alternativeText: value })}
    help={__(
      'Please describe the image, if left blank the original images alt text will be used if available.',
      'bigbite-image-comparison',
    )}
  />
);

export default AlternativeText;
