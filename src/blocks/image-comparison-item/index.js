/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './components/Edit';
import './styles/editor.scss';
import metadata from '../../../inc/blocks/image-comparison-item/block.json';

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null, // eslint-disable-line jsdoc/require-jsdoc -- not necessary
});
