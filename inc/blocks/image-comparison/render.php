<?php
/**
 * Render for the Image Comparison block
 * 
 * @var array<mixed> $attributes The block attributes
 * @var string       $content    The block default content
 * @var WP_Block     $block      WP_Block class instance
 */

// check required inner block images are set before proceeding
if (
	empty( $block->parsed_block['innerBlocks'][0]['attrs']['id'] ) ||
	empty( $block->parsed_block['innerBlocks'][1]['attrs']['id'] )
) {
	return;
}

$has_caption   = $attributes['hasCaption'] && isset( $attributes['caption'] ) && '' !== trim( $attributes['caption'] );
$extra_classes = [];
$extra_styles  = [];

// generate extra classes
if ( 'horizontal' === $attributes['dividerAxis'] ) {
	$extra_classes[] = 'bigbite-image-comparison--divider--horizontal-axis';
}

// generate extra styles
$extra_styles[] = sprintf( '--bigbite-image-comparison-overflow: %s;', $attributes['overflow'] ? 'visible' : 'hidden' );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-initial-position: %s;', $attributes['dividerInitialPosition'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-thickness: %s;', $attributes['dividerThickness'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-box-width: %s;', $attributes['dividerBoxWidth'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-box-height: %s;', $attributes['dividerBoxHeight'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-box-border-radius: %s;', $attributes['dividerBoxBorderRadius']['top'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-icon-gap: %s;', $attributes['dividerIconGap'] );

if ( ! empty( $attributes['dividerColour'] ) || ! empty( $attributes['customDividerColour'] ) ) {
	$extra_styles[] = sprintf(
		'--bigbite-image-comparison-divider-colour: %s;',
		(
			! empty( $attributes['dividerColour'] )
				? sprintf( 'var(--wp--preset--color--%s, %s)', $attributes['dividerColour'], $attributes['customDividerColour'] )
				: $attributes['customDividerColour']
		)
	);
}

if ( ! empty( $attributes['dividerBoxColour'] ) || ! empty( $attributes['customDividerBoxColour'] ) ) {
	$extra_styles[] = sprintf(
		'--bigbite-image-comparison-divider-box-colour: %s;',
		(
			! empty( $attributes['dividerBoxColour'] )
				? sprintf( 'var(--wp--preset--color--%s, %s)', $attributes['dividerBoxColour'], $attributes['customDividerBoxColour'] )
				: $attributes['customDividerBoxColour']
		)
	);
}

if ( ! empty( $attributes['dividerIconColour'] ) || ! empty( $attributes['customDividerIconColour'] ) ) {
	$extra_styles[] = sprintf(
		'--bigbite-image-comparison-divider-icon-colour: %s;',
		(
			! empty( $attributes['dividerIconColour'] )
				? sprintf( 'var(--wp--preset--color--%s, %s)', $attributes['dividerIconColour'], $attributes['customDividerIconColour'] )
				: $attributes['customDividerIconColour']
		)
	);
}

if ( $has_caption ) {
	if ( ! empty( $attributes['captionTextColour'] ) || ! empty( $attributes['customCaptionTextColour'] ) ) {
		$extra_styles[] = sprintf(
			'--bigbite-image-comparison-caption-text-colour: %s;',
			(
				! empty( $attributes['captionTextColour'] )
					? sprintf( 'var(--wp--preset--color--%s, %s)', $attributes['captionTextColour'], $attributes['customCaptionTextColour'] )
					: $attributes['customCaptionTextColour']
			)
		);
	}

	if ( ! empty( $attributes['captionBackgroundColour'] ) || ! empty( $attributes['customCaptionBackgroundColour'] ) ) {
		$extra_styles[] = sprintf(
			'--bigbite-image-comparison-caption-background-colour: %s;',
			(
				! empty( $attributes['captionBackgroundColour'] )
					? sprintf( 'var(--wp--preset--color--%s, %s)', $attributes['captionBackgroundColour'], $attributes['customCaptionBackgroundColour'] )
					: $attributes['customCaptionBackgroundColour']
			)
		);
	}
}

$block_wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $extra_classes ),
		'style' => implode( ' ', $extra_styles ),
	]
);

?>
<figure <?php echo wp_kses_data( $block_wrapper_attributes ); ?>>
	<?php

	printf(
		'<div class="bigbite-image-comparison--container">
			%s
			<div class="bigbite-image-comparison--divider">
				<button>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>',
		wp_kses(
			$content,
			[
				'img' => [
					'id'       => true,
					'alt'      => true,
					'src'      => true,
					'class'    => true,
					'sizes'    => true,
					'width'    => true,
					'height'   => true,
					'srcset'   => true,
					'loading'  => true,
					'decoding' => true,
				],
			]
		),
	);

	if ( $has_caption ) {
		printf(
			'<figcaption class="bigbite-image-comparison--caption">%s</figcaption>',
			wp_kses_post( trim( $attributes['caption'] ) )
		);
	}

	?>
</figure>
