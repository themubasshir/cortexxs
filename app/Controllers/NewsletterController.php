<?php
namespace Cortexx\Controllers;

use Psr\Http\Message\ResponseInterface as R;
use Psr\Http\Message\ServerRequestInterface as Q;
use PHPMailer\PHPMailer\PHPMailer;

class NewsletterController
{
    public function __construct(private array $config) {}

    private function json(R $res, array $data, int $code = 200): R
    {
        $res->getBody()->write(json_encode($data));
        return $res->withHeader('Content-Type', 'application/json')->withStatus($code);
    }

    public function subscribe(Q $req, R $res): R
    {
        $b = (array) $req->getParsedBody();

        // honeypot
        if (!empty($b['website'])) return $this->json($res, ['message' => 'OK']);

        // CSRF
        $token = $b['csrf'] ?? '';
        $ip = $req->getServerParams()['REMOTE_ADDR'] ?? '0.0.0.0';
        $expected = hash_hmac('sha256', $ip . '|' . gmdate('Ymd'), $this->config['csrf_secret'] ?: 'cortexx');
        if (!hash_equals($expected, $token)) {
            return $this->json($res, ['message' => 'Invalid form token.'], 403);
        }

        $email = trim((string)($b['email'] ?? ''));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
            return $this->json($res, ['message' => 'Please enter a valid email address.'], 422);
        }

        // rate limit: 3 per hour per IP (file-based)
        $dir = ROOT . '/storage/logs';
        $log = $dir . '/newsletter_rl.json';
        $rl = is_file($log) ? (json_decode(file_get_contents($log), true) ?: []) : [];
        $now = time();
        $rl[$ip] = array_filter($rl[$ip] ?? [], fn($t) => $t > $now - 3600);
        if (count($rl[$ip]) >= 3) {
            return $this->json($res, ['message' => 'Too many requests. Try later.'], 429);
        }
        $rl[$ip][] = $now;
        @file_put_contents($log, json_encode($rl));

        // persist subscription
        @file_put_contents($dir . '/subscribers.csv', implode(',', [$now, $email]) . "\n", FILE_APPEND | LOCK_EX);

        // mail if SMTP configured
        $m = $this->config['mail'];
        if ($m['host'] && $m['username'] && $m['recipient']) {
            try {
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = $m['host'];
                $mail->SMTPAuth = true;
                $mail->Username = $m['username'];
                $mail->Password = $m['password'];
                $mail->SMTPSecure = $m['encryption'];
                $mail->Port = $m['port'];
                $mail->setFrom($m['from'], $m['fromName']);
                $mail->addAddress($m['recipient']);
                $mail->Subject = 'Newsletter signup';
                $mail->Body = "New subscriber: {$email}";
                $mail->send();
            } catch (\Throwable $e) {
                @file_put_contents($dir . '/mail.log', gmdate('c') . ' ' . $e->getMessage() . "\n", FILE_APPEND);
            }
        }
        return $this->json($res, ['message' => 'Thanks — we’ll be in touch.']);
    }
}
