/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import './styles/editor.scss';
import './styles/style.scss';
import metadata from './block.json';

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null, // eslint-disable-line jsdoc/require-jsdoc -- not necessary
});
