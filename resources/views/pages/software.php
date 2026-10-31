<?php
$b = $base ?? '';
$asset = fn(string $name) => $b . '/assets/images/software/' . $name;
$wdAsset = fn(string $name) => $b . '/assets/images/web-development/' . $name;
$logoIcon = $b . '/assets/images/logo-icon.png';
$title = 'Custom Software Development | Cortexx';
$description = 'Cortexx designs and builds SaaS platforms, business systems and AI-powered products around how your company operates.';
$canonicalPath = '/services/software';
$pageStyles = 'software.css?v=1';
$pageScripts = ['software.js?v=1', 'testimonial-carousel.js?v=1'];
$nav = [
    ['Work', $b . '/#work'],
    ['Capabilities', '#capabilities', true],
    ['Case Studies', $b . '/#case-studies'],
    ['About', $b . '/#about'],
    ['Contact', '#contact'],
];
$footerHomePrefix = $b . '/';
$sidebar = ['home', 'cashier', 'flow', 'work', 'repair', 'settings', 'help', 'logout'];
// Workflow pills: label, x, y, width, rotation (deg), from Figma 1038:182…190 (card-local design px).
$pills = [
    ['Animation', 14.82, 64.84, 60.91, -5.1],
    ['Accessibility', 89.26, 76.24, 56.85, 10.6],
    ['Automate', 89.06, 94.22, 50.93, -7.5],
    ['Navigation', 16.09, 94.42, 52.2, 4.6],
    ['Motion', 54.22, 110.22, 40.93, -5.1],
];
// Enterprise orbit apps: file, x, y, size (card-local design px), from Figma 1038:355…364.
$apps = [
    ['zenkit', 118.98, 97.19, 18.94],
    ['budget', 100.25, 64.84, 20.09],
    ['xing', 39.42, 97.19, 18.94],
    ['yoyo', 56.29, 64.84, 21.35],
];
// Illustration code sample (Figma 1038:199). Tokens verbatim; indentation normalised to two spaces per level.
$code = [
    'function Login(){',
    '  var password=document.login.password.value;',
    '  if (password=="kztYq8") {',
    '    window.location="bravo.htm";',
    '  }',
    '  else',
    '  {',
    '    window.location="domma',
];
$days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
$dayX = [20, 50.9, 82.6, 113.5, 143.7, 174.5, 203.8];
$work = [
    ['Cr', 'Online Learning Dashboard', false],
    ['ReadPlots', 'Interactive reading platform', true],
];
$steps = [
    ['Strategy & Discovery', 'Understand the business, users, market, and opportunities to establish a clear direction.'],
    ['Product Definition', 'ReadPlots is an interactive reading platform that makes stories more engaging through immersive content, exploration, and personalized experiences.'],
    ['UX & UI Design', 'Transform strategy into intuitive user experiences, wireframes, interfaces, and prototypes.'],
    ['Engineering', 'Bring the approved designs to life with scalable, reliable, and production-ready development.'],
    ['Testing & Refinement', 'Test functionality and usability, identify issues, and refine the product for a smooth experience.'],
    ['Launch & Growth', 'Launch confidently, monitor performance, gather insights, and continuously improve for sustainable growth.'],
];
$e = fn(string $s) => htmlspecialchars($s, ENT_QUOTES);
// Art element geometry in design px of the card art box (see docs/figma/software-geometry.md).
$at = fn(float $x, float $y, float $w, float $h = -1) => '--x:' . $x . ';--y:' . $y . ';--w:' . $w . ';--h:' . ($h < 0 ? $w : $h);
ob_start();
?>
<?php require __DIR__ . '/../components/header.php'; ?>
<div class="sw-page">
  <main>
    <section class="sw-hero is-pending" aria-labelledby="sw-title">
      <div class="sw-hero-wash" aria-hidden="true"></div>
      <div class="sw-container sw-hero-grid">
        <div class="sw-hero-copy">
          <span class="sw-pill">Software <i></i> System <i></i> AI</span>
          <h1 id="sw-title">Custom <em>Software</em> Engineered For Growth</h1>
          <p>We design &amp; build SaaS platforms, business systems and AI-powered products around how your company operates.</p>
          <div class="sw-actions">
            <a class="btn btn-primary" href="#contact">Start Project</a>
            <a class="btn btn-ghost" href="#work">View Work <img src="<?= $wdAsset('figma-play-circle.svg') ?>" alt="" width="16" height="16"></a>
          </div>
        </div>
        <div class="sw-studio" role="group" aria-label="Illustration: a software idea is described, the product is designed, connected to enterprise apps, its code runs and its performance is monitored.">
          <div class="sw-studio-glow" aria-hidden="true"></div>
          <div class="sw-stage" aria-hidden="true">
            <div class="sw-panel"></div>
            <div class="sw-rail">
              <span class="sw-rail-active"></span>
              <?php foreach ($sidebar as $i => $icon): ?><span class="sw-rail-btn" style="--i:<?= $i ?>"><img src="<?= $wdAsset('figma-nav-' . $icon . '.svg') ?>" alt="" width="15" height="15"></span><?php endforeach; ?>
            </div>
            <div class="sw-prompt">
              <p class="sw-heading">Description</p>
              <div class="sw-form">
                <div class="sw-input"><span class="sw-typed">Share your preferred software ideas to get started...</span><span class="sw-caret"></span></div>
                <div class="sw-toolbar">
                  <span class="sw-chip"><img src="<?= $wdAsset('figma-chip-folder.svg') ?>" alt="" width="10" height="10">Project: Medium<i></i></span>
                  <span class="sw-chip"><img src="<?= $wdAsset('figma-chip-flow.svg') ?>" alt="" width="10" height="10">Workflow: select<i></i></span>
                  <span class="sw-tool sw-tool-mic"><b></b></span>
                  <span class="sw-tool sw-tool-send"><img src="<?= $wdAsset('figma-submit-arrow.svg') ?>" alt="" width="13" height="13"></span>
                </div>
              </div>
              <p class="sw-caption">Accelerate AI-Powered Automation &amp; Software Projects with Easy-to-Use and Pre-Built Library</p>
            </div>

            <div class="sw-chart">
              <span class="sw-chart-title"></span>
              <img class="sw-chart-icon" src="<?= $asset('figma-chart-icon.svg') ?>" alt="" width="10" height="13">
              <?php foreach (['75' => 43.3, '50' => 70.3, '25' => 94.8, '0' => 121.3] as $label => $y): ?><span class="sw-chart-y" style="--y:<?= $y ?>"><?= $label ?></span><?php endforeach; ?>
              <?php foreach ($days as $i => $day): ?><span class="sw-chart-x" style="--x:<?= $dayX[$i] ?>"><?= $day ?></span><?php endforeach; ?>
              <img class="sw-chart-line" src="<?= $asset('figma-chart-line.svg') ?>" alt="" width="189" height="67">
              <span class="sw-chart-tip"><img src="<?= $asset('figma-chart-tooltip.svg') ?>" alt="" width="33" height="22"><i></i></span>
            </div>

            <div class="sw-card sw-enterprise">
              <img class="sw-card-icon" src="<?= $asset('figma-icon-shrink-dot.svg') ?>" alt="" width="20" height="20">
              <strong>Enterprise Software</strong>
              <svg class="sw-links" viewBox="0 0 176.63 171.8" preserveAspectRatio="none">
                <path d="M128.45 106.66L87.62 101.4"/><path d="M110.3 74.89L87.62 101.4"/><path d="M48.89 106.66L87.62 101.4"/><path d="M66.97 75.52L87.62 101.4"/>
              </svg>
              <?php foreach ($apps as $i => $app): ?><img class="sw-app" style="--x:<?= $app[1] ?>;--y:<?= $app[2] ?>;--s:<?= $app[3] ?>;--i:<?= $i ?>" src="<?= $asset('figma-app-' . $app[0] . '.svg') ?>" alt="" width="19" height="19"><?php endforeach; ?>
              <span class="sw-hub"><img src="<?= $logoIcon ?>" alt="" width="18" height="19"></span>
              <span class="sw-more">More <img src="<?= $wdAsset('figma-arrow-small.svg') ?>" alt="" width="10" height="10"></span>
            </div>

            <div class="sw-card sw-workflow">
              <img class="sw-card-icon" src="<?= $asset('figma-icon-webhook.svg') ?>" alt="" width="20" height="20">
              <strong>Workflow Automation</strong>
              <?php foreach ($pills as $i => $pill): ?><span class="sw-flow-pill<?= $pill[0] === 'Motion' ? ' is-accent' : '' ?>" style="--x:<?= $pill[1] ?>;--y:<?= $pill[2] ?>;--w:<?= $pill[3] ?>;--r:<?= $pill[4] ?>deg;--i:<?= $i ?>"><?= $pill[0] ?></span><?php endforeach; ?>
              <span class="sw-more">More <img src="<?= $wdAsset('figma-arrow-small.svg') ?>" alt="" width="10" height="10"></span>
            </div>

            <div class="sw-code">
              <strong>Seamless Integration</strong>
              <pre><?php foreach ($code as $i => $line): ?><span style="--i:<?= $i ?>"><?= $e($line) ?></span><?php endforeach; ?></pre>
              <span class="sw-code-scan"></span>
            </div>

            <span class="sw-tab"></span>
            <div class="sw-talk"><span class="sw-bars"><i></i><i></i><i></i><i></i><i></i></span><small>Talk</small></div>
          </div>
          <button class="sw-motion-toggle" type="button" aria-label="Pause animation" aria-pressed="false"><span class="sw-icon-pause" aria-hidden="true"></span></button>
        </div>
      </div>
    </section>

    <section class="sw-section sw-featured" id="featured" aria-labelledby="sw-featured-title">
      <div class="sw-container">
        <div class="sw-head reveal">
          <div><span class="sw-pill">Featured Transformation</span><h2 id="sw-featured-title">See what a stronger <em>website changes</em></h2></div>
          <p>A clearer journey from first visit to qualified enquiry.</p>
        </div>
        <article class="sw-compare reveal">
          <div class="sw-compare-media">
            <div class="sw-compare-frame" style="--split:50%">
              <div class="sw-compare-before sw-blank" aria-hidden="true"></div>
              <div class="sw-compare-after sw-blank" aria-hidden="true"></div>
              <input class="sw-compare-range" type="range" min="10" max="90" value="50" aria-label="Compare before and after views">
              <span class="sw-divider" aria-hidden="true"><span class="sw-handle"><img src="<?= $wdAsset('figma-compare-arrows.svg') ?>" alt="" width="25" height="25"></span></span>
              <span class="sw-tag sw-tag-before">Before</span>
              <span class="sw-tag sw-tag-after">After</span>
            </div>
          </div>
          <h3>Rivermere - Website Redesign</h3>
        </article>
      </div>
    </section>

    <section class="sw-section sw-work" id="work" aria-labelledby="sw-work-title">
      <div class="sw-container">
        <div class="sw-head reveal"><div><span class="sw-pill">Selected Work</span><h2 id="sw-work-title">Software built for <em>real</em> businesses</h2></div></div>
        <div class="sw-work-grid">
          <?php foreach ($work as $i => $item): ?>
          <article class="sw-work-card reveal" data-delay="<?= $i * 120 ?>">
            <div class="sw-work-media<?= $item[2] ? ' is-framed' : ' sw-blank' ?>"><?php if ($item[2]): ?><span class="sw-work-shot sw-blank"></span><?php endif; ?></div>
            <div class="sw-work-meta"><div><h3><?= $e($item[0]) ?></h3><p><?= $e($item[1]) ?></p></div><img src="<?= $wdAsset('figma-arrow-46.svg') ?>" alt="" width="46" height="46"></div>
          </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="sw-section sw-build" id="capabilities" aria-labelledby="sw-build-title">
      <div class="sw-container">
        <div class="sw-head sw-head-center reveal"><div><span class="sw-pill">What We Build</span><h2 id="sw-build-title">The systems behind your <em>growth</em>.</h2></div></div>
        <div class="sw-build-grid">
          <article class="sw-build-card sw-build-wide reveal">
            <div class="sw-art" aria-hidden="true">
              <span class="sw-glow" style="<?= $at(221, 34, 145, 190) ?>"></span>
              <span class="sw-glow is-teal" style="<?= $at(401, 179, 130, 100) ?>"></span>
              <span class="sw-hair" style="<?= $at(184, 139.5, 220, 1) ?>"></span>
              <span class="sw-hair is-v" style="<?= $at(293.5, 30, 1, 220) ?>"></span>
              <span class="sw-ring" style="<?= $at(245, 91, 98) ?>"></span>
              <span class="sw-ring" style="<?= $at(219, 65, 150) ?>"></span>
              <span class="sw-ring" style="<?= $at(189, 35, 210) ?>"></span>
              <span class="sw-dot" style="<?= $at(292, 64, 3) ?>"></span>
              <span class="sw-dot" style="<?= $at(360, 138, 3) ?>"></span>
              <span class="sw-dot is-dim" style="<?= $at(292, 239, 3) ?>"></span>
              <span class="sw-tick" style="<?= $at(229, 139, 31, 1) ?>"></span>
              <span class="sw-tick" style="<?= $at(330, 139, 62, 1) ?>"></span>
              <span class="sw-panel-card sw-projects" style="<?= $at(72, 87, 158, 144) ?>">
                <span class="sw-panel-head"><img src="<?= $asset('figma-art-project.svg') ?>" alt="" width="18" height="18">Projects</span>
                <?php for ($r = 0; $r < 3; $r++): ?><span class="sw-skeleton-row" style="--r:<?= $r ?>"><i></i><b></b></span><?php endfor; ?>
              </span>
              <span class="sw-logo-orb" style="<?= $at(252, 98, 84) ?>"><img src="<?= $logoIcon ?>" alt="" width="55" height="56"></span>
              <span class="sw-panel-card sw-members" style="<?= $at(389, 90, 131, 112) ?>">
                <span class="sw-panel-head"><img src="<?= $asset('figma-art-members.svg') ?>" alt="" width="18" height="18">Members</span>
                <span class="sw-avatars"><i></i><i></i><i></i></span>
              </span>
            </div>
            <div class="sw-build-copy"><h3>Custom Software &amp; SaaS</h3><p>Purpose-built software designed around your business model and growth goals.</p></div>
          </article>

          <article class="sw-build-card sw-build-wide reveal" data-delay="120">
            <div class="sw-art" aria-hidden="true">
              <span class="sw-glow" style="<?= $at(226, 49, 152, 212) ?>"></span>
              <span class="sw-ring is-blue" style="<?= $at(251, 104, 102) ?>"></span>
              <span class="sw-ring is-blue" style="<?= $at(226, 79, 152) ?>"></span>
              <span class="sw-ring is-blue" style="<?= $at(197, 50, 210) ?>"></span>
              <span class="sw-dot is-lg" style="<?= $at(237, 153, 5) ?>"></span>
              <span class="sw-dot is-lg" style="<?= $at(362, 153, 5) ?>"></span>
              <span class="sw-status" style="<?= $at(74, 121, 144, 70) ?>"><img src="<?= $asset('figma-art-schedule.svg') ?>" alt="" width="22" height="29">Schedule</span>
              <span class="sw-hub-orb" style="<?= $at(262, 115, 80) ?>"><img src="<?= $asset('figma-art-hub.svg') ?>" alt="" width="48" height="50"></span>
              <span class="sw-status is-done" style="<?= $at(384, 121, 146, 70) ?>"><span class="sw-check"><img src="<?= $asset('figma-art-check.svg') ?>" alt="" width="19" height="19"></span>Completed</span>
            </div>
            <div class="sw-build-copy"><h3>AI &amp; Workflow Automation</h3><p>Automate repetitive work and uncover new opportunities with Al-powered workflows.</p></div>
          </article>

          <article class="sw-build-card reveal">
            <div class="sw-art" aria-hidden="true">
              <span class="sw-glow is-soft" style="<?= $at(65.5, 57.7, 154.7, 199.4) ?>"></span>
              <span class="sw-ring is-blue is-faint" style="<?= $at(97.65, 108.55, 91.16) ?>"></span>
              <span class="sw-ring is-blue is-faint" style="<?= $at(69.97, 80.88, 146.51) ?>"></span>
              <span class="sw-ring is-blue is-faint" style="<?= $at(41.48, 52.39, 203.49) ?>"></span>
              <span class="sw-hair is-flat" style="<?= $at(20.73, 153.73, 325.58, .81) ?>"></span>
              <span class="sw-hair is-flat is-v" style="<?= $at(142.82, 48.73, .81, 211.63) ?>"></span>
              <span class="sw-phone" style="<?= $at(93.17, 73.15, 99.3, 166.05) ?>"><i class="sw-notch"></i><img src="<?= $logoIcon ?>" alt="" width="34" height="35"><b></b></span>
              <span class="sw-builder" style="<?= $at(210.38, 85.35, 139.19, 54.53) ?>"><img src="<?= $asset('figma-art-builder.svg') ?>" alt="" width="18" height="18"><span><i></i><i></i></span></span>
              <span class="sw-dot is-violet" style="<?= $at(199.8, 188.73, 4.07) ?>"></span>
              <span class="sw-build-btn" style="<?= $at(218.52, 166.75, 152.21, 52.91) ?>"><i></i>Build app</span>
            </div>
            <div class="sw-build-copy"><h3>Web &amp; Mobile Application</h3><p>Modern, responsive applications that deliver a seamless user experience across every device.</p></div>
          </article>

          <article class="sw-build-card reveal" data-delay="120">
            <div class="sw-art" aria-hidden="true">
              <span class="sw-glow is-violet" style="<?= $at(123.97, 75.82, 144.36, 184.65) ?>"></span>
              <span class="sw-ring is-indigo" style="<?= $at(149.15, 128.7, 94) ?>"></span>
              <span class="sw-ring is-indigo" style="<?= $at(120.61, 100.16, 151.08) ?>"></span>
              <span class="sw-ring is-indigo" style="<?= $at(87.04, 66.59, 218.23) ?>"></span>
              <span class="sw-hair is-flat" style="<?= $at(27.45, 175.7, 337.41, .84) ?>"></span>
              <span class="sw-hair is-flat is-v" style="<?= $at(196.15, 40.57, .84, 260.19) ?>"></span>
              <span class="sw-dot is-violet" style="<?= $at(228.88, 92.61, 5.04) ?>"></span>
              <span class="sw-dot is-violet" style="<?= $at(128.27, 221.96, 5.04) ?>"></span>
              <span class="sw-dot is-violet" style="<?= $at(264.48, 200.95, 5.04) ?>"></span>
              <span class="sw-tile" style="<?= $at(150.83, 39.73, 90.65, 78.06) ?>"><img style="--iw:47" src="<?= $asset('figma-art-cloud.svg') ?>" alt="" width="47" height="39"></span>
              <span class="sw-tile" style="<?= $at(20.73, 170.66, 94, 80.58) ?>"><img style="--iw:39.45" src="<?= $asset('figma-art-database.svg') ?>" alt="" width="39" height="47"></span>
              <span class="sw-logo-orb is-sm" style="<?= $at(160.06, 137.09, 72.18) ?>"><img src="<?= $logoIcon ?>" alt="" width="41" height="42"></span>
              <span class="sw-tile" style="<?= $at(276.73, 170.66, 94, 80.58) ?>"><img style="--iw:50.36" src="<?= $asset('figma-art-code.svg') ?>" alt="" width="50" height="41"></span>
            </div>
            <div class="sw-build-copy"><h3>Internal Tools &amp; Portals</h3><p>Secure, role-based tools that give your team the information and control they need.</p></div>
          </article>

          <article class="sw-build-card reveal" data-delay="240">
            <div class="sw-art" aria-hidden="true">
              <span class="sw-glow is-soft" style="<?= $at(130.2, 63.1, 135.84, 187.79) ?>"></span>
              <span class="sw-ring is-blue is-faint" style="<?= $at(165.36, 125.43, 60.73) ?>"></span>
              <span class="sw-ring is-blue is-faint" style="<?= $at(138.19, 98.26, 115.07) ?>"></span>
              <span class="sw-ring is-blue is-faint" style="<?= $at(109.42, 69.49, 172.6) ?>"></span>
              <span class="sw-hair is-flat" style="<?= $at(20.72, 155.8, 350, .8) ?>"></span>
              <span class="sw-hair is-flat is-v" style="<?= $at(195.72, 40.73, .8, 227.74) ?>"></span>
              <span class="sw-progress" style="<?= $at(131, 151.8, 140.64, 13.58) ?>"><i></i><i></i><i></i></span>
              <span class="sw-tile sw-legacy" style="<?= $at(20.72, 117.44, 93.49, 83.9) ?>">Legacy</span>
              <span class="sw-tile sw-ready" style="<?= $at(278.03, 117.44, 89.5, 83.9) ?>"><span class="sw-check"><img src="<?= $asset('figma-art-check.svg') ?>" alt="" width="19" height="19"></span>Ready</span>
            </div>
            <div class="sw-build-copy"><h3>Product Modernization</h3><p>Evolve legacy systems into modern, scalable products that are easier to maintain and ready for what's next.</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="sw-section sw-process" id="process" aria-labelledby="sw-process-title">
      <div class="sw-container sw-process-grid">
        <div class="sw-process-intro reveal">
          <span class="sw-pill">How We Build</span>
          <h2 id="sw-process-title">A clear path from <em>idea</em> to growth.</h2>
          <p>We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality, and measurable growth.</p>
        </div>
        <ol class="sw-steps">
          <?php foreach ($steps as $i => $step): ?>
          <li class="sw-step<?= $i === 0 ? ' is-active' : '' ?>"><span class="sw-step-dot" aria-hidden="true"><span><?= $i + 1 ?></span></span><div><h3><?= $e($step[0]) ?></h3><p><?= $e($step[1]) ?></p></div></li>
          <?php endforeach; ?>
        </ol>
      </div>
    </section>

    <?php $carousel = ['id' => 'sw-testimonials-title', 'heading' => 'Built with clients. <em>Proven</em> in practice.', 'section' => 'ai-testimonials sw-testimonials', 'container' => 'sw-container', 'pill' => 'sw-pill']; require __DIR__ . '/../components/testimonial-carousel.php'; ?>
  </main>
</div>
<?php require __DIR__ . '/../components/footer.php'; ?>
<?php $content = ob_get_clean(); require __DIR__ . '/../layouts/main.php'; ?>
