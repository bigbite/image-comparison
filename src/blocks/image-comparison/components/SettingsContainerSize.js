import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Setting control for the containerHeight and containerWidth attributes
 *
 * @param {number}   props.containerHeight  Container height
 * @param {number}   props.containerWidth   Container width
 * @param {function} props.setAttributes    Update block attributes
 */
const SettingsContainerSize = ({ containerBoxHeight, containerBoxWidth, setAttributes }) => (
  <>
    <TextControl
      type="number"
      value={containerBoxHeight}
      onChange={(newHeight) => setAttributes({ containerHeight: newHeight })}
      label={__('Container Height', 'bigbite-image-comparison')}
      help={__('Set the height of the container box.', 'bigbite-image-comparison')}
    />
    <TextControl
      type="number"
      value={containerBoxWidth}
      onChange={(newWidth) => setAttributes({ containerWidth: newWidth })}
      label={__('Container Width', 'bigbite-image-comparison')}
      help={__(
        'Set the width of the container box. Can not be wider than the parent width.',
        'bigbite-image-comparison',
      )}
    />
  </>
);

export default SettingsContainerSize;
