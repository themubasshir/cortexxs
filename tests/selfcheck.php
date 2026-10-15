<?php
// Runnable self-check: php tests/selfcheck.php  (needs local server running)
$base = 'http://localhost/cortexx';
$fails = 0;
function check($name, $cond) { global $fails; echo ($cond ? 'PASS' : 'FAIL') . " $name\n"; if (!$cond) $fails++; }

$ctx = stream_context_create(['http' => ['timeout' => 10]]);
$home = @file_get_contents("$base/", false, $ctx);
check('home 200 + content', $home && str_contains($home, 'We Build Software'));
check('header nav', str_contains($home, 'Capabilities'));
check('work cards', substr_count($home, 'work-card') >= 4);
check('case stack', substr_count($home, 'case-card') >= 3);
check('footer', str_contains($home, '2026 Cortexx'));
check('csrf token', str_contains($home, 'name="csrf"'));
$robots = @file_get_contents("$base/robots.txt", false, $ctx);
check('robots.txt', $robots && str_contains($robots, 'User-agent'));
$sm = @file_get_contents("$base/sitemap.xml", false, $ctx);
check('sitemap.xml', $sm && str_contains($sm, 'urlset'));
$env = @file_get_contents("$base/.env", false, $ctx);
check('.env blocked', $env === false);
// newsletter: extract token, post
preg_match('/name="csrf" value="([^"]+)"/', $home, $mm);
$tok = $mm[1] ?? '';
$resp = @file_get_contents("$base/api/newsletter", false, stream_context_create(['http' => [
    'method' => 'POST', 'header' => "Content-Type: application/x-www-form-urlencoded",
    'content' => http_build_query(['csrf' => $tok, 'email' => 'selfcheck+' . time() . '@example.com'])]]));
check('newsletter POST', $resp && str_contains($resp, 'Thanks'));
$bad = @file_get_contents("$base/api/newsletter", false, stream_context_create(['http' => [
    'method' => 'POST', 'header' => "Content-Type: application/x-www-form-urlencoded",
    'content' => 'csrf=x&email=not-an-email', 'ignore_errors' => true]]));
check('bad input rejected', $bad !== false);
echo $fails ? "\n$fails FAILED\n" : "\nALL PASS\n";
exit($fails ? 1 : 0);
