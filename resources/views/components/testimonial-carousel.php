<?php
/**
 * Three-card testimonial carousel (AI & Automation pattern), driven by public/assets/js/testimonial-carousel.js.
 * Inputs: $b (base path), $carousel = [
 *   'id' => heading id, 'heading' => trusted heading HTML, 'section' => section classes,
 *   'container' => container class, 'pill' => pill class ].
 */
$carousel += ['id' => 'testimonials-title', 'section' => 'ai-testimonials', 'container' => 'ai-container', 'pill' => 'ai-pill'];
$carouselItems = [
    ['vortex', 'Vortex', '5c3ed82dabd37cbe156322c8c9b2a0bc9ce4460e.png', '“Cortexx made our product simple andintuitive”', 'Alex Carter', 'Product Lead, Vortextt'],
    ['velocity', 'Velocity', '1e37881e785c2acf3a1882b6dad6518d55813fa4.png', '“Thoughtful design and clear communication”', 'Carlos Rivera', 'Design Director, Velocity'],
    ['synergy', 'Synergy', '1e37881e785c2acf3a1882b6dad6518d55813fa4.png', '“A reliable partner from concept to lanuch”', 'Jordan MItchell Rivera', 'Founder, Synergy'],
];
?>
    <section class="<?= $carousel['section'] ?>" aria-labelledby="<?= $carousel['id'] ?>" data-testimonial-carousel><div class="<?= $carousel['container'] ?>"><div class="ai-testimonials-head"><div><span class="<?= $carousel['pill'] ?>">Trusted &amp; Featured</span><h2 id="<?= $carousel['id'] ?>"><?= $carousel['heading'] ?></h2></div><div class="ai-testimonial-controls"><button type="button" data-testimonial-prev aria-label="Previous testimonials">←</button><button type="button" data-testimonial-next aria-label="Next testimonials">→</button></div></div>
      <div class="ai-testimonial-track" tabindex="0" aria-label="Client testimonials"><?php foreach ($carouselItems as $item): ?><article><header><img class="ai-testimonial-avatar" src="<?= $b ?>/assets/images/figma/<?= $item[2] ?>" alt="" loading="lazy"><img class="ai-testimonial-brand" src="<?= $b ?>/assets/images/brand-<?= $item[0] ?>.svg" alt="<?= htmlspecialchars($item[1]) ?>" loading="lazy"></header><div class="ai-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote><?= htmlspecialchars($item[3]) ?></blockquote><footer><strong><?= htmlspecialchars($item[4]) ?></strong><span><?= htmlspecialchars($item[5]) ?></span></footer></article><?php endforeach; ?></div><span class="ai-testimonial-status" aria-live="polite"></span>
      <div class="ai-recognition"><h3>Featured and recognized:</h3><div><?php foreach (['oyo','fedex','amazon','ola','microsoft','walmart'] as $brand): ?><div class="ai-recognition-tile"><img src="<?= $b ?>/assets/images/recognition-<?= $brand ?>.svg" alt="<?= ucfirst($brand) ?>" loading="lazy"></div><?php endforeach; ?></div></div>
    </div></section>
