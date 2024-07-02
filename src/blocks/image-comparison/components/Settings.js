/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import {
  withColors,
  ContrastChecker,
  InspectorControls,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import SettingsCaption from './SettingsCaption';
import SettingsOverflow from './SettingsOverflow';
import SettingsDividerAxis from './SettingsDividerAxis';
import SettingsContainerSize from './SettingsContainerSize';
import SettingsDividerIconGap from './SettingsDividerIconGap';
import SettingsDividerBoxWidth from './SettingsDividerBoxWidth';
import SettingsDividerBoxHeight from './SettingsDividerBoxHeight';
import SettingsDividerThickness from './SettingsDividerThickness';
import SettingsDividerInitialPosition from './SettingsDividerInitialPosition';
import SettingsDividerBoxBorderRadius from './SettingsDividerBoxBorderRadius';

/**
 * Renders block inspector controls sidebar
 *
 * @param {object}   props                      Component props
 * @param {object}   props.attributes           Block attributes
 * @param {function} props.setAttributes        Update block attributes
 * @param {string}   props.clientId             Client ID
 * @param {string}   props.dividerColour        Divider colour
 * @param {function} props.setDividerColour     Set divider colour
 * @param {string}   props.dividerBoxColour     Divider box colour
 * @param {function} props.setDividerBoxColour  Set divider box colour
 * @param {string}   props.dividerIconColour    Divider icon colour
 * @param {function} props.setDividerIconColour Set divider icon colour
 */
const Settings = ({
  attributes: {
    overflow,
    dividerInitialPosition,
    dividerAxis,
    dividerThickness,
    customDividerColour,
    customDividerBoxColour,
    dividerBoxWidth,
    dividerBoxHeight,
    dividerBoxBorderRadius,
    customDividerIconColour,
    dividerIconGap,
    hasCaption,
    customCaptionTextColour,
    customCaptionBackgroundColour,
    containerHeight,
    containerWidth,
  },
  setAttributes,
  clientId,
  dividerColour,
  setDividerColour,
  dividerBoxColour,
  setDividerBoxColour,
  dividerIconColour,
  setDividerIconColour,
  captionTextColour,
  setCaptionTextColour,
  captionBackgroundColour,
  setCaptionBackgroundColour,
}) => {
  // extra required settings for experimental `ColorGradientSettingsDropdown`
  const { colors, disableCustomColors } = useMultipleOriginColorsAndGradients();

  // custom colour settings for use with experimental `ColorGradientSettingsDropdown`
  const colourSettings = [
    {
      label: __('Divider', 'bigbite-image-comparison'),
      colorValue: dividerColour?.color || customDividerColour,
      /**
       * Updates dividerColour and customDividerColour attributes
       *
       * @param {string} value Colour value
       */
      onColorChange: (value = '') => {
        setDividerColour(value);
        setAttributes({ customDividerColour: value });
      },
    },
    {
      label: __('Divider Box', 'bigbite-image-comparison'),
      colorValue: dividerBoxColour?.color || customDividerBoxColour,
      /**
       * Updates dividerBoxColour and customDividerBoxColour attributes
       *
       * @param {string} value Colour value
       */
      onColorChange: (value = '') => {
        setDividerBoxColour(value);
        setAttributes({ customDividerBoxColour: value });
      },
    },
    {
      label: __('Divider Icon', 'bigbite-image-comparison'),
      colorValue: dividerIconColour?.color || customDividerIconColour,
      /**
       * Updates dividerIconColour and customDividerIconColour attributes
       *
       * @param {string} value Colour value
       */
      onColorChange: (value = '') => {
        setDividerIconColour(value);
        setAttributes({ customDividerIconColour: value });
      },
    },
  ];

  if (hasCaption) {
    colourSettings?.push(
      {
        label: __('Caption Text', 'bigbite-image-comparison'),
        colorValue: captionTextColour?.color || customCaptionTextColour,
        /**
         * Updates captionTextColour and customCaptionTextColour attributes
         *
         * @param {string} value Colour value
         */
        onColorChange: (value) => {
          setCaptionTextColour(value);
          setAttributes({ customCaptionTextColour: value });
        },
      },
      {
        label: __('Caption Background', 'bigbite-image-comparison'),
        colorValue: captionBackgroundColour?.color || customCaptionBackgroundColour,
        /**
         * Updates captionBackgroundColour and customCaptionBackgroundColour attributes
         *
         * @param {string} value Colour value
         */
        onColorChange: (value) => {
          setCaptionBackgroundColour(value);
          setAttributes({ customCaptionBackgroundColour: value });
        },
      },
    );
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Settings', 'bigbite-image-comparison')}>
          <SettingsOverflow overflow={overflow} setAttributes={setAttributes} />
          <SettingsCaption hasCaption={hasCaption} setAttributes={setAttributes} />
          <SettingsContainerSize
            containerBoxHeight={containerHeight}
            containerBoxWidth={containerWidth}
            setAttributes={setAttributes}
          />
          <SettingsDividerInitialPosition
            setAttributes={setAttributes}
            dividerInitialPosition={dividerInitialPosition}
          />
          <SettingsDividerAxis dividerAxis={dividerAxis} setAttributes={setAttributes} />
        </PanelBody>
      </InspectorControls>
      <InspectorControls group="styles">
        <PanelBody title={__('Divider', 'bigbite-image-comparison')}>
          <SettingsDividerThickness
            setAttributes={setAttributes}
            dividerThickness={dividerThickness}
          />
          <SettingsDividerBoxWidth
            setAttributes={setAttributes}
            dividerBoxWidth={dividerBoxWidth}
          />
          <SettingsDividerBoxHeight
            setAttributes={setAttributes}
            dividerBoxHeight={dividerBoxHeight}
          />
          <SettingsDividerBoxBorderRadius
            setAttributes={setAttributes}
            dividerBoxBorderRadius={dividerBoxBorderRadius}
          />
          <SettingsDividerIconGap dividerIconGap={dividerIconGap} setAttributes={setAttributes} />
        </PanelBody>
      </InspectorControls>
      <InspectorControls group="color">
        <ColorGradientSettingsDropdown
          colors={colors}
          panelId={clientId}
          settings={colourSettings}
          hasColorsOrGradients={false}
          __experimentalIsRenderedInSidebar
          disableCustomColors={disableCustomColors}
        />
        {hasCaption && (
          <ContrastChecker
            textColor={customCaptionTextColour}
            backgroundColor={customCaptionBackgroundColour}
          />
        )}
      </InspectorControls>
    </>
  );
};

const colourAttributes = {
  dividerColour: 'divider-colour',
  dividerBoxColour: 'divider-box-colour',
  dividerIconColour: 'divider-icon-colour',
  captionTextColour: 'caption-text-colour',
  captionBackgroundColour: 'caption-background-colour',
};

export default withColors(colourAttributes)(Settings);
