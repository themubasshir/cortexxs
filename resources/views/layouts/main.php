<?php
/** @var string $title @var string $description @var string $content @var string $base */
$base = $base ?? '';
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
<meta property="og:image" content="<?= $base ?>/assets/images/og.png">
<link rel="icon" href="<?= $base ?>/assets/images/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<link rel="stylesheet" href="<?= $base ?>/assets/css/app.css">
</head>
<body>
<?= $content ?>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>
<script src="<?= $base ?>/assets/js/app.js" defer></script>
</body>
</html>
