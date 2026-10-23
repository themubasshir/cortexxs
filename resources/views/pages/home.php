<?php
$b = $base ?? '';
$img = fn(string $f) => "$b/assets/images/figma/$f";
$nav = [
    ['Work', '#work'],
    ['Capabilities', '#capabilities', true],
    ['Case Studies', '#case-studies'],
    ['About', '#about'],
    ['Contact', '#contact'],
];
ob_start();
?>
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

<main>
<!-- ================= HERO ================= -->
<section class="hero" id="top">
  <div class="hero-decor" aria-hidden="true"></div>
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-left">
        <span class="pill-label reveal">Think <i class="dot"></i> Design <i class="dot"></i> Build</span>
        <h1 class="reveal"><span class="blue">We Build</span> Software,<br>Websites, App<br>and AI.</h1>
        <p class="hero-sub reveal">Designed around your business. Built to move it forward.</p>
        <div class="hero-ctas reveal">
          <a class="btn btn-primary" href="#contact">Start Project</a>
          <a class="btn btn-ghost" href="#work">View Work <span aria-hidden="true">→</span></a>
        </div>
        <div class="social-proof reveal">
          <div class="avatars">
            <img src="<?= $img('cb07be31077901284b216bad893805196f094747.png') ?>" alt="Client">
            <img src="<?= $img('4ae134041644c361fd828d14a56c538158b5906d.png') ?>" alt="Client">
            <img src="<?= $img('253ea0a2729e2938527d49babb39dfb55ca389cd.png') ?>" alt="Client">
            <span class="av-more">100+</span>
          </div>
          <div class="proof-text">
            <span class="stars" aria-label="5 out of 5 stars">
              <?php for ($i=0;$i<5;$i++): ?><svg viewBox="0 0 18 18"><path d="M9 .9l2.4 5 5.5.7-4 3.9 1 5.4L9 13.4l-4.9 2.5 1-5.4-4-3.9 5.5-.7z"/></svg><?php endfor; ?>
            </span>
            Trusted by over 100 businesses
          </div>
        </div>
      </div>
      <div class="hero-visual reveal">
        <div class="video-card">
          <img src="<?= $img('dd9cbbd94fb6d171f0a7211523d954c2a128932d.png') ?>" alt="Cortexx product preview" fetchpriority="high">
          <button class="play" aria-label="Play showreel"><svg viewBox="0 0 18 19"><path d="M3 2.5v14l12-7z"/></svg></button>
          <span class="progress" aria-hidden="true"></span>
        </div>
      </div>
    </div>
    <div class="trust reveal">
      <p>Trusted by 50,000+ businesses for innovative design and growth.</p>
      <?php $brandLogos = ['lumina' => 'Lumina', 'vortex' => 'Vortex', 'velocity' => 'Velocity', 'synergy' => 'Synergy', 'enigma' => 'Enigma', 'spectrum' => 'Spectrum']; ?>
      <div class="trust-logos" aria-label="Trusted brands. Logo carousel pauses on hover or keyboard focus.">
        <div class="trust-track" tabindex="0">
          <?php for ($copy = 0; $copy < 2; $copy++): ?>
          <div class="trust-set" <?= $copy ? 'aria-hidden="true"' : '' ?>>
            <?php foreach ($brandLogos as $file => $name): ?>
            <div class="lg"><img src="<?= $b ?>/assets/images/brand-<?= $file ?>.svg" alt="<?= $copy ? '' : $name ?>"></div>
            <?php endforeach; ?>
          </div>
          <?php endfor; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ================= SELECTED WORK ================= -->
