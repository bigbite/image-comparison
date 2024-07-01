/**
 * External dependencies
 */
import { ResizableBox } from '@wordpress/components';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Caption from './Caption';
import Settings from './Settings';
import Container from './Container';

/**
 * Block edit function
 *
 * @param {object}   props               Component props
 * @param {object}   props.attributes    Block attributes
 * @param {function} props.setAttributes Update block attributes
 * @param {string}   props.clientId      Block client ID
 */
const Edit = ({ attributes, setAttributes, clientId }) => {
  const {
    overflow,
    dividerInitialPosition,
    dividerAxis,
    dividerThickness,
    dividerColour,
    customDividerColour,
    dividerBoxColour,
    customDividerBoxColour,
    dividerBoxWidth,
    dividerBoxHeight,
    dividerBoxBorderRadius,
    dividerIconColour,
    customDividerIconColour,
    dividerIconGap,
    hasCaption,
    caption,
    captionTextColour,
    customCaptionTextColour,
    captionBackgroundColour,
    customCaptionBackgroundColour,
    containerHeight,
    containerWidth,
  } = attributes;

  const innerBlockSettings = {
    template: [['bigbite/image-comparison-item'], ['bigbite/image-comparison-item']],
    templateLock: 'inserter',
    orientation: dividerAxis === 'horizontal' ? 'vertical' : 'horizontal',
  };

  const blockProps = useBlockProps({
    style: {
      '--bigbite-image-comparison-overflow': overflow ? 'visible' : 'hidden',
      '--bigbite-image-comparison-divider-initial-position': dividerInitialPosition,
      '--bigbite-image-comparison-divider-thickness': dividerThickness,
      '--bigbite-image-comparison-divider-box-width': dividerBoxWidth,
      '--bigbite-image-comparison-divider-box-height': dividerBoxHeight,
      '--bigbite-image-comparison-divider-box-border-radius': dividerBoxBorderRadius?.top,
      '--bigbite-image-comparison-divider-icon-gap': dividerIconGap,
      '--bigbite-image-comparison-divider-colour': dividerColour
        ? `var( --wp--preset--color--${dividerColour}, ${customDividerColour} )`
        : customDividerColour,
      '--bigbite-image-comparison-divider-box-colour': dividerBoxColour
        ? `var( --wp--preset--color--${dividerBoxColour}, ${customDividerBoxColour} )`
        : customDividerBoxColour,
      '--bigbite-image-comparison-divider-icon-colour': dividerIconColour
        ? `var( --wp--preset--color--${dividerIconColour}, ${customDividerIconColour} )`
        : customDividerIconColour,
      '--bigbite-image-comparison-caption-text-colour': captionTextColour
        ? `var( --wp--preset--color--${captionTextColour}, ${customCaptionTextColour} )`
        : customCaptionTextColour,
      '--bigbite-image-comparison-caption-background-colour': captionBackgroundColour
        ? `var( --wp--preset--color--${captionBackgroundColour}, ${customCaptionBackgroundColour} )`
        : customCaptionBackgroundColour,
    },
    className: {
      'wp-block-bigbite-image-comparison--horizontal': dividerAxis === 'horizontal',
    },
  });

  const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, innerBlockSettings);

  /**
   * Handle the container resize
   *
   * @param object delta - The delta object with the height and width changes
   */
  const handleContainerResize = (event, direction, elt, delta) => {
    setAttributes({
      containerHeight: Number(containerHeight) + delta.height,
      containerWidth: Number(containerWidth) + delta.width,
    });
  };

  /**
   * TODO - If images are found, allow resize. If no images, do not allow resize.
   */
  const canResize = true;

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} clientId={clientId} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading -- recommended usage of innerBlockProps */}
      <figure {...innerBlocksProps}>
        <ResizableBox
          showHandle
          enable={{
            bottom: canResize,
            bottomLeft: false,
            bottomRight: canResize,
            left: false,
            right: canResize,
            top: false,
            topLeft: false,
            topRight: false,
          }}
          size={{
            height: containerHeight,
            width: containerWidth,
          }}
          minHeight="150"
          minWidth="150"
          maxWidth="100%"
          onResizeStop={(event, direction, elt, delta) =>
            handleContainerResize(event, direction, elt, delta)
          }
        >
          <Container>{children}</Container>
          {hasCaption && <Caption caption={caption} setAttributes={setAttributes} />}
        </ResizableBox>
      </figure>
    </>
  );
};

export default Edit;
