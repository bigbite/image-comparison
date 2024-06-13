/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import './styles/editor.scss';
import metadata from '../../../inc/blocks/image-comparison-item/block.json';

registerBlockType(metadata.name, {
  edit,
  save: () => null, // eslint-disable-line jsdoc/require-jsdoc -- not necessary
});
