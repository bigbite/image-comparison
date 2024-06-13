/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import './styles/editor.scss';
import metadata from '../../../inc/blocks/image-comparison/block.json';

registerBlockType(metadata.name, {
  edit,
  save,
});
