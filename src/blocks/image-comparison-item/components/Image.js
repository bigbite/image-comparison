/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Flex, FlexItem } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

/**
 * Checks if WP generated the specified image size.
 *
 * @param {Object} image the image to pick from
 * @param {string} size  the size to locate
 *
 * @return {boolean} Whether or not it has default image size.
 */
function hasSize(image, size) {
  return (
    'url' in (image?.sizes?.[size] ?? {}) ||
    'source_url' in (image?.media_details?.sizes?.[size] ?? {})
  );
}

/**
 * Retrieve the URI for an image.
 *
 * @param {Object} image the image to pick from
 * @param {String} size  the size to locate
 *
 * @return {String} the located image size URI.
 */
function imageUrl(image, size) {
  return image?.sizes?.[size]?.url || image?.media_details?.sizes?.[size]?.source_url || image?.url;
}

/**
 * Renders image in various states
 *
 * @param {object}   props                 Component props
 * @param {object}   props.blockProps      Block generated props
 * @param {object}   props.attributes      Block attributes
 * @param {string}   props.alternativeText Alternative image text
 * @param {function} props.setAttributes   Update block attributes
 */
const Image = ({ blockProps, attributes, alternativeText, setAttributes }) => {
  const media = useSelect(
    (select) => attributes?.id && select(coreStore).getMedia(attributes.id, { context: 'view' }),
    [attributes],
  );

  const [src, setSrc] = useState();

  useEffect(() => {
    // Try to use the previous selected image size if its available
    // otherwise fallback to "full"
    let size = 'full';
    if (attributes?.sizeSlug && hasSize(media, attributes?.sizeSlug)) {
      size = attributes?.sizeSlug;
    }

    setSrc(imageUrl(media, size));
  }, [media, attributes?.sizeSlug]);

  if (media?.id && src) {
    // eslint-disable-next-line react/jsx-props-no-spreading -- recommended usage of blockProps
    return <img {...blockProps} src={src} alt={alternativeText} />;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading -- recommended usage of blockProps
    <div {...blockProps}>
      <MediaUploadCheck>
        <MediaUpload
          value={{ id: media?.id, src }}
          allowedTypes={['image']}
          onSelect={({ id }) => setAttributes({ id })}
          render={({ open }) => (
            <Flex
              className="wp-block-bigbite-image-comparison-item__uploader"
              direction="column"
              justify="center"
            >
              <FlexItem>
                <Button variant="primary" onClick={open}>
                  {__('Select Image', 'bigbite-image-comparison')}
                </Button>
              </FlexItem>
            </Flex>
          )}
        />
      </MediaUploadCheck>
    </div>
  );
};

export default Image;
