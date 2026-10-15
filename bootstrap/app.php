<?php
define('ROOT', dirname(__DIR__));

require ROOT . '/vendor/autoload.php';

$config = require ROOT . '/config/config.php';

use Slim\Factory\AppFactory;

$app = AppFactory::create();

// base path: env override (APP_BASE_PATH="" for domain root), else autodetect
$forced = $_ENV['APP_BASE_PATH'] ?? getenv('APP_BASE_PATH');
if ($forced !== false && $forced !== null) {
    $basePath = rtrim($forced, '/');
    if ($basePath !== '') $app->setBasePath($basePath);
} else {
    $script = $_SERVER['SCRIPT_NAME'] ?? '';
    $base = rtrim(str_replace('\\', '/', dirname($script)), '/');
    $basePath = str_ends_with($base, '/public') ? $base : $base . '/public';
    // Only set base path if requests actually route through it
    if (isset($_SERVER['REQUEST_URI']) && str_starts_with($_SERVER['REQUEST_URI'], $basePath . '/')) {
        $app->setBasePath($basePath);
    } elseif (str_starts_with($_SERVER['REQUEST_URI'] ?? '', '/cortexx')) {
        $app->setBasePath('/cortexx');
        $basePath = '/cortexx';
    } else {
        $basePath = '';
    }
}

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$debug = $config['app']['debug'];
$app->addErrorMiddleware($debug, true, $debug);

(require ROOT . '/routes/web.php')($app, $config, $basePath);

return $app;
