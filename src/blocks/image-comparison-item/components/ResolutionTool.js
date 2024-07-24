/**
 * External dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';

const DEFAULT_SIZE_OPTIONS = [
  {
    label: _x('Thumbnail', 'Image size option for resolution control'),
    value: 'thumbnail',
  },
  {
    label: _x('Medium', 'Image size option for resolution control'),
    value: 'medium',
  },
  {
    label: _x('Large', 'Image size option for resolution control'),
    value: 'large',
  },
  {
    label: _x('Full Size', 'Image size option for resolution control'),
    value: 'full',
  },
];

/**
 * Resolution setting component
 *
 * @param {object}   props    Component props
 * @param {string}   value    Current value of the sizeSlug attribute
 * @param {function} props.setAttributes Update block attributes
 * @param {object}   DEFAULT_SIZE_OPTIONS Default options for size options.
 */
export default function ResolutionTool({
  id,
  value,
  setAttributes,
  defaultValue = DEFAULT_SIZE_OPTIONS[0].value,
}) {
  const image = useSelect(
    (select) => (id ? select(coreStore).getMedia(id, { context: 'view' }) : null),
    [id],
  );

  /**
   * Converts a given string by capitalizing the first letter of each word
   * and removing underscores.
   *
   * @param {string} str - The input string to be converted.
   * @returns {string} The converted string with capitalized words and spaces.
   *
   */
  const convertName = (str) =>
    str
      .split('_') // Split the string by underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words back together without underscores

  /**
   * Retrieves and formats the available image sizes from the current image object.
   *
   * @returns {Array<Object>|boolean} An array of objects with `label` and `value`
   * properties for each image size, or `false` if the `image` object is not defined.
   */
  const getImageSizes = () => {
    if (!image) return false;

    const { sizes: imageSizes } = image?.media_details ?? {};

    return Object.entries(imageSizes).map(([key]) => ({
      label: _x(
        `${convertName(key)}`,
        __('Image size option for resolution control', 'bigbite-image-comparison'),
      ),
      value: key,
    }));
  };

  // reset image resolution when image changes
  useEffect(() => {
    setAttributes({
      sizeSlug: 'full',
    });
  }, [id]);

  /**
   * Updates the image URL and size slug attributes based on the selected image size.
   *
   * @param {string} newSizeSlug - The slug of the new image size to be selected.
   * @returns {null|void} Returns `null` if the new URL is not found, otherwise
   * updates the attributes with the new URL and size slug.
   */
  const updateImage = (newSizeSlug) => {
    const newUrl = image?.media_details?.sizes?.[newSizeSlug]?.source_url;
    if (!newUrl) {
      return null;
    }

    return setAttributes({
      url: newUrl,
      sizeSlug: newSizeSlug,
    });
  };

  const displayValue = value ?? defaultValue;
  return (
    <SelectControl
      label={__('Resolution', 'bigbite-image-comparison')}
      value={displayValue}
      options={getImageSizes()}
      onChange={(val) => updateImage(val)}
      help={__('Select the size of the source image.', 'bigbite-image-comparison')}
      size="__unstable-large"
    />
  );
}
