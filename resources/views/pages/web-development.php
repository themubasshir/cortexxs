<?php
$b = $base ?? '';
$asset = fn(string $name) => $b . '/assets/images/web-development/' . $name;
$title = 'Web Development Services | Cortexx';
$description = 'Cortexx designs and builds custom, high-performance websites that explain your value, attract the right people and turn attention into action.';
$canonicalPath = '/services/web-development';
$pageStyles = 'web-development.css?v=1';
$pageScripts = 'web-development.js?v=1';
$nav = [
    ['Work', $b . '/#work'],
    ['Capabilities', '#capabilities', true],
    ['Case Studies', $b . '/#case-studies'],
    ['About', $b . '/#about'],
    ['Contact', '#contact'],
];
$footerHomePrefix = $b . '/';
$sidebar = ['home', 'cashier', 'flow', 'work', 'repair', 'settings', 'help', 'logout'];
$articles = [
    ['tv', 'Software Transformation', 'We transform outdated software into scalable, efficient, and user-friendly digital solutions that drive growth.'],
    ['gitbook', 'Prompt Center', 'Organize, discover, and manage AI prompts efficiently to streamline workflows and boost productivity.'],
    ['game', 'Platform', 'A unified platform that simplifies workflows, connects teams, and accelerates business growth.'],
];
$work = [
    ['Nexora', 'Clean technology · Website redesign'],
    ['Haven', 'Hospitality · Website design'],
];
// Figma only carries body copy for the expanded CRO row; the other rows use short supporting lines.
$services = [
    ['app-window', 'Website Design, Redesign and UI/UX', 'Shape clear, distinctive interfaces that explain your value and guide every visitor.'],
    ['api', 'Web Development and CMS', 'Build fast, accessible websites on a CMS your team can update with confidence.'],
    ['percent', 'Conversion Rate Optimization', 'Improve messaging, calls to action and key journeys using real behaviour.'],
    ['ai-expand', 'SEO and AI Search Visibility', 'Structure content and technical foundations so search engines and AI assistants can find you.'],
    ['robotic', 'AI and Automation', 'Connect forms, enquiries and follow-ups to the systems and workflows behind your website.'],
];
$openService = 2;
$steps = [
    ['Strategy & Discovery', 'Understand the goals, audience and competitive landscape.'],
    ['Content and Architecture', 'Shape the message, journeys and website structure.'],
    ['UX and UI Design', 'Create a distinctive, intuitive and responsive experience.'],
    ['Development and Integrations', 'Build the website and connect the systems it needs.'],
    ['Testing and Optimization', 'Refine accessibility, speed and conversion paths.'],
    ['Launch and Growth', 'Deploy, monitor and support future improvements.'],
];
$e = fn(string $s) => htmlspecialchars($s, ENT_QUOTES);
ob_start();
?>
<?php require __DIR__ . '/../components/header.php'; ?>
<div class="wd-page">
  <main>
    <section class="wd-hero" aria-labelledby="wd-title">
      <div class="wd-hero-wash" aria-hidden="true"></div>
      <div class="wd-container wd-hero-grid">
        <div class="wd-hero-copy">
          <span class="wd-pill">We Design <i></i> Development <i></i> AI</span>
          <h1 id="wd-title">Websites Built to Earn <em>Trust &amp; Drive</em> Growth.</h1>
          <p>We design and build custom, high-performance websites that explain your value, attract the right people and turn attention into action.</p>
          <div class="wd-actions">
            <a class="btn btn-primary" href="#contact">Start Project</a>
            <a class="btn btn-ghost" href="#work">View Work <img src="<?= $asset('figma-play-circle.svg') ?>" alt="" width="16" height="16"></a>
          </div>
        </div>
        <div class="wd-studio is-pending" role="group" aria-label="Illustration: a project brief is typed into the Cortexx workspace and service cards appear.">
          <div class="wd-studio-glow" aria-hidden="true"></div>
          <div class="wd-stage" aria-hidden="true">
            <div class="wd-panel"><span class="wd-tab"></span></div>
            <div class="wd-rail">
              <span class="wd-rail-active"></span>
              <?php foreach ($sidebar as $i => $icon): ?><span class="wd-rail-btn" style="--i:<?= $i ?>"><img src="<?= $asset('figma-nav-' . $icon . '.svg') ?>" alt="" width="15" height="15"></span><?php endforeach; ?>
            </div>
            <div class="wd-prompt">
              <p class="wd-welcome">Welcome</p>
              <div class="wd-form">
                <div class="wd-input"><span class="wd-typed">Share your business goals or ideas to get started...</span><span class="wd-caret"></span></div>
                <div class="wd-toolbar">
                  <span class="wd-chip"><img src="<?= $asset('figma-chip-folder.svg') ?>" alt="" width="10" height="10">Project: Medium<i></i></span>
                  <span class="wd-chip"><img src="<?= $asset('figma-chip-flow.svg') ?>" alt="" width="10" height="10">Workflow: select<i></i></span>
                  <span class="wd-tool wd-tool-mic"><b></b></span>
                  <span class="wd-tool wd-tool-send"><img src="<?= $asset('figma-submit-arrow.svg') ?>" alt="" width="13" height="13"></span>
                </div>
              </div>
              <p class="wd-caption">Accelerate AI-Powered Automation &amp; Software Projects with Easy-to-Use and Pre-Built Library</p>
            </div>
            <span class="wd-brand-chip"><img src="<?= $b ?>/assets/images/logo-dark.png" alt="" width="102" height="31"></span>
            <?php foreach ($articles as $i => $item): ?>
            <div class="wd-article wd-article-<?= $i + 1 ?>">
              <img src="<?= $asset('figma-card-' . $item[0] . '.svg') ?>" alt="" width="20" height="20">
              <strong><?= $e($item[1]) ?></strong>
              <p><?= $e($item[2]) ?></p>
              <span class="wd-more">More <img src="<?= $asset('figma-arrow-small.svg') ?>" alt="" width="10" height="10"></span>
            </div>
            <?php endforeach; ?>
            <div class="wd-talk"><span class="wd-bars"><i></i><i></i><i></i><i></i><i></i></span><small>Talk</small></div>
          </div>
          <button class="wd-motion-toggle" type="button" aria-label="Pause animation" aria-pressed="false"><span class="wd-icon-pause" aria-hidden="true"></span></button>
        </div>
      </div>
    </section>

    <section class="wd-section wd-featured" id="featured" aria-labelledby="wd-featured-title">
      <div class="wd-container">
        <div class="wd-head reveal">
          <div><span class="wd-pill">Featured Transformation</span><h2 id="wd-featured-title">See What A Stronger <em>Website Changes</em></h2></div>
          <p>A clearer journey from first visit to qualified enquiry.</p>
        </div>
        <article class="wd-compare reveal">
          <div class="wd-compare-media">
            <div class="wd-compare-frame" style="--split:50%">
              <div class="wd-compare-before wd-blank" aria-hidden="true"></div>
              <div class="wd-compare-after wd-blank" aria-hidden="true"></div>
              <input class="wd-compare-range" type="range" min="10" max="90" value="50" aria-label="Compare before and after views">
              <span class="wd-divider" aria-hidden="true"><span class="wd-handle"><img src="<?= $asset('figma-compare-arrows.svg') ?>" alt="" width="25" height="25"></span></span>
            </div>
            <span class="wd-tag wd-tag-before">Before</span>
            <span class="wd-tag wd-tag-after">After</span>
          </div>
          <h3>Rivermere - Website Redesign</h3>
        </article>
      </div>
    </section>

    <section class="wd-section wd-work" id="work" aria-labelledby="wd-work-title">
      <div class="wd-container">
        <div class="wd-head reveal"><div><span class="wd-pill">Selected Website Work</span><h2 id="wd-work-title"><em>Real Work</em> Should Do The Selling</h2></div></div>
        <div class="wd-work-grid">
          <?php foreach ($work as $i => $item): ?>
          <article class="wd-work-card reveal" data-delay="<?= $i * 120 ?>">
            <div class="wd-work-media wd-blank" aria-hidden="true"></div>
            <div class="wd-work-meta"><div><h3><?= $e($item[0]) ?></h3><p><?= $e($item[1]) ?></p></div><img src="<?= $asset('figma-arrow-46.svg') ?>" alt="" width="46" height="46"></div>
          </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="wd-section wd-services" id="capabilities" aria-labelledby="wd-services-title">
      <div class="wd-container">
        <div class="wd-head reveal">
          <div><span class="wd-pill">What we do</span><h2 id="wd-services-title">Websites Built To Perform At <em>Every Stage</em></h2></div>
          <p>We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality &amp; measurable growth.</p>
        </div>
        <div class="wd-accordion reveal">
          <?php foreach ($services as $i => $item): $open = $i === $openService; ?>
          <div class="wd-acc-item<?= $open ? ' is-open' : '' ?>">
            <h3>
              <button type="button" id="wd-acc-btn-<?= $i ?>" aria-expanded="<?= $open ? 'true' : 'false' ?>" aria-controls="wd-acc-panel-<?= $i ?>">
                <img src="<?= $asset('figma-svc-' . $item[0] . '.svg') ?>" alt="" width="30" height="30">
                <span><?= $e($item[1]) ?></span>
                <i class="wd-acc-icon" aria-hidden="true"></i>
              </button>
            </h3>
            <div class="wd-acc-panel" id="wd-acc-panel-<?= $i ?>" role="region" aria-labelledby="wd-acc-btn-<?= $i ?>"><div><p><?= $e($item[2]) ?></p></div></div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="wd-section wd-process" id="process" aria-labelledby="wd-process-title">
      <div class="wd-container wd-process-grid">
        <div class="wd-process-intro reveal">
          <span class="wd-pill">How We Do It</span>
          <h2 id="wd-process-title">A Clear Path From <em class="wd-deep">Strategy</em> To Launch.</h2>
          <p>A focused process that keeps decisions clear, collaboration simple and progress visible.</p>
        </div>
        <ol class="wd-steps">
          <?php foreach ($steps as $i => $step): ?>
          <li class="wd-step<?= $i === 0 ? ' is-active' : '' ?>"><span class="wd-step-dot" aria-hidden="true"><span><?= $i + 1 ?></span></span><div><h3><?= $e($step[0]) ?></h3><p><?= $e($step[1]) ?></p></div></li>
          <?php endforeach; ?>
        </ol>
      </div>
    </section>

    <div class="wd-testimonials">
      <?php $testimonialsId = 'testimonials'; require __DIR__ . '/../components/testimonials.php'; ?>
    </div>
  </main>
</div>
<?php require __DIR__ . '/../components/footer.php'; ?>
<?php $content = ob_get_clean(); require __DIR__ . '/../layouts/main.php'; ?>
