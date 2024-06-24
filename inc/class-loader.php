<?php

namespace Big_Bite\Image_Comparison;

/**
 * Loader
 */
final class Loader {

	/**
	 * Editor enqueue handle
	 *
	 * @var string
	 */
	private const EDITOR_HANDLE = 'bigbite-image-comparison-editor';

	/**
	 * Shared enqueue handle
	 *
	 * @var string
	 */
	private const SHARED_HANDLE = 'bigbite-image-comparison-shared';

	/**
	 * Frontend enqueue handle
	 *
	 * @var string
	 */
	private const FRONTEND_HANDLE = 'bigbite-image-comparison-frontend';

	/**
	 * Plugin name
	 *
	 * @var string
	 */
	private readonly string $plugin_name;

	/**
	 * Initialise hooks and filters
	 * 
	 * @param string $plugin_directory Plugin directory
	 */
	public function __construct( $plugin_directory ) {
		$this->plugin_name = basename( $plugin_directory );

		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ] );
	}

	/**
	 * Register required dynamic blocks
	 *
	 * @return void
	 */
	public function register_blocks(): void {
		register_block_type( __DIR__ . '/blocks/image-comparison' );
		register_block_type( __DIR__ . '/blocks/image-comparison-item' );
	}

	/**
	 * Enqueue required assets for the block editor
	 *
	 * @return void
	 */
	public function enqueue_block_editor_assets(): void {
		wp_enqueue_script(
			self::EDITOR_HANDLE,
			plugins_url( $this->plugin_name . '/dist/scripts/' . BIGBITE_IMAGE_COMPARISON_EDITOR_JS ),
			BIGBITE_IMAGE_COMPARISON_EDITOR_DEPENDENCIES,
			BIGBITE_IMAGE_COMPARISON_VERSION,
			false
		);
	}

	/**
	 * Enqueue required assets for editor and frontend
	 *
	 * @return void
	 */
	public function enqueue_block_assets(): void {
		wp_enqueue_style(
			self::SHARED_HANDLE,
			plugins_url( $this->plugin_name . '/dist/styles/' . BIGBITE_IMAGE_COMPARISON_SHARED_CSS ),
			[],
			BIGBITE_IMAGE_COMPARISON_VERSION
		);

		if ( is_admin() ) {
			wp_enqueue_style(
				self::EDITOR_HANDLE,
				plugins_url( $this->plugin_name . '/dist/styles/' . BIGBITE_IMAGE_COMPARISON_EDITOR_CSS ),
				[],
				BIGBITE_IMAGE_COMPARISON_VERSION
			);
		} else {
			wp_enqueue_script(
				self::FRONTEND_HANDLE,
				plugins_url( $this->plugin_name . '/dist/scripts/' . BIGBITE_IMAGE_COMPARISON_FRONTEND_JS ),
				[],
				BIGBITE_IMAGE_COMPARISON_VERSION,
				true
			);

			wp_enqueue_style(
				self::FRONTEND_HANDLE,
				plugins_url( $this->plugin_name . '/dist/styles/' . BIGBITE_IMAGE_COMPARISON_FRONTEND_CSS ),
				[],
				BIGBITE_IMAGE_COMPARISON_VERSION
			);
		}
	}
}
