/**
 * External dependencies
 */
import { useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Block save function
 */
const Save = () => {
  const innerBlocks = useInnerBlocksProps.save();

  return innerBlocks?.children;
};

export default Save;
