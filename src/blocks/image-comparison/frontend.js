/**
 * A list of `bigbite/image-comparison` blocks
 *
 * @type {NodeList}
 */
const imageComparisonBlocks = document.querySelectorAll('.wp-block-bigbite-image-comparison');

if (imageComparisonBlocks?.length > 0) {
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
   *
   * @param {object} event pointerdown event
   */
  const activateIsPointerDownState = (event) => {
    /**
     * Array of allowed mouse buttons
     *
     * 0 = left click
     * 1 = middle click
     * 2 = right click
     * 3 = back button
     * 4 = forward button
     */
    const allowedMouseButtons = [0];
    const clickedMouseButton = event?.button;
    if (allowedMouseButtons.includes(clickedMouseButton)) {
      isPointerDown = true;
    }
  };

  /**
   * Controls the image comparison via pointer inputs
   *
   * @param {object}  event                pointermove event
   * @param {element} imageComparisonBlock Image comparison block element
   */
  const pointerController = (event, imageComparisonBlock) => {
    // skip if `pointer` is not in a `pointerdown` state
    if (!isPointerDown) {
      return;
    }

    const imageContainer = imageComparisonBlock.querySelector(
      '.wp-block-bigbite-image-comparison__container',
    );

    const hasHorizontalAxisDivider = imageContainer?.parentElement?.classList?.contains(
      'wp-block-bigbite-image-comparison--horizontal',
    );

    const client = hasHorizontalAxisDivider ? event?.clientY : event?.clientX;
    const targetDOMRect = event?.target?.getBoundingClientRect();
    const targetPositionOffset = hasHorizontalAxisDivider ? targetDOMRect?.y : targetDOMRect?.x;
    let position =
      ((client - targetPositionOffset) /
        (hasHorizontalAxisDivider ? targetDOMRect?.height : targetDOMRect?.width)) *
      100;

    if (position < 0) {
      position = 0;
    } else if (position > 100) {
      position = 100;
    }

    imageComparisonBlock.style.setProperty(
      '--bigbite-image-comparison-divider-initial-position',
      position,
    );
  };

  /**
   * Controls the image comparison via keyboard inputs
   *
   * @param {object}  event                keydown event
   * @param {element} imageComparisonBlock Image comparison block element
   */
  const keyboardController = (event, imageComparisonBlock) => {
    const keyCode = event?.keyCode;
    let position;

    const imageContainer = imageComparisonBlock.querySelector(
      '.wp-block-bigbite-image-comparison__container',
    );

    const hasHorizontalAxisDivider = imageContainer?.parentElement?.classList?.contains(
      'wp-block-bigbite-image-comparison--horizontal',
    );

    const allowedKeycodes = hasHorizontalAxisDivider ? [38, 40] : [37, 39];

    if (!allowedKeycodes.includes(keyCode)) {
      return;
    }

    event.preventDefault();

    const currentPosition = parseInt(
      imageComparisonBlock.style.getPropertyValue(
        '--bigbite-image-comparison-divider-initial-position',
      ),
      10,
    );

    if (allowedKeycodes.indexOf(keyCode) === 0) {
      position = currentPosition - 10;
    } else {
      position = currentPosition + 10;
    }

    if (position < 0) {
      position = 0;
    } else if (position > 100) {
      position = 100;
    }

    imageComparisonBlock.style.setProperty(
      '--bigbite-image-comparison-divider-initial-position',
      position,
    );
  };

  /**
   * Setup event listeners and selectors on each block
   */
  imageComparisonBlocks?.forEach((imageComparisonBlock) => {
    const imageContainer = imageComparisonBlock.querySelector(
      '.wp-block-bigbite-image-comparison__container',
    );

    const dividerButton = imageComparisonBlock.querySelector(
      '.wp-block-bigbite-image-comparison__divider button',
    );

    imageContainer.addEventListener('pointerdown', (event) => activateIsPointerDownState(event));
    imageContainer.addEventListener('pointermove', (event) =>
      pointerController(event, imageComparisonBlock),
    );

    dividerButton.addEventListener('keydown', (event) =>
      keyboardController(event, imageComparisonBlock),
    );
  });

  /**
   * Deactivate `pointerdown` cached state
   */
  window.addEventListener('pointerup', deactivateIsPointerDownState);
}
