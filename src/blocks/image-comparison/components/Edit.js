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

  /**
   * Initially set the resize handles to be hidden
   */
  let shouldDisplayResize = false;

  /**
   * Retrieve the inner blocks
   */
  const [{ innerBlocks }] = wp.data.select('core/block-editor').getBlocksByClientId(clientId);

  /**
   * Determine whether to allow the resize handles to be
   * displayed based on if an image is assigned or not
   */
  innerBlocks.forEach((block) => {
    if (block.attributes && block.attributes.id) {
      shouldDisplayResize = true;
    }
  });

  /**
   * Only ever display the right, bottom, and bottomRight handles
   */
  const resizeDirectionSettings = {
    bottom: shouldDisplayResize,
    bottomLeft: false,
    bottomRight: shouldDisplayResize,
    right: shouldDisplayResize,
    left: false,
    top: false,
    topLeft: false,
    topRight: false,
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
      '--bigbite-image-comparison-container-height': containerHeight,
      '--bigbite-image-comparison-container-width': containerWidth,
    },
    className: {
      'wp-block-bigbite-image-comparison--horizontal': dividerAxis === 'horizontal',
    },
  });

  const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, innerBlockSettings);

  /**
   * Function to update the value whilst retaining the measurement unit
   *
   * @param string  measurement  The current height / width
   * @param number  delta        Value to update the height / width by
   *
   * @return string
   */
  const updateMeasurement = (measurement, delta) => {
    /**
     * Regex to separate digits and unit
     */
    const regex = /(\d+)(.+)/;
    const parts = measurement.match(regex);
    if (parts) {
      /**
       * Define the numerical value
       */
      const value = parseInt(parts[1], 10);
      /**
       * Define the unit of measurement
       */
      const unit = parts[2];
      /**
       * Make the calculation and return the updated value with the measurement unit
       */
      return `${value + delta}${unit}`;
    }
    /**
     * Return the original value if no match is found
     */
    return measurement;
  };

  /**
   * Handle the container resize
   *
   * @param object delta - The delta object with the height and width changes
   */
  const handleContainerResize = (delta) => {
    const updatedHeight = updateMeasurement(containerHeight, delta.height);
    const updatedWidth = updateMeasurement(containerWidth, delta.width);
    setAttributes({
      containerHeight: updatedHeight,
      containerWidth: updatedWidth,
    });
  };

  return (
    <>
      <Settings
        attributes={attributes}
        shouldDisplayResize={shouldDisplayResize}
        setAttributes={setAttributes}
        clientId={clientId}
      />
      {/* eslint-disable-next-line react/jsx-props-no-spreading -- recommended usage of innerBlockProps */}
      <figure {...innerBlocksProps}>
        <ResizableBox
          showHandle
          enable={resizeDirectionSettings}
          size={{
            height: containerHeight,
            width: containerWidth,
          }}
          minHeight="150"
          minWidth="150"
          onResizeStop={(event, direction, elt, delta) => handleContainerResize(delta)}
        >
          <Container>{children}</Container>
        </ResizableBox>
        {hasCaption && <Caption caption={caption} setAttributes={setAttributes} />}
      </figure>
    </>
  );
};

export default Edit;
