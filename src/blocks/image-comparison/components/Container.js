/**
 * Internal dependencies
 */
import ContainerDivider from './ContainerDivider';

/**
 * Container for item inner blocks
 *
 * @param {object} props          Component props
 * @param {object} props.children Children elements
 */
const Container = ({ children }) => (
  <div className="wp-block-bigbite-image-comparison__container">
    {children}
    <ContainerDivider />
  </div>
);

export default Container;