<section class="sec" id="work">
  <div class="wrap">
    <div class="sec-head">
      <div class="col-left">
        <span class="pill-label reveal">Selected Work</span>
        <h2 class="reveal">Work that moves businesses <span class="blue">forward.</span></h2>
      </div>
      <a class="link-arrow reveal" href="#contact">Start a Project
        <svg viewBox="0 0 25 20" fill="none"><path d="M0 10h18M13 4l6 6-6 6" stroke="#1d1d1d" stroke-width="1.6"/></svg></a>
    </div>
    <div class="work-grid">
      <?php
      $works = [
        ['Aurora','Mobile App','7af8f62724334a5fe91653d7c11017f48534a962.png'],
        ['Wstack','Web Platform','d3c53b83709170a47e8bf41dffb3ccbf8e389447.png'],
        ['Aurora','Saas Platform','7b43ef8e85bdd82bf7b827210a5bd65b6bb8d3d6.png'],
        ['Voice AI','AI Mobile App','4d8cad707a52e7c0b60672844dd372c8f6960f67.png'],
      ];
      foreach ($works as $w): ?>
      <article class="work-card reveal">
        <div class="thumb"><img src="<?= $img($w[2]) ?>" alt="<?= htmlspecialchars($w[0]) ?> — <?= htmlspecialchars($w[1]) ?>" loading="lazy"></div>
        <div class="meta">
          <div><h3><?= htmlspecialchars($w[0]) ?></h3><div class="tag"><?= htmlspecialchars($w[1]) ?></div></div>
          <span class="go"><svg viewBox="0 0 27 27"><path d="M6 21L21 6M9 6h12v12"/></svg></span>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ================= WHAT WE DO ================= -->
<section class="sec" id="capabilities">
  <div class="wrap">
    <div class="sec-head">
      <div class="col-left">
        <span class="pill-label reveal">What we do</span>
        <h2 class="reveal">From ideas to <span class="blue">Impact</span></h2>
      </div>
      <div class="col-right">
        <p class="reveal">One team for strategy, design &amp; engineering.<br class="desktop-only"> Built to move your business forward.</p>
        <a class="link-arrow reveal" href="#capabilities">Explore Services
          <svg viewBox="0 0 25 20" fill="none"><path d="M0 10h18M13 4l6 6-6 6" stroke="#1d1d1d" stroke-width="1.6"/></svg></a>
      </div>
    </div>
    <div class="svc-grid">
      <?php
      $svcs = [
        ['Software','Systems built to simplify and scale.','<rect x="5" y="4" width="22" height="18" rx="2"/><path d="M5 9h22M9 4v5"/>'],
        ['Websites','Digital experiences that attract and convert','<path d="M4 6h24M8 6v14a2 2 0 002 2h4a2 2 0 002-2V6"/><rect x="4" y="4" width="24" height="4" rx="1"/>'],
        ['Apps','Useful products designed around real users.','<rect x="6" y="4" width="20" height="24" rx="3"/><path d="M12 24h8"/><circle cx="16" cy="10" r="2"/>'],
        ['AI & Automation','Smarter workflows that save time','<circle cx="16" cy="16" r="5"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M8 8l2.5 2.5M24 8l-2.5 2.5M8 24l2.5-2.5M24 24l-2.5-2.5"/>'],
      ];
      foreach ($svcs as $s): ?>
      <article class="svc-card reveal">
        <div class="svc-top">
          <span class="svc-icon"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><?= $s[2] ?></svg></span>
          <span class="svc-go"><svg viewBox="0 0 14 14"><path d="M2 12L12 2M4 2h8v8"/></svg></span>
        </div>
        <div><h3><?= htmlspecialchars($s[0]) ?></h3><p><?= htmlspecialchars($s[1]) ?></p></div>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ================= CASE STUDIES (scroll stack) ================= -->
<section class="sec" id="case-studies">
  <div class="wrap">
    <div class="stack">
      <?php
      $cases = [
        ['0107fc41fbf0a5f7bbb05203baf9f9ae1554be67.png', 'nextworld'],
        ['0483e4d21d214fab7b3feec8e2944b2fd53a73a0.png', 'velocity'],
        ['dd9cbbd94fb6d171f0a7211523d954c2a128932d.png', 'synergy'],
      ];
      foreach ($cases as $c): ?>
      <article class="case-card case-<?= htmlspecialchars($c[1]) ?>">
        <div class="case-left">
          <span class="pill-label">Case Study</span>
          <div class="case-title">
            <span class="mark"><svg viewBox="0 0 34 34"><path d="M6 26V8l11 12L28 8v18"/></svg></span>
            <h3>NextWrold</h3>
          </div>
          <p class="case-sub">A clearer SaaS platform for better decisions</p>
          <p class="case-tags">UX/UX - Web Development</p>
          <a class="btn btn-primary" href="#contact" style="margin-top:32px;padding:16px 30px">Vew Case Study</a>
          <div class="case-stats">
            <div class="stat"><b>+38%</b><span>Conversion</span></div>
            <div class="stat"><b>-32%</b><span>Task Time</span></div>
            <div class="stat"><b>+46%</b><span>Engagement</span></div>
          </div>
        </div>
        <div class="case-visual"><img src="<?= $img($c[0]) ?>" alt="NextWrold platform" loading="lazy"></div>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ================= TESTIMONIALS ================= -->
