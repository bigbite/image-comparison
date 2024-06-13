/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow } from '@wordpress/components';
import { InspectorControls, BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Image from './Image';
import AlternativeText from './AlternativeText';

/**
 * Renders block inspector controls sidebar
 *
 * @param {object}   props               Component props
 * @param {object}   props.attributes    Block attributes
 * @param {function} props.setAttributes Update block attributes
 */
const Settings = ({ attributes, setAttributes }) => (
  <>
    <InspectorControls>
      <PanelBody
        title={__('Settings', 'bigbite-image-comparison')}
        className="bigbite-image-comparison-item--settings"
      >
        <PanelRow>
          <Image
            id={attributes?.id}
            url={attributes?.url}
            setAttributes={setAttributes}
            alternativeText={attributes?.alternativeText}
          />
        </PanelRow>
        <PanelRow>
          <AlternativeText
            id={attributes?.id}
            setAttributes={setAttributes}
            alternativeText={attributes?.alternativeText}
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>
    <BlockControls group="other">
      <MediaReplaceFlow
        accept="image/*"
        mediaId={attributes?.id}
        allowedTypes={['image']}
        mediaURL={attributes?.url}
        onSelect={(media) => setAttributes({ id: media?.id, url: media?.url })}
        name={
          attributes?.id && attributes?.url
            ? __('Replace', 'bigbite-image-comparison')
            : __('Select Image', 'bigbite-image-comparison')
        }
      />
    </BlockControls>
  </>
);

export default Settings;
