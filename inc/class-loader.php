<?php

namespace Big_Bite\Image_Comparison;

/**
 * Loader
 */
final class Loader {

	/**
	 * Plugin directory
	 *
	 * @var string
	 */
	private readonly string $plugin_directory;

	/**
	 * Initialise hooks and filters
	 * 
	 * @param string $plugin_directory Plugin directory
	 */
	public function __construct( $plugin_directory ) {
		$this->plugin_directory = $plugin_directory;
		add_action( 'init', [ $this, 'register_blocks' ] );
	}

	/**
	 * Register required dynamic blocks
	 *
	 * @return void
	 */
	public function register_blocks(): void {
		register_block_type( $this->plugin_directory . '/dist/blocks/image-comparison' );
		register_block_type( $this->plugin_directory . '/dist/blocks/image-comparison-item' );
	}
}
