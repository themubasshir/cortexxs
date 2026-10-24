<?php
/** @var string $title @var string $description @var string $content @var string $base */
$base = $base ?? '';
$assetRelease = getenv('CORTEXX_ASSET_RELEASE') ?: '';
$assetPrefix = $base . '/assets' . ($assetRelease !== '' ? '/releases/' . rawurlencode($assetRelease) : '');
$content = str_replace($base . '/assets/', $assetPrefix . '/', $content);
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($title ?? 'Cortexx — We Build Software, Websites, Apps and AI') ?></title>
<meta name="description" content="<?= htmlspecialchars($description ?? 'Cortexx combines strategy, design and engineering under one team to create digital products people actually want to use.') ?>">
<link rel="canonical" href="<?= htmlspecialchars(($config['app']['url'] ?? '') . $base . '/') ?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?= htmlspecialchars($title ?? 'Cortexx') ?>">
<meta property="og:description" content="<?= htmlspecialchars($description ?? '') ?>">
<meta property="og:image" content="<?= $assetPrefix ?>/images/og.png">
<link rel="icon" href="<?= $assetPrefix ?>/images/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<?= $assetPrefix ?>/css/app.css?v=mobile-single-preview-20261024e">
</head>
<body>
<?= $content ?>
<script src="<?= $assetPrefix ?>/js/app.js?v=mobile-single-preview-20261024e" defer></script>
</body>
</html>
