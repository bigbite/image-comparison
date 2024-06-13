/**
 * A list of `bigbite/image-comparison` blocks
 *
 * @type {NodeList}
 */
const imageComparisons = document.querySelectorAll('.wp-block-bigbite-image-comparison');

if (imageComparisons) {
  /**
   * `pointerdown` event state
   *
   * @type {bool}
   */
  let isPointerDown = false;

  /**
   * Deactivate `pointerdown` cached state
   */
  const deactivateIsPointerDownState = () => {
    isPointerDown = false;
  };

  /**
   * Activate `pointerdown` cached state
   */
  const activateIsPointerDownState = () => {
    isPointerDown = true;
  };

  /**
   * Calculate relative pointer position and update elements
   *
   * @param {object}  event                  pointermove event
   * @param {element} divider                Divider element
   * @param {element} secondaryImage         Secondary image element
   * @param {bool}    hasVerticalAxisDivider Has vertical axis
   */
  const updatePositions = (event, divider, secondaryImage, hasVerticalAxisDivider) => {
    // skip if `pointer` is not in a `pointerdown` state
    if (!isPointerDown) {
      return;
    }

    const client = hasVerticalAxisDivider ? event?.clientY : event?.clientX;
    const targetDOMRect = event?.target?.getBoundingClientRect();
    const targetPositionOffset = hasVerticalAxisDivider ? targetDOMRect?.y : targetDOMRect?.x;
    const targetValue = hasVerticalAxisDivider ? targetDOMRect?.height : targetDOMRect?.width;
    let position = client - targetPositionOffset;

    if (position < 0) {
      position = 0;
    } else if (position > targetValue) {
      position = targetValue;
    }

    /* eslint-disable no-param-reassign -- assignments are to HTML DOM elements */
    divider.style[hasVerticalAxisDivider ? 'top' : 'left'] = `${position}px`;
    secondaryImage.style.clipPath = `inset(${
      hasVerticalAxisDivider ? `${position}px 0 0 0` : `0 0 0 ${position}px`
    }`;
    /* eslint-enable */
  };

  /**
   * Setup event listeners and selectors on each block
   */
  imageComparisons?.forEach((imageComparison) => {
    const imageContainer = imageComparison.querySelector('.bigbite-image-comparison--container');
    const divider = imageComparison.querySelector('.bigbite-image-comparison--divider');
    const secondaryImage = imageComparison.querySelector(
      '.bigbite-image-comparison--container img:last-of-type',
    );
    const hasVerticalAxisDivider = imageContainer?.parentElement?.classList?.contains(
      'bigbite-image-comparison--divider--horizontal-axis',
    );

    imageContainer.addEventListener('pointerdown', activateIsPointerDownState);
    imageContainer.addEventListener('pointermove', (event) =>
      updatePositions(event, divider, secondaryImage, hasVerticalAxisDivider),
    );
  });

  /**
   * Deactivate `pointerdown` cached state
   */
  window.addEventListener('pointerup', deactivateIsPointerDownState);
}