<section class="sec testi" id="about">
  <div class="wrap">
    <div class="sec-head">
      <div class="col-left">
        <span class="pill-label reveal">Trusted &amp; Featured</span>
        <h2 class="reveal">Real Partners. Real <span class="blue">Results.</span></h2>
      </div>
      <div class="arrows">
        <button class="arrow" id="tPrev" aria-label="Scroll testimonials left"><svg viewBox="0 0 18 18"><path d="M12 3l-6 6 6 6"/></svg></button>
        <button class="arrow" id="tNext" aria-label="Scroll testimonials right"><svg viewBox="0 0 18 18"><path d="M6 3l6 6-6 6"/></svg></button>
        <button class="carousel-toggle" id="tToggle" type="button" aria-label="Pause testimonials" aria-pressed="false">Pause</button>
      </div>
    </div>
  </div>
  <div class="testimonials-viewport" id="testimonialCarousel" tabindex="0" aria-label="Client testimonials">
    <?php
    $cards = [
      ['vortex','Vortex','1e37881e785c2acf3a1882b6dad6518d55813fa4.png','“Cortexx transformed our complex product into a simple, intuitive experience that our users genuinely enjoy navigating.”','Alex Carter','Product Lead, Vortextt'],
      ['velocity','Velocity','5c3ed82dabd37cbe156322c8c9b2a0bc9ce4460e.png','“Thoughtful design and clear communication”','Carlos Rivera','Design Director, Velocity'],
      ['synergy','Synergy','a5347cae3133954bc0feba4678f8acc6a815d29d.png','“Cortexx delivered thoughtful design, clear communication, and a seamless workflow, making the entire collaboration smooth.”','Jordan MItchell Rivera','Founder, Synergy'],
    ];
    $media = [
      ['3e6e787da0d4f56c7fba9a99a344c4cfb89e4e3d.jpg','velocity','Velocity','cb07be31077901284b216bad893805196f094747.png','“Cortexx delivered thoughtful design, clear communication, and a seamless workflow, making the entire collaboration smooth.”'],
      ['a0a19859e775361bd68698ede43c8678737c182d.jpg','synergy','Synergy','a5347cae3133954bc0feba4678f8acc6a815d29d.png','“Cortexx transformed our complex product into a simple, intuitive experience that our users genuinely enjoy navigating.”'],
    ];
    $rows = [[$media[0], $cards[0], $cards[2], $cards[1], $media[1]], [$media[1], $cards[1], $cards[0], $cards[2], $media[0]]];
    foreach ($rows as $ri => $row): ?>
    <div class="testimonial-row testimonial-row-<?= $ri + 1 ?>">
      <div class="testimonial-track" data-direction="<?= $ri ? 'right' : 'left' ?>">
        <?php for ($copy = 0; $copy < 2; $copy++): ?><div class="testimonial-set" <?= $copy ? 'aria-hidden="true"' : '' ?>>
          <?php foreach ($row as $item): if (is_array($item) && isset($item[4]) && str_ends_with($item[0], '.jpg')): ?>
            <article class="tcard-media"><img src="<?= $img($item[0]) ?>" alt=""><div class="tmedia-overlay"><img class="tmedia-logo" src="<?= $b ?>/assets/images/brand-<?= $item[1] ?>.svg" alt="<?= htmlspecialchars($item[2]) ?>"><blockquote><?= htmlspecialchars($item[4]) ?></blockquote></div></article>
          <?php else: ?>
            <article class="tcard">
              <header class="tcard-head"><img class="tavatar" src="<?= $b ?>/assets/images/figma/<?= $item[2] ?>" alt="<?= htmlspecialchars($item[4]) ?> client avatar"><img src="<?= $b ?>/assets/images/brand-<?= $item[0] ?>.svg" alt="<?= htmlspecialchars($item[1]) ?>"></header>
              <div class="stars" aria-label="5 out of 5 stars"><?php for ($i = 0; $i < 5; $i++): ?><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M9 .9l2.4 5 5.5.7-4 3.9 1 5.4L9 13.4l-4.9 2.5 1-5.4-4-3.9 5.5-.7z"/></svg><?php endfor; ?></div>
              <blockquote><?= htmlspecialchars($item[3]) ?></blockquote><footer class="who"><b><?= htmlspecialchars($item[4]) ?></b><span><?= htmlspecialchars($item[5]) ?></span></footer>
            </article>
          <?php endif; endforeach; ?></div><?php endfor; ?>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
  <div class="recognition wrap">
    <h3>Featured and recognized:</h3>
    <div class="recognition-logos" aria-label="Featured and recognized brands">
      <img src="<?= $b ?>/assets/images/recognition-oyo.svg" alt="OYO">
      <img src="<?= $b ?>/assets/images/recognition-fedex.svg" alt="FedEx">
      <img src="<?= $b ?>/assets/images/recognition-amazon.svg" alt="Amazon">
      <img src="<?= $b ?>/assets/images/recognition-ola.svg" alt="OLA">
      <img src="<?= $b ?>/assets/images/recognition-microsoft.svg" alt="Microsoft">
      <img src="<?= $b ?>/assets/images/recognition-walmart.svg" alt="Walmart">
    </div>
  </div>
