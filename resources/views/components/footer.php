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
            <li><a href="<?= $footerHomePrefix ?? '' ?>#about">About Us</a></li>
            <li><a href="<?= $footerHomePrefix ?? '' ?>#work">Work</a></li>
            <li><a href="<?= $footerHomePrefix ?? '' ?>#capabilities">Capabilities</a></li>
            <li><a href="<?= $footerHomePrefix ?? '' ?>#case-studies">Case Studies</a></li>
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
