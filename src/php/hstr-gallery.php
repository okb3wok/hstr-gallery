<?php
/*
Plugin Name: HSTR Gallery
Plugin URI: https://github.com/okb3wok/hstr-gallery/
Description: Simple modal gallery based on Swiper.js
Author: Alexander Dolzhenkov <okb3wok@yandex.ru>
Version: 1.0
Author URI: https://github.com/okb3wok/
*/

if ( ! defined('ABSPATH') ) {
  header("HTTP/1.1 403 Forbidden");
  echo 'Forbidden';
  exit;
}


function hstr_gallery_register_menu() {


  $menu_slug = 'hstr-gallery';

  add_menu_page(
    'Галерея',             // Page title
    'HSTR Галерея',        // Menu title
    'administrator',       // Capability
    $menu_slug,            // Slug
    'hstr_gallery_page',     // Callback-функция
    'dashicons-list-view'  // Icon
  );
}

add_action('admin_menu', 'hstr_gallery_register_menu');



function hstr_gallery_enqueue_scripts() {

  // Подключаем только на фронте
  if ( is_admin() ) {
    return;
  }

  wp_enqueue_script(
    'hstr-gallery',
    plugin_dir_url(__FILE__) . 'assets/hstr-gallery.js',
    [],              // зависимости
    '1.0',           // версия
    true             // в footer
  );

  wp_enqueue_style(
    'hstr-gallery',
    plugin_dir_url(__FILE__) . 'assets/hstr-gallery.css',
    [],
    '1.0'
  );
}

add_action('wp_enqueue_scripts', 'hstr_gallery_enqueue_scripts');

/**
 * Главная страница плагина
 */
function hstr_gallery_page() {

  ?>
  <div class="wrap">
    <h1>HSTR Gallery</h1>
  </div>
  <?php


}

?>