/**
 * External dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Caption from './components/Caption';
import Settings from './components/Settings';
import Container from './components/Container';

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

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} clientId={clientId} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading -- recommended usage of innerBlockProps */}
      <figure {...innerBlocksProps}>
        <Container>{children}</Container>
        {hasCaption && <Caption caption={caption} setAttributes={setAttributes} />}
      </figure>
    </>
  );
};

export default Edit;
