<?php
// Env loader — parse .env natively (no dependency, avoids phpdotenv nul.env Windows issue).
$envFile = dirname(__DIR__) . '/.env';
if (is_file($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) continue;
        [$k, $v] = explode('=', $line, 2);
        $v = trim($v);
        if (strlen($v) > 1 && $v[0] === '"' && str_ends_with($v, '"')) $v = substr($v, 1, -1);
        $_ENV[trim($k)] = $v;
    }
}
function env(string $k, $default = null) {
    if (array_key_exists($k, $_ENV)) return $_ENV[$k];
    $v = getenv($k);
    return ($v === false) ? $default : $v;
}
// Support both MAIL_* and SMTP_* naming (Hostinger uses SMTP_*)
function env2(string $a, string $b, $default = null) { return env($a, null) ?? env($b, $default); }

return [
    'app' => [
        'env' => env('APP_ENV', 'production'),
        'url' => rtrim(env('APP_URL', ''), '/'),
        'debug' => filter_var(env('APP_DEBUG', false), FILTER_VALIDATE_BOOL),
    ],
    'mail' => [
        'host' => env2('MAIL_HOST', 'SMTP_HOST'),
        'port' => (int) env2('MAIL_PORT', 'SMTP_PORT', 587),
        'username' => env2('MAIL_USERNAME', 'SMTP_USERNAME'),
        'password' => env2('MAIL_PASSWORD', 'SMTP_PASSWORD'),
        'encryption' => env2('MAIL_ENCRYPTION', 'SMTP_ENCRYPTION', 'tls'),
        'from' => env2('MAIL_FROM_ADDRESS', 'MAIL_FROM', 'noreply@localhost'),
        'fromName' => env('MAIL_FROM_NAME', 'Cortexx'),
        'recipient' => env2('CONTACT_RECIPIENT', 'MAIL_TO'),
    ],
    'csrf_secret' => env('CSRF_SECRET', ''),
];
