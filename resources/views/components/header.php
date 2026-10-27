<header class="site-header" id="header">
  <a class="brand" href="<?= $b ?>/" aria-label="Cortexx home">
    <img src="<?= $b ?>/assets/images/logo-dark.png" alt="Cortexx" width="126" height="38">
  </a>
  <nav class="nav" aria-label="Primary">
    <?php foreach ($nav as $n): ?>
      <a href="<?= $n[1] ?>" <?= !empty($n[2]) ? 'class="has-drop"' : '' ?>><?= htmlspecialchars($n[0]) ?><?= !empty($n[2]) ? ' <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/></svg>' : '' ?></a>
    <?php endforeach; ?>
  </nav>
  <a class="btn btn-dark" href="#contact">Let’s Talk</a>
  <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
</header>
<nav class="mobile-nav" id="mobileNav" aria-label="Mobile">
  <button class="close" id="menuClose" aria-label="Close menu"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke="#1d1d1d" stroke-width="2"/></svg></button>
  <?php foreach ($nav as $n): ?><a href="<?= $n[1] ?>"><?= htmlspecialchars($n[0]) ?></a><?php endforeach; ?>
  <a class="btn btn-dark" href="#contact" style="width:max-content">Let’s Talk</a>
</nav>
