/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import './styles/style.scss';
import './styles/editor.scss';
import metadata from './block.json';

registerBlockType(metadata.name, {
  edit: Edit,
  save: Save,
});
