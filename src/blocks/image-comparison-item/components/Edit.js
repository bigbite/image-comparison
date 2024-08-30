/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Image from './Image';
import Settings from './Settings';

/**
 * Block edit function
 *
 * @param {object}   props               Component props
 * @param {object}   props.attributes    Block attributes
 * @param {function} props.setAttributes Update block attributes
 */
const Edit = ({ attributes, setAttributes }) => (
  <>
    <Settings attributes={attributes} setAttributes={setAttributes} />
    {/* eslint-disable-next-line react/jsx-props-no-spreading -- this is the recommended approach */}
    <div {...useBlockProps()}>
      <Image id={attributes.id} sizeSlug={attributes.sizeSlug} setAttributes={setAttributes} />
    </div>
  </>
);

export default Edit;
