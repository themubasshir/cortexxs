<?php
$b = $base ?? '';
$asset = fn(string $name) => $b . '/assets/images/ai-automation/' . $name;
$title = 'AI & Automation Services | Cortexx';
$description = 'Cortexx builds practical AI workflows, automation and connected business systems that reduce manual work and support growth.';
$canonicalPath = '/services/ai-automation';
$pageStyles = 'ai-automation.css?v=1';
$pageScripts = 'ai-automation.js?v=1';
$nav = [
    ['Work', $b . '/#work'],
    ['Capabilities', '#capabilities', true],
    ['Case Studies', $b . '/#case-studies'],
    ['About', $b . '/#about'],
    ['Contact', '#contact'],
];
$footerHomePrefix = $b . '/';
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
$challengeIcons = ['<path d="M23 8V3h-5M5 20v5h5M23 3l-6 6M5 25l6-6"/><path d="M22 16a9 9 0 0 1-15 6M6 12a9 9 0 0 1 15-6"/>','<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="18" y="3" width="7" height="7" rx="1"/><rect x="3" y="18" width="7" height="7" rx="1"/><rect x="18" y="18" width="7" height="7" rx="1"/><path d="M10 6h8M6 10v8M22 10v8M10 22h8"/>','<path d="M8 3H5a2 2 0 0 0-2 2v3m17-5h3a2 2 0 0 1 2 2v3M3 20v3a2 2 0 0 0 2 2h3m17-5v3a2 2 0 0 1-2 2h-3M8 11h10M8 16h13M8 21h7"/>','<circle cx="14" cy="14" r="5"/><path d="M14 1v4m0 18v4M1 14h4m18 0h4M5 5l3 3m12 12 3 3M23 5l-3 3M8 20l-3 3"/>'];
ob_start();
?>
<?php require __DIR__ . '/../components/header.php'; ?>
<div class="ai-page">
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
        <div class="ai-workflow" role="group" aria-label="An enquiry moves through information extraction, human approval and an AI action before connected systems are updated.">
          <svg class="ai-connections" viewBox="0 0 617 647" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="ai-line" x1="0" x2="1"><stop stop-color="#5870ff"/><stop offset="1" stop-color="#a5b3ff"/></linearGradient></defs><path class="ai-path ai-path-one" d="M329 141 H392"/><path class="ai-path ai-path-two" d="M489 179 V256"/><path class="ai-path ai-path-three" d="M392 294 H329"/><path class="ai-path ai-path-four" d="M232 333 V389 Q232 411 254 411 H266"/><circle class="ai-signal ai-signal-one" r="4"/><circle class="ai-signal ai-signal-two" r="4"/></svg>
          <div class="ai-flow-card ai-flow-one"><span class="ai-flow-icon">↗</span><div><strong>Enquiry received</strong><small>TOOLS · AUTOMATION · INTEGRATION</small></div><span class="ai-hitl">HITL</span></div>
          <div class="ai-flow-card ai-flow-two"><span class="ai-flow-icon">▦</span><div><strong>Information extracted</strong><small>MODEL · MEMORY · TOOLS</small></div><span class="ai-hitl">HITL</span></div>
          <div class="ai-flow-card ai-flow-three"><span class="ai-flow-icon">✓</span><div><strong>Human approval</strong><small>TOOLS · AUTOMATION · INTEGRATION</small></div><span class="ai-hitl">HITL</span></div>
          <div class="ai-flow-card ai-flow-four"><span class="ai-flow-icon ai-core">✦</span><div><strong>AI action</strong><small>TOOLS · AUTOMATION · INTEGRATION</small></div><span class="ai-hitl">HITL</span></div>
          <div class="ai-flow-card ai-flow-five"><span class="ai-flow-icon">✓</span><div><strong>Systems updated</strong><small>TOOLS · AUTOMATION · INTEGRATION</small></div><span class="ai-hitl">HITL</span></div>
          <button class="ai-motion-toggle" type="button" aria-label="Pause animation" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button>
        </div>
      </div>
    </section>
    <section class="ai-challenges ai-section" id="challenges" aria-labelledby="ai-challenges-title"><div class="ai-container ai-challenge-grid">
      <div><span class="ai-pill">Your Business Challenges</span><h2 id="ai-challenges-title">We understand what’s <em>slowing you down.</em></h2><p>We identify where the friction starts, then connect your systems and apply AI and automation where they can make a practical difference.</p><p>Cortexx combines strategy, design and engineering under one team to create digital products people actually want to use.</p><a class="ai-button ai-button-outline" href="<?= $b ?>/#capabilities">View All Services <span aria-hidden="true">↗</span></a></div>
      <div class="ai-challenge-list"><?php foreach ($challenges as $i => $item): ?><article class="ai-challenge"><span class="ai-challenge-icon" aria-hidden="true"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><?= $challengeIcons[$i] ?></svg></span><div><h3><?= htmlspecialchars($item[0]) ?></h3><p><?= htmlspecialchars($item[1]) ?></p></div><span class="ai-challenge-arrow" aria-hidden="true">↗</span></article><?php endforeach; ?></div>
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
    <section class="ai-case ai-section" id="case-study" aria-labelledby="ai-case-title"><div class="ai-container">
      <div class="ai-section-heading"><span class="ai-pill">Case Study</span><h2 id="ai-case-title">AI in practice.</h2></div>
      <article class="ai-case-card"><div class="ai-case-details"><h3>A short description of the business and solution.</h3><div><h4>Challenge</h4><p>We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality, and measurable growth.</p></div><div><h4>We Build</h4><p>The system, automation or integration Cortexx delivered.</p></div><div><h4>Result</h4><p>A verified improvement, supported by a metric where available.</p></div><button class="ai-button ai-button-primary" type="button" disabled title="Full case study is not yet available">View Full Case Study <span aria-hidden="true">↗</span></button></div><div class="ai-case-image"><img src="<?= $asset('9c5e1a3bd48b3692c25de5269fa30599db26ef80.png') ?>" alt="Digital product interface from the case study" width="1024" height="768" loading="lazy"></div></article>
    </div></section>
    <section class="ai-testimonials ai-section" aria-labelledby="ai-testimonials-title"><div class="ai-container"><div class="ai-testimonials-head"><div><span class="ai-pill">Trusted &amp; Featured</span><h2 id="ai-testimonials-title">Built with clients.<br><em>Proven in practice.</em></h2></div><div class="ai-testimonial-controls"><button type="button" data-testimonial-prev aria-label="Previous testimonials">←</button><button type="button" data-testimonial-next aria-label="Next testimonials">→</button></div></div>
      <?php $aiTestimonials = [
        ['vortex', 'Vortex', '1e37881e785c2acf3a1882b6dad6518d55813fa4.png', '“Cortexx made our product simple andintuitive”', 'Alex Carter', 'Product Lead, Vortextt'],
        ['velocity', 'Velocity', '5c3ed82dabd37cbe156322c8c9b2a0bc9ce4460e.png', '“Thoughtful design and clear communication”', 'Carlos Rivera', 'Design Director, Velocity'],
        ['synergy', 'Synergy', 'a5347cae3133954bc0feba4678f8acc6a815d29d.png', '“A reliable partner from concept to lanuch”', 'Jordan MItchell Rivera', 'Founder, Synergy'],
      ]; ?>
      <div class="ai-testimonial-track" tabindex="0" aria-label="Client testimonials"><?php foreach ($aiTestimonials as $item): ?><article><header><img class="ai-testimonial-avatar" src="<?= $b ?>/assets/images/figma/<?= $item[2] ?>" alt="" loading="lazy"><img class="ai-testimonial-brand" src="<?= $b ?>/assets/images/brand-<?= $item[0] ?>.svg" alt="<?= htmlspecialchars($item[1]) ?>" loading="lazy"></header><div class="ai-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote><?= htmlspecialchars($item[3]) ?></blockquote><footer><strong><?= htmlspecialchars($item[4]) ?></strong><span><?= htmlspecialchars($item[5]) ?></span></footer></article><?php endforeach; ?></div>
      <div class="ai-recognition"><h3>Featured and recognized:</h3><div><?php foreach (['oyo','fedex','amazon','ola','microsoft','walmart'] as $brand): ?><div class="ai-recognition-tile"><img src="<?= $b ?>/assets/images/recognition-<?= $brand ?>.svg" alt="<?= ucfirst($brand) ?>" loading="lazy"></div><?php endforeach; ?></div></div>
    </div></section>
  </main>
</div>
<?php require __DIR__ . '/../components/footer.php'; ?>
<?php $content = ob_get_clean(); require __DIR__ . '/../layouts/main.php'; ?>
