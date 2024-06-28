/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * Setting control for the dividerAxis attribute
 *
 * @param {object}   props               Component props
 * @param {number}   props.dividerAxis   Divider axis
 * @param {function} props.setAttributes Update block attributes
 */
const SettingsDividerAxis = ({ dividerAxis, setAttributes }) => (
  <ToggleGroupControl
    isBlock
    value={dividerAxis}
    label={__('Divider Axis', 'bigbite-image-comparison')}
    onChange={(value) => setAttributes({ dividerAxis: value })}
    help={__('The axis on which the divider will be oriented', 'bigbite-image-comparison')}
  >
    <ToggleGroupControlOption value="vertical" label={__('Vertical', 'bigbite-image-comparison')} />
    <ToggleGroupControlOption
      value="horizontal"
      label={__('Horizontal', 'bigbite-image-comparison')}
    />
  </ToggleGroupControl>
);

export default SettingsDividerAxis;
