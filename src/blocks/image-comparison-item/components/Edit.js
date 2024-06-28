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
const Edit = ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} />
      <Image
        id={attributes?.id}
        url={attributes?.url}
        blockProps={blockProps}
        setAttributes={setAttributes}
      />
    </>
  );
};

export default Edit;
