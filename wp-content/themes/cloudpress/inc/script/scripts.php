<?php
function cloudpress_enqueue_script()
	{
	$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

    if(get_theme_mod('custom_color_enable') == true) {
				cloudpress_custom_light();
		}
		
		else
		{
	        wp_enqueue_style('cloudpress-default', CLOUDPRESS_THEME_URI . '/assets/css/default.css');
		} 


	wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css');
	wp_enqueue_style('cloudpress-style', get_stylesheet_uri() );
    wp_enqueue_style('font-awesome', 'https://cdn.bootcdn.net/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('jquery.smartmenus.bootstrap-4', CLOUDPRESS_THEME_URI . '/assets/css/jquery.smartmenus.bootstrap-4.css');

	//js file
	wp_enqueue_script('bootstrap', get_template_directory_uri(). '/assets/js/bootstrap' . $suffix . '.js',array('jquery'), '', true);
	wp_enqueue_script('jquery-menu', get_template_directory_uri().'/assets/js/smartmenus/jquery.smartmenus.js',array('jquery'), '', true);
	wp_enqueue_script('jquery-menu-bootstrap', get_template_directory_uri().'/assets/js/smartmenus/jquery.smartmenus.bootstrap-4.js',array('jquery'), '', true);
	wp_enqueue_script('cloudpress-custom-js', get_template_directory_uri().'/assets/js/custom.js', array('jquery'), '', true);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) 
	{
		wp_enqueue_script( 'comment-reply' );
	}

	}
	add_action('wp_enqueue_scripts','cloudpress_enqueue_script');


	function cloudpress_plus_enqueue_scripts(){
	wp_enqueue_style('cloudpress-customize-css', CLOUDPRESS_THEME_URI . '/assets/css/customize.css');
	}
	add_action( 'admin_enqueue_scripts', 'cloudpress_plus_enqueue_scripts' );

	/**
 	* Added skip link focus
 	*/
	function cloudpress_skip_link_fn() {
	?>
	<script>
	/(trident|msie)/i.test(navigator.userAgent)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",function(){var t,e=location.hash.substring(1);/^[A-z0-9_-]+$/.test(e)&&(t=document.getElementById(e))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())},!1);
	</script>
	<?php
	}
	add_action( 'wp_print_footer_scripts', 'cloudpress_skip_link_fn' );