<?php
use Slim\App;
use Cortexx\Controllers\PageController;
use Cortexx\Controllers\NewsletterController;
use Cortexx\Middleware\CsrfTokenMiddleware;
use Slim\Psr7\Response;

return function (App $app, array $config, string $base) {
    $csrf = new CsrfTokenMiddleware($config['csrf_secret'] ?? '');

    $app->get('/', function ($req, $res) use ($config, $base) {
        return (new PageController($config, $base))->home($req, $res);
    })->add($csrf);

    $app->post('/api/newsletter', function ($req, $res) use ($config) {
        return (new NewsletterController($config))->subscribe($req, $res);
    });

    $app->get('/robots.txt', fn($req, $res) => tap($res, fn($r) => $r->getBody()->write("User-agent: *\nAllow: /\n"))->withHeader('Content-Type', 'text/plain'));

    $app->get('/sitemap.xml', function ($req, $res) use ($config, $base) {
        $u = ($config['app']['url'] ?: '') . $base . '/';
        $xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' . htmlspecialchars($u) . '</loc></url></urlset>';
        $res->getBody()->write($xml);
        return $res->withHeader('Content-Type', 'application/xml');
    });
};

function tap($v, $fn) { $fn($v); return $v; }