</section>
</main>

<!-- ================= FOOTER ================= -->
<div class="footer-reveal">
<footer class="footer" id="contact">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-news">
        <div class="foot-logos">
          <img src="<?= $b ?>/assets/images/logo-icon.png" alt="" width="47" height="52" aria-hidden="true">
          <img src="<?= $b ?>/assets/images/logo-word-light.png" alt="Cortexx" width="163" height="52">
        </div>
        <p>Automate the busywork and give your business more room to grow.</p>
        <form class="news-form" id="newsForm" method="post" action="<?= $b ?>/api/newsletter" novalidate>
          <input type="hidden" name="csrf" value="<?= htmlspecialchars($csrf ?? '') ?>">
          <input type="email" name="email" placeholder="Enter your email" required aria-label="Email address" autocomplete="email">
          <input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
          <button type="submit">Let’s Talk</button>
        </form>
        <div id="newsMsg" role="status" aria-live="polite" style="margin-top:12px;font-size:15px;color:#fff"></div>
        <div class="socials">
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 20 20"><path d="M12 20v-7h2.5l.5-3h-3V8c0-.9.3-1.5 1.6-1.5H15V3.9C14.7 3.8 13.6 3.7 12.4 3.7 10 3.7 8.3 5.1 8.3 7.7V10H5.5v3h2.8v7z"/></svg></a>
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 20 20"><path d="M4 3a2 2 0 11-.1 4A2 2 0 014 3zm-1.7 5h3.4v9H2.3zM8.5 8h3.2v1.3h.1c.4-.8 1.5-1.6 3.1-1.6 3.3 0 4 2.1 4 4.9V17h-3.4v-3.9c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2V17H8.5z"/></svg></a>
          <a href="#" aria-label="X (Twitter)"><svg viewBox="0 0 20 20"><path d="M11.9 8.5L18 2h-1.5l-5.3 5.6L7.6 2H2l6.6 8.9L2 18h1.5l5.7-6.1L13.4 18H18zM4.2 3.3h2.3l8.9 13.4h-2.3z"/></svg></a>
        </div>
      </div>
      <div class="foot-cols">
        <div class="foot-col">
          <h5>Menu</h5>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#capabilities">Capabilities</a></li>
            <li><a href="#case-studies">Case Studies</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="mailto:support@parfaitartlogistics.com">info@cortexx.tech</a></li>
            <li><a href="tel:+18662553892">+(866) 255-3892</a></li>          </ul>
          <h5 class="address-heading">Address</h5>
          <p>Los Angeles, CA 1800 S Main St, Los Angeles, CA 90015</p>
          </ul>
        </div>
      </div>
    </div>
    <hr class="foot-line">
    <div class="foot-word" aria-hidden="true">
      <svg viewBox="0 0 1280 254" preserveAspectRatio="xMidYMax meet" width="1280" height="254">
        <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0d2ece"/><stop offset="0.12" stop-color="#0d2ece"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient></defs>
        <text x="640" y="236" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="800" font-size="330" letter-spacing="-10" fill="url(#wg)">Cortexx</text>
      </svg>
    </div>
    <div class="foot-base">
      <p>2026 Cortexx. All rights reserved.</p>
      <div class="links"><a href="#">Privacy Policy</a><span class="sep"></span><a href="#">Terms &amp; Conditions</a></div>
    </div>
  </div>
</footer>
</div>
<?php
$content = ob_get_clean();
require __DIR__ . '/../layouts/main.php';


