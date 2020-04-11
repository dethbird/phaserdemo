<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
define("APPLICATION_PATH", __DIR__ . "/../");
set_include_path(implode(PATH_SEPARATOR, [
    APPLICATION_PATH ,
    APPLICATION_PATH . 'src/php/',
    get_include_path(),
]));
require APPLICATION_PATH.'vendor/autoload.php';
use Pecee\SimpleRouter\SimpleRouter;

$twigLoader = new \Twig\Loader\FilesystemLoader(APPLICATION_PATH.'src/views');
global $twig;
$twig = new \Twig\Environment($twigLoader);

SimpleRouter::get('/', function() {
    return 'Hello world';
});
SimpleRouter::get('/item/{name}', function ($name) {
    global $twig;
    echo $twig->render('layouts/item.phtml', ['name' => $name]);
});
SimpleRouter::start();
?>
