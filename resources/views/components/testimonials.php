<?php
/**
 * Shared two-row testimonial carousel ("Trusted & Featured").
 * Behaviour lives in app.js (#testimonialCarousel, #tPrev, #tNext, #tToggle, .testi); include once per page.
 * Expects $b (base path). $testimonialsId optionally overrides the section id (homepage uses "about").
 */
$b = $b ?? ($base ?? '');
$testimonialImg = fn(string $f) => "$b/assets/images/figma/$f";
$testimonialsId = $testimonialsId ?? 'about';
?>
<section class="sec testi" id="<?= htmlspecialchars($testimonialsId) ?>">
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
            <article class="tcard-media"><img src="<?= $testimonialImg($item[0]) ?>" alt=""><div class="tmedia-overlay"><img class="tmedia-logo" src="<?= $b ?>/assets/images/brand-<?= $item[1] ?>.svg" alt="<?= htmlspecialchars($item[2]) ?>"><blockquote><?= htmlspecialchars($item[4]) ?></blockquote></div></article>
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
