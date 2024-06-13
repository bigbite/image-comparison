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
const Caption = ({ caption, setAttributes }) => {
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
      value={caption}
      disableLineBreaks
      identifier={caption}
      tagName="figcaption"
      allowedFormats={allowedFormats}
      className="bigbite-image-comparison--caption"
      onChange={(value) => setAttributes({ caption: value })}
      placeholder={__('Please enter a caption', 'bigbite-image-comparison')}
    />
  );
};

export default Caption;
