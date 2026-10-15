<?php
namespace Cortexx\Middleware;

use Psr\Http\Message\ResponseInterface as R;
use Psr\Http\Message\ServerRequestInterface as Q;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as H;

// Issues a per-IP daily CSRF token attribute for forms (stateless HMAC).
class CsrfTokenMiddleware implements MiddlewareInterface
{
    public function __construct(private string $secret) {}

    public function process(Q $req, H $h): R
    {
        $ip = $req->getServerParams()['REMOTE_ADDR'] ?? '0.0.0.0';
        $token = hash_hmac('sha256', $ip . '|' . gmdate('Ymd'), $this->secret ?: 'cortexx');
        return $h->handle($req->withAttribute('csrf_token', $token));
    }
}
