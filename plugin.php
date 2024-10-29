<?php
/**
 * Plugin Name:       Image Comparison
 * Description:       Display two images in a comparison state.
 * Version:           1.0.0-beta.1
 * Requires at least: 6.3
 * Requires PHP:      8.2
 * Author:            Big Bite®
 * Author URI:        https://bigbite.net
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        false
 * Text Domain:       bigbite-image-comparison
 */

namespace Big_Bite\Image_Comparison;

// exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BIGBITE_IMAGE_COMPARISON_PLUGIN_DIR', __DIR__ );

require_once BIGBITE_IMAGE_COMPARISON_PLUGIN_DIR . '/inc/class-loader.php';
new Loader( BIGBITE_IMAGE_COMPARISON_PLUGIN_DIR );
