/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './components/Edit';
import Save from './components/Save';
import './styles/editor.scss';
import metadata from '../../../inc/blocks/image-comparison/block.json';

registerBlockType(metadata.name, {
  edit: Edit,
  save: Save,
});
