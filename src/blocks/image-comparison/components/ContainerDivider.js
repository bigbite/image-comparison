/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Container divider
 */
const ContainerDivider = () => (
  <div className="wp-block-bigbite-image-comparison__divider">
    <button type="button" aria-label={__('Divider Button', 'bigbite-image-comparison')}>
      <span />
      <span />
    </button>
  </div>
);

export default ContainerDivider;
