<?php
namespace Cortexx\Controllers;

use Psr\Http\Message\ResponseInterface as R;
use Psr\Http\Message\ServerRequestInterface as Q;

class PageController
{
    public function __construct(private array $config, private string $base) {}

    public function home(Q $req, R $res): R
    {
        $view = ROOT . '/resources/views/pages/home.php';
        ob_start();
        $csrf = $req->getAttribute('csrf_token', '');
        $base = $this->base;
        $config = $this->config;
        $services = require ROOT . '/config/services.php';
        require $view;
        $res->getBody()->write(ob_get_clean());
        return $res;
    }
}
