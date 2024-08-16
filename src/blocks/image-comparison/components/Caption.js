/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Caption attribute editor
 *
 * @param {object}   props               Component props
 * @param {string}   props.caption       Caption string
 * @param {function} props.setAttributes Update block attributes
 */
const Caption = ({ caption, setAttributes, uniqueId }) => {
  const allowedFormats = [
    'core/link',
    'core/bold',
    'core/code',
    'core/italic',
    'core/language',
    'core/keyboard',
    'core/subscript',
    'core/text-color',
    'core/superscript',
    'core/strikethrough',
  ];

  return (
    <RichText
      id={uniqueId}
      value={caption}
      disableLineBreaks
      identifier={caption}
      tagName="figcaption"
      allowedFormats={allowedFormats}
      className="wp-block-bigbite-image-comparison__caption"
      onChange={(value) => setAttributes({ caption: value })}
      placeholder={__('Please enter a caption', 'bigbite-image-comparison')}
    />
  );
};

export default Caption;
