<?php
/**
 * Plugin Name:       Image Comparison
 * Description:       Display two images in a comparison state.
 * Version:           0.0.1
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

define( 'BIGBITE_IMAGE_COMPARISON_PLUGIN_DIR', rtrim( plugin_dir_path( __FILE__ ), '/' ) );

if ( file_exists( BIGBITE_IMAGE_COMPARISON_PLUGIN_DIR . '/inc/asset-settings.php' ) ) {
	include_once BIGBITE_IMAGE_COMPARISON_PLUGIN_DIR . '/inc/asset-settings.php';
}

if (
	! defined( 'BIGBITE_IMAGE_COMPARISON_EDITOR_CSS' ) ||
	! defined( 'BIGBITE_IMAGE_COMPARISON_EDITOR_JS' ) ||
	! defined( 'BIGBITE_IMAGE_COMPARISON_SHARED_CSS' ) ||
	! defined( 'BIGBITE_IMAGE_COMPARISON_SHARED_JS' ) ||
	! defined( 'BIGBITE_IMAGE_COMPARISON_FRONTEND_CSS' ) ||
	! defined( 'BIGBITE_IMAGE_COMPARISON_EDITOR_DEPENDENCIES' ) ||
	! defined( 'BIGBITE_IMAGE_COMPARISON_VERSION' )
) {
	add_action(
		'all_admin_notices',
		function () {
			printf(
				'<div class="notice notice-error is-dismissible"><p>%s</p></div>',
				esc_html__( 'Image Comparison asset constants are not defined. You may need to run an asset build.', 'bigbite-image-comparison' )
			);
		}
	);

	return;
}

require_once BIGBITE_IMAGE_COMPARISON_PLUGIN_DIR . '/inc/class-loader.php';
new Loader();
