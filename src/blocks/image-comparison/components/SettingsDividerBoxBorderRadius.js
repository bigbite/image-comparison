/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

/**
 * Setting control for the dividerBoxBorderRadius attribute
 *
 * @param {object}   props                        Component props
 * @param {object}   props.dividerBoxBorderRadius Divider box border radius
 * @param {function} props.setAttributes          Update block attributes
 */
const SettingsDividerBoxBorderRadius = ({ dividerBoxBorderRadius, setAttributes }) => (
  <RangeControl
    min={0}
    max={64}
    step={1}
    initialPosition={dividerBoxBorderRadius?.top}
    label={__('Border Radius (px)', 'bigbite-image-comparison')}
    onChange={(value) =>
      setAttributes({
        dividerBoxBorderRadius: {
          top: value,
          right: value,
          bottom: value,
          left: value,
        },
      })
    }
  />
);

export default SettingsDividerBoxBorderRadius;
