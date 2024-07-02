import {
  __experimentalGrid as Grid,
  __experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Setting control for the containerHeight and containerWidth attributes
 *
 * @param {number}   props.containerHeight  Container height
 * @param {number}   props.containerWidth   Container width
 * @param {function} props.setAttributes    Update block attributes
 */
const SettingsContainerSize = ({ containerBoxHeight, containerBoxWidth, setAttributes }) => {
  const availableUnits = [
    {
      a11yLabel: 'Pixels (px)',
      label: 'px',
      step: 1,
      value: 'px',
    },
  ];

  return (
    <Grid columns={2} gap={2}>
      <UnitControl
        label={__('Width', 'bigbite-image-comparison')}
        onChange={(newWidth) => setAttributes({ containerWidth: newWidth })}
        value={containerBoxWidth}
        units={availableUnits}
      />
      <UnitControl
        label={__('Height', 'bigbite-image-comparison')}
        onChange={(newHeight) => setAttributes({ containerHeight: newHeight })}
        value={containerBoxHeight}
        units={availableUnits}
      />
    </Grid>
  );
};

export default SettingsContainerSize;
