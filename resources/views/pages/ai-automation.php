<?php
$b = $base ?? '';
$asset = fn(string $name) => $b . '/assets/images/ai-automation/' . $name;
$title = 'AI & Automation Services | Cortexx';
$description = 'Cortexx builds practical AI workflows, automation and connected business systems that reduce manual work and support growth.';
$canonicalPath = '/services/ai-automation';
$pageStyles = 'ai-automation.css?v=1';
$pageScripts = ['ai-automation.js?v=2', 'testimonial-carousel.js?v=1'];
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
          <h1 id="ai-title">Smarter <em>Systems</em> For The Work That Drives Growth.</h1>
          <p>We turn manual work into intelligent operations, connecting your systems so your business can grow without multiplying the workload.</p>
          <div class="ai-actions"><a class="ai-button ai-button-primary" href="#contact">Start Project</a><a class="ai-button ai-button-light" href="#case-study">View Work <span aria-hidden="true">↗</span></a></div>
        </div>
        <div class="ai-workflow" role="group" aria-label="An enquiry moves through information extraction, human approval and an AI action before connected systems are updated.">
          <?= file_get_contents(__DIR__ . '/../../../public/assets/images/ai-automation/figma-hero-art.svg') ?>
          <button class="ai-motion-toggle" type="button" aria-label="Pause animation" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button>
        </div>
      </div>
    </section>
    <section class="ai-challenges ai-section" id="challenges" aria-labelledby="ai-challenges-title"><div class="ai-container ai-challenge-grid">
      <div><span class="ai-pill">Your Business Challenges</span><h2 id="ai-challenges-title">We <em>Understand</em> What’s Slowing You Down.</h2><p>We identify where the friction starts, then connect your systems and apply AI and automation where they can make a practical difference.</p></div>
      <div class="ai-challenge-list"><?php foreach ($challenges as $i => $item): ?><article class="ai-challenge"><span class="ai-challenge-icon" aria-hidden="true"><img src="<?= $asset('figma-challenge-' . $i . '.svg') ?>" alt="" width="28" height="32"></span><div><h3><?= htmlspecialchars($item[0]) ?></h3><p><?= htmlspecialchars($item[1]) ?></p></div><span class="ai-challenge-arrow" aria-hidden="true">↗</span></article><?php endforeach; ?></div>
    </div></section>
    <section class="ai-capabilities ai-section" id="capabilities" aria-labelledby="ai-capabilities-title"><div class="ai-container"><div class="ai-section-heading"><span class="ai-pill">What We Build</span><h2 id="ai-capabilities-title">Less Manual Work.<br><em>More Room</em> To Grow.</h2></div><div class="ai-capability-grid">
      <?php foreach ($capabilities as $item): ?><article class="ai-capability-card ai-capability-<?= $item[2] ?>"><div class="ai-capability-art" aria-hidden="true"><img src="<?= $asset('figma-card-' . $item[2] . '.svg') ?>" alt="" loading="lazy"></div><div class="ai-capability-copy"><h3><?= htmlspecialchars($item[0]) ?></h3><p><?= htmlspecialchars($item[1]) ?></p></div></article><?php endforeach; ?>
    </div></div></section>
    <section class="ai-process ai-section" id="process" aria-labelledby="ai-process-title"><div class="ai-container ai-process-grid"><div class="ai-process-intro"><span class="ai-pill">How We Build</span><h2 id="ai-process-title">From Business Need<br>To Working System.</h2><p>We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality, and measurable growth.</p></div><ol class="ai-step-list"><?php foreach ($steps as $i => $step): ?><li><span class="ai-step-number"><?= $i + 1 ?></span><div><h3><?= htmlspecialchars($step[0]) ?></h3><p><?= htmlspecialchars($step[1]) ?></p></div></li><?php endforeach; ?></ol></div></section>
    <section class="ai-case ai-section" id="case-study" aria-labelledby="ai-case-title"><div class="ai-container">
      <div class="ai-section-heading"><span class="ai-pill">Case Study</span><h2 id="ai-case-title">AI In Practice.</h2></div>
      <article class="ai-case-card"><div class="ai-case-details"><h3>A short description of the business and solution.</h3><div><h4>Challenge</h4><p>We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality, and measurable growth.</p></div><div><h4>We Build</h4><p>The system, automation or integration Cortexx delivered.</p></div><div><h4>Result</h4><p>A verified improvement, supported by a metric where available.</p></div><button class="ai-button ai-button-primary" type="button" disabled title="Full case study is not yet available">View Full Case Study <span aria-hidden="true">↗</span></button></div><div class="ai-case-image"><img src="<?= $asset('9c5e1a3bd48b3692c25de5269fa30599db26ef80.png') ?>" alt="Digital product interface from the case study" width="1024" height="768" loading="lazy"></div></article>
    </div></section>
    <?php $carousel = ['id' => 'ai-testimonials-title', 'heading' => 'Built With Clients.<br><em>Proven In Practice.</em>', 'section' => 'ai-testimonials ai-section']; require __DIR__ . '/../components/testimonial-carousel.php'; ?>
  </main>
</div>
<?php require __DIR__ . '/../components/footer.php'; ?>
<?php $content = ob_get_clean(); require __DIR__ . '/../layouts/main.php'; ?>
