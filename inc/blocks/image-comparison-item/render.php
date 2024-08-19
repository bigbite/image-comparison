<?php
/**
 * Render for Image Comparison Item block
 * 
 * @var array<mixed> $attributes The block attributes.
 * @var string       $content    The block default content.
 */

// check block has an integer id set before continuing
if ( ! isset( $attributes['id'] ) || ! is_int( $attributes['id'] ) ) {
	return;
}

$image_args = [];

// check for custom alternative text
if ( isset( $attributes['alternativeText'] ) && '' !== trim( $attributes['alternativeText'] ) ) {
	$image_args['alt'] = trim( esc_attr( $attributes['alternativeText'] ) );
}

// generate `img` html markup
$html = wp_get_attachment_image(
	size: $attributes['sizeSlug'] ?? 'full',
	attr: $image_args,
	attachment_id: $attributes['id']
);

if ( empty( $html ) ) {
	return;
}

// initialise a WP_HTML_Tag_Processor class with image markup
$processor = new WP_HTML_Tag_Processor( $html );

// @phpstan-ignore-next-line -- `$query` parameter type of `string` is valid
if ( $processor->next_tag( 'img' ) ) {
	$processor->add_class( 'wp-block-bigbite-image-comparison-item' );
}

echo wp_kses(
	$processor->get_updated_html(),
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
);
