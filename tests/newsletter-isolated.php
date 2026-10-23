<?php
// Exercise a valid subscription without touching the site's storage directory.
require dirname(__DIR__) . '/vendor/autoload.php';

$testRoot = sys_get_temp_dir() . '/cortexx-newsletter-' . bin2hex(random_bytes(8));
$logDir = $testRoot . '/storage/logs';
if (!mkdir($logDir, 0700, true)) {
    throw new RuntimeException('Could not create isolated newsletter storage');
}

define('ROOT', $testRoot);

try {
    $ip = '127.0.0.1';
    $secret = 'isolated-test-secret';
    $token = hash_hmac('sha256', $ip . '|' . gmdate('Ymd'), $secret);
    $request = (new Slim\Psr7\Factory\ServerRequestFactory())
        ->createServerRequest('POST', '/api/newsletter', ['REMOTE_ADDR' => $ip])
        ->withParsedBody(['csrf' => $token, 'email' => 'isolated-test@example.com']);
    $response = (new Cortexx\Controllers\NewsletterController([
        'csrf_secret' => $secret,
        'mail' => ['host' => '', 'username' => '', 'recipient' => ''],
    ]))->subscribe($request, new Slim\Psr7\Response());

    $saved = file_get_contents($logDir . '/subscribers.csv');
    if ($response->getStatusCode() !== 200
        || !str_contains((string) $response->getBody(), 'Thanks')
        || !str_contains($saved, 'isolated-test@example.com')) {
        throw new RuntimeException('Valid newsletter submission failed');
    }
    echo "PASS isolated valid newsletter submission\n";
} finally {
    foreach (glob($logDir . '/*') ?: [] as $file) unlink($file);
    rmdir($logDir);
    rmdir(dirname($logDir));
    rmdir($testRoot);
}
