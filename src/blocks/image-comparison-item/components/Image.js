/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Flex, FlexItem } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Renders image in various states
 *
 * @param {object}   props                 Component props
 * @param {object}   props.blockProps      Block generated props
 * @param {number}   props.id              Selected image id
 * @param {string}   props.url             Selected image url
 * @param {string}   props.alternativeText Alternative image text
 * @param {function} props.setAttributes   Update block attributes
 */
const Image = ({ blockProps, id, url, alternativeText, setAttributes }) => {
  if (id && url) {
    // eslint-disable-next-line react/jsx-props-no-spreading -- recommended usage of blockProps
    return <img {...blockProps} src={url} alt={alternativeText} />;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading -- recommended usage of blockProps
    <div {...blockProps}>
      <MediaUploadCheck>
        <MediaUpload
          value={id}
          allowedTypes={['image']}
          onSelect={(media) => setAttributes({ id: media?.id, url: media?.url })}
          render={({ open }) => (
            <Flex
              className="bigbite-image-comparison-item--uploader"
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
