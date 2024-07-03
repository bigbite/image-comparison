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

$has_caption   = ! empty( $attributes['caption'] );
$extra_classes = [];
$extra_styles  = [];

/*
 * An array used to generate inline colour css variables, each
 * sub array should consist of 4 entries and follow the
 * below key / value structure.
 * 
 * [0] {string}  Colour attribute name
 * [1] {string}  Custom colour attribute name
 * [2] {string}  CSS variable name suffix
 * [3] {boolean} Whether the corresponding variable should be rendered
 */
$colours = [
	[ 'dividerColour', 'customDividerColour', 'divider-colour', true ],
	[ 'dividerBoxColour', 'customDividerBoxColour', 'divider-box-colour', true ],
	[ 'dividerIconColour', 'customDividerIconColour', 'divider-icon-colour', true ],
	[ 'captionTextColour', 'customCaptionTextColour', 'caption-text-colour', $has_caption ],
	[ 'captionBackgroundColour', 'customCaptionBackgroundColour', 'caption-background-colour', $has_caption ],
];

// generate extra classes
if ( 'horizontal' === $attributes['dividerAxis'] ) {
	$extra_classes[] = 'wp-block-bigbite-image-comparison--horizontal';
}

// generate extra styles
$extra_styles[] = sprintf( '--bigbite-image-comparison-overflow: %s;', $attributes['overflow'] ? 'visible' : 'hidden' );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-initial-position: %s;', $attributes['dividerInitialPosition'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-thickness: %s;', $attributes['dividerThickness'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-box-width: %s;', $attributes['dividerBoxWidth'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-box-height: %s;', $attributes['dividerBoxHeight'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-box-border-radius: %s;', $attributes['dividerBoxBorderRadius']['top'] );
$extra_styles[] = sprintf( '--bigbite-image-comparison-divider-icon-gap: %s;', $attributes['dividerIconGap'] );

foreach ( $colours as $colour ) {
	if ( ( empty( $attributes[ $colour[0] ] ) && empty( $attributes[ $colour[1] ] ) ) || ! $colour[3] ) {
		continue;
	}

	$extra_styles[] = sprintf(
		'--bigbite-image-comparison-%s: %s;',
		$colour[2],
		(
			! empty( $attributes[ $colour[0] ] )
				? sprintf( 'var(--wp--preset--color--%s, %s)', $attributes[ $colour[0] ], $attributes[ $colour[1] ] )
				: $attributes[ $colour[1] ]
		)
	);
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
		'<div class="wp-block-bigbite-image-comparison__container">
			%s
			<div class="wp-block-bigbite-image-comparison__divider">
				<button aria-label="%s">
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
		esc_html__( 'Drag left and right, or up and down, to compare two images', 'bigbite' )
	);

	if ( $has_caption ) {
		printf(
			'<figcaption class="wp-block-bigbite-image-comparison__caption">%s</figcaption>',
			wp_kses_post( trim( $attributes['caption'] ) )
		);
	}

	?>
</figure>
