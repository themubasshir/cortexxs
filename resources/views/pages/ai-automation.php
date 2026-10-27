<?php
$b = $base ?? '';
$asset = fn(string $name) => $b . '/assets/images/ai-automation/' . $name;
$title = 'AI & Automation Services | Cortexx';
$description = 'Cortexx builds practical AI workflows, automation and connected business systems that reduce manual work and support growth.';
$canonicalPath = '/services/ai-automation';
$pageStyles = 'ai-automation.css?v=1';
$pageScripts = 'ai-automation.js?v=1';
$skipAppJs = true;
$challenges = [
    ['Repetitive tasks', 'Customer details, documents and updates are copied between tools, consuming time your team needs elsewhere.'],
    ['Slow handoffs', 'Quotes, approvals and follow-ups depend on reminders and chasing, creating delays for your team and customers.'],
    ['Scattered information', 'Answers are spread across emails, documents and systems. Your team spends time searching before they can make decisions.'],
    ['Systems you’ve outgrown', 'Software that once met your needs now makes it harder to connect tools, adapt processes or handle growing demand.'],
];
$capabilities = [
    ['Workflow Automation', 'Automate repetitive tasks, approvals and document processing so your team spends less time keeping things moving.', 'workflow'],
    ['AI for Sales & Support', 'Answer customer questions, qualify new enquiries and follow up consistently, with your team stepping in when needed', 'sales'],
    ['Connected Business Tools', 'Connect your email, customer records, finance tools & existing software so information moves without being entered twice.', 'connected'],
    ['Company Search Reporting', 'Help your team find answers across company documents and turn business data into clear, useful reports.', 'search'],
    ['Your AI Featured Products', 'Add personalized recommendations & guided assistance to your website, app or software, helping customers complete tasks.', 'product'],
];
$steps = [
    ['Strategy & Discovery', 'Understand your processes, systems and priorities.'],
    ['Solution Design', 'Define the workflows, integrations and human approvals.'],
    ['Build & Integrate', 'Develop the solution and connect your existing tools.'],
    ['Test & Refine', 'Check accuracy, permissions and exceptions using real scenarios.'],
    ['Launch & Training', 'Introduce the system and prepare your team to use it.'],
    ['Monitor & Improve', 'Track performance and refine it as your business evolves.'],
];
ob_start();
?>
<div class="ai-page">
  <header class="ai-header" id="top">
    <a class="ai-brand" href="<?= $b ?>/" aria-label="Cortexx home"><img src="<?= $b ?>/assets/images/logo-dark.png" alt="Cortexx" width="126" height="38"></a>
    <nav class="ai-nav" aria-label="Primary navigation">
      <a href="<?= $b ?>/#work">Work</a><a href="#capabilities">Capabilities</a><a href="<?= $b ?>/#case-studies">Case Studies</a><a href="<?= $b ?>/#about">About</a><a href="#contact">Contact</a>
    </nav>
    <a class="ai-header-cta" href="#contact">Let’s Talk</a>
    <button class="ai-menu-button" type="button" aria-label="Open menu" aria-controls="ai-mobile-nav" aria-expanded="false"><span></span><span></span><span></span></button>
  </header>
  <nav class="ai-mobile-nav" id="ai-mobile-nav" aria-label="Mobile navigation" hidden>
    <a href="<?= $b ?>/#work">Work</a><a href="#capabilities">Capabilities</a><a href="<?= $b ?>/#case-studies">Case Studies</a><a href="<?= $b ?>/#about">About</a><a href="#contact">Contact</a>
  </nav>
  <main>
    <section class="ai-hero" aria-labelledby="ai-title">
      <div class="ai-hero-glow" aria-hidden="true"></div>
      <div class="ai-container ai-hero-grid">
        <div class="ai-hero-copy">
          <span class="ai-pill">AI <i></i> Automation <i></i> Integration</span>
          <h1 id="ai-title">Smarter Systems For The Work That Drives <em>Growth.</em></h1>
          <p>We turn manual work into intelligent operations, connecting your systems so your business can grow without multiplying the workload.</p>
          <div class="ai-actions"><a class="ai-button ai-button-primary" href="#contact">Start Project <span aria-hidden="true">↗</span></a><a class="ai-button ai-button-light" href="#case-study">View Work <span aria-hidden="true">↗</span></a></div>
          <div class="ai-proof"><div class="ai-avatars" aria-hidden="true"><img src="<?= $b ?>/assets/images/figma/cb07be31077901284b216bad893805196f094747.png" alt=""><img src="<?= $b ?>/assets/images/figma/4ae134041644c361fd828d14a56c538158b5906d.png" alt=""><img src="<?= $b ?>/assets/images/figma/253ea0a2729e2938527d49babb39dfb55ca389cd.png" alt=""><span>+1k</span></div><span>Trusted by 10k+ clients</span></div>
        </div>
        <div class="ai-workflow" role="img" aria-label="An enquiry moves through information extraction, human approval and an AI action before connected systems are updated.">
          <svg class="ai-connections" viewBox="0 0 617 647" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="ai-line" x1="0" x2="1"><stop stop-color="#5870ff"/><stop offset="1" stop-color="#a5b3ff"/></linearGradient></defs><path class="ai-path ai-path-one" d="M195 112 H309 Q325 112 325 128 V177"/><path class="ai-path ai-path-two" d="M402 236 V297 Q402 313 385 313 H265"/><path class="ai-path ai-path-three" d="M195 372 H340 Q355 372 355 387 V438"/><path class="ai-path ai-path-four" d="M433 497 H514 Q530 497 530 512 V553"/><circle class="ai-signal ai-signal-one" r="4"/><circle class="ai-signal ai-signal-two" r="4"/></svg>
          <div class="ai-flow-card ai-flow-one"><span class="ai-flow-icon">↗</span><div><strong>Enquiry received</strong><small>TOOLS · AUTOMATION · INTEGRATION</small></div><span class="ai-hitl">HITL</span></div>
          <div class="ai-flow-card ai-flow-two"><span class="ai-flow-icon">▦</span><div><strong>Information extracted</strong><small>MODEL · MEMORY · TOOLS</small></div><span class="ai-hitl">HITL</span></div>
          <div class="ai-flow-card ai-flow-three"><span class="ai-flow-icon">✓</span><div><strong>Human approval</strong><small>TOOLS · AUTOMATION · INTEGRATION</small></div><span class="ai-hitl">HITL</span></div>
          <div class="ai-flow-card ai-flow-four"><span class="ai-flow-icon ai-core">✦</span><div><strong>AI action</strong><small>TOOLS · AUTOMATION · INTEGRATION</small></div><span class="ai-hitl">HITL</span></div>
          <div class="ai-flow-card ai-flow-five"><span class="ai-flow-icon">✓</span><div><strong>Systems updated</strong><small>TOOLS · AUTOMATION · INTEGRATION</small></div><span class="ai-hitl">HITL</span></div>
          <span class="ai-workflow-status"><span></span> Workflow complete</span>
        </div>
      </div>
    </section>
    <section class="ai-challenges ai-section" id="challenges" aria-labelledby="ai-challenges-title"><div class="ai-container ai-challenge-grid">
      <div><span class="ai-pill">Your Business Challenges</span><h2 id="ai-challenges-title">We understand what’s <em>slowing you down.</em></h2><p>We identify where the friction starts, then connect your systems and apply AI and automation where they can make a practical difference.</p><p>Cortexx combines strategy, design and engineering under one team to create digital products people actually want to use.</p><a class="ai-button ai-button-outline" href="<?= $b ?>/#capabilities">View All Services <span aria-hidden="true">↗</span></a></div>
      <div class="ai-challenge-list"><?php foreach ($challenges as $i => $item): ?><article class="ai-challenge"><span class="ai-num">0<?= $i + 1 ?></span><div><h3><?= htmlspecialchars($item[0]) ?></h3><p><?= htmlspecialchars($item[1]) ?></p></div><span class="ai-challenge-arrow" aria-hidden="true">↗</span></article><?php endforeach; ?></div>
    </div></section>
    <section class="ai-capabilities ai-section" id="capabilities" aria-labelledby="ai-capabilities-title"><div class="ai-container"><div class="ai-section-heading"><span class="ai-pill">What We Build</span><h2 id="ai-capabilities-title">Less manual work.<br><em>More room to grow.</em></h2></div><div class="ai-capability-grid">
      <?php foreach ($capabilities as $item): ?><article class="ai-capability-card ai-capability-<?= $item[2] ?>"><div class="ai-capability-art" aria-hidden="true">
        <?php if ($item[2] === 'workflow'): ?><div class="ai-ui-heading"><small>Digital operations</small><strong>Internal Tools &amp; Portals</strong><span>● Smart</span></div><span class="ai-ui-rings"></span><div class="ai-mini-panel ai-mini-left">▣ <b>Schedule</b></div><div class="ai-mini-core">✦</div><div class="ai-mini-panel ai-mini-right">✓ <b>Completed</b></div>
        <?php elseif ($item[2] === 'sales'): ?><span class="ai-ui-rings"></span><div class="ai-sales-panel"><strong>Sales</strong><small>Qualified leads <b>24</b></small><i></i></div><div class="ai-mini-core">✦</div><div class="ai-support-panel"><strong>Support</strong><small>J &nbsp; ▰▰ &nbsp; ✓</small><small>M &nbsp; ▰▰ &nbsp; ✓</small><em>● Resolved by AI</em></div>
        <?php elseif ($item[2] === 'connected'): ?><div class="ai-ui-heading"><small>Digital operations</small><strong>Internal Tools &amp; Portals</strong><span>● Live</span></div><span class="ai-ui-rings"></span><span class="ai-connected-node ai-node-one">W</span><span class="ai-connected-node ai-node-two">CSS</span><span class="ai-connected-node ai-node-three">✦</span>
        <?php elseif ($item[2] === 'search'): ?><div class="ai-ui-heading"><small>Digital operations</small><strong>Internal Tools &amp; Portals</strong><span>● Live</span></div><span class="ai-ui-rings"></span><div class="ai-search-box">⌕ &nbsp; Search ...</div><div class="ai-search-result">▤ &nbsp; Company answers <b>↗</b></div>
        <?php else: ?><div class="ai-ui-heading"><small>Legacy transformation</small><strong>Product Modernization</strong><span>● Upgrade</span></div><span class="ai-ui-rings"></span><div class="ai-product-state">Legacy <span>→</span> <b>Ready</b></div><?php endif; ?>
      </div><div class="ai-capability-copy"><h3><?= htmlspecialchars($item[0]) ?></h3><p><?= htmlspecialchars($item[1]) ?></p></div></article><?php endforeach; ?>
    </div></div></section>
    <section class="ai-process ai-section" id="process" aria-labelledby="ai-process-title"><div class="ai-container ai-process-grid"><div class="ai-process-intro"><span class="ai-pill">How We Build</span><h2 id="ai-process-title">From business need<br><em>to working system.</em></h2><p>We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality, and measurable growth.</p><div class="ai-process-art" aria-hidden="true"><span class="ai-process-ring ai-process-ring-one"></span><span class="ai-process-ring ai-process-ring-two"></span><span class="ai-process-ring ai-process-ring-three"></span><span class="ai-process-link"></span><img class="ai-process-portrait" src="<?= $asset('connected-portrait.png') ?>" alt="" width="200" height="200" loading="lazy"><span class="ai-process-hub">✦</span><span class="ai-process-phone">▯</span><span class="ai-process-confirm">✓ You have successfully connected to Digital Product!</span></div></div><ol class="ai-step-list"><?php foreach ($steps as $i => $step): ?><li><span class="ai-step-number"><?= $i + 1 ?></span><div><h3><?= htmlspecialchars($step[0]) ?></h3><p><?= htmlspecialchars($step[1]) ?></p></div></li><?php endforeach; ?></ol></div></section>
    <section class="ai-case ai-section" id="case-study" aria-labelledby="ai-case-title"><div class="ai-container ai-case-grid"><div><span class="ai-pill">Case Study</span><h2 id="ai-case-title">AI in practice.</h2><p>We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality, and measurable growth.</p><div class="ai-case-image"><img src="<?= $asset('9c5e1a3bd48b3692c25de5269fa30599db26ef80.png') ?>" alt="Digital product interface from the case study" width="1024" height="768" loading="lazy"></div></div><div class="ai-case-details"><h3>A short description of the business and solution.</h3><div><h4>Challenge</h4><p>We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality, and measurable growth.</p></div><div><h4>We Build</h4><p>The system, automation or integration Cortexx delivered.</p></div><div><h4>Result</h4><p>A verified improvement, supported by a metric where available.</p></div><a class="ai-button ai-button-primary" href="<?= $b ?>/#case-studies">View Full Case Study <span aria-hidden="true">↗</span></a></div></div></section>
    <section class="ai-testimonials ai-section" aria-labelledby="ai-testimonials-title"><div class="ai-container"><div class="ai-testimonials-head"><div><span class="ai-pill">Trusted & Featured</span><h2 id="ai-testimonials-title">Built with clients.<br><em>Proven in practice.</em></h2></div><div class="ai-testimonial-controls"><button type="button" data-testimonial-prev aria-label="Previous testimonials">←</button><button type="button" data-testimonial-next aria-label="Next testimonials">→</button></div></div><div class="ai-testimonial-track" tabindex="0" aria-label="Client testimonials"><article><div class="ai-stars">★★★★★</div><blockquote>“Cortexx made our product simple andintuitive”</blockquote><strong>Alex Carter</strong><span>Product Lead, Vortextt</span></article><article><div class="ai-stars">★★★★★</div><blockquote>“Thoughtful design and clear communication”</blockquote><strong>Carlos Rivera</strong><span>Design Director, Velocity</span></article><article><div class="ai-stars">★★★★★</div><blockquote>“A reliable partner from concept to lanuch”</blockquote><strong>Jordan MItchell Rivera</strong><span>Founder, Synergy</span></article></div><div class="ai-recognition"><h3>Featured and recognized:</h3><div><?php foreach (['oyo','fedex','amazon','ola','microsoft','walmart'] as $brand): ?><img src="<?= $b ?>/assets/images/recognition-<?= $brand ?>.svg" alt="<?= ucfirst($brand) ?>" loading="lazy"><?php endforeach; ?></div></div></div></section>
  </main>
  <footer class="ai-footer" id="contact"><div class="ai-container"><div class="ai-footer-top"><div class="ai-footer-contact"><div class="ai-footer-logo"><img src="<?= $b ?>/assets/images/logo-icon.png" alt="" width="47" height="52"><img src="<?= $b ?>/assets/images/logo-word-light.png" alt="Cortexx" width="163" height="52"></div><p>Automate the busywork and give your business more room to grow.</p><form class="news-form" id="newsForm" method="post" action="<?= $b ?>/api/newsletter" novalidate><input type="hidden" name="csrf" value="<?= htmlspecialchars($csrf ?? '') ?>"><input type="email" name="email" placeholder="Enter your email" required aria-label="Email address" autocomplete="email"><input type="text" name="website" tabindex="-1" autocomplete="off" class="ai-honeypot" aria-hidden="true"><button type="submit">Let’s Talk</button></form><div id="newsMsg" role="status" aria-live="polite"></div></div><div class="ai-footer-links"><div><h3>Menu</h3><a href="<?= $b ?>/#about">About Us</a><a href="<?= $b ?>/#work">Work</a><a href="#capabilities">Capabilities</a><a href="<?= $b ?>/#case-studies">Case Studies</a><a href="#contact">Contact</a></div><div><h3>Contact</h3><a href="mailto:info@cortexx.tech">info@cortexx.tech</a><a href="tel:+18662553892">+(866) 255-3892</a><h3>Address</h3><p>Los Angeles, CA 1800 S Main St, Los Angeles, CA 90015</p></div></div></div><div class="ai-footer-word" aria-hidden="true">Cortexx</div><div class="ai-footer-bottom"><span>2026 Cortexx. All rights reserved.</span><div><a href="<?= $b ?>/#contact">Privacy Policy</a><a href="<?= $b ?>/#contact">Terms &amp; Conditions</a></div></div></div></footer>
</div>
<?php $content = ob_get_clean(); require __DIR__ . '/../layouts/main.php'; ?>
