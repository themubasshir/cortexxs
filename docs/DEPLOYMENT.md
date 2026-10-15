# Deployment — Hostinger shared hosting (hPanel)

Two-tree layout: private app outside `public_html`, thin public root.

```
/home/uXXXXXXXX/domains/yourdomain.com/
├── cortexx-app/            # PRIVATE — never web-accessible
│   ├── app/  bootstrap/  config/  resources/  routes/
│   ├── storage/logs/       # subscribers.csv + rate-limit (writable)
│   ├── vendor/             # production autoloader from composer.lock
│   ├── composer.json  composer.lock
│   └── .env                # production secrets (create on server)
└── public_html/            # web root
    ├── index.php           # requires ../cortexx-app/bootstrap/app.php
    ├── .htaccess           # front controller + compression + expires + dotfile deny
    └── assets/             # css, js, images (incl. brand-*.svg, figma/)
```

If host forces everything under `public_html`, upload `cortexx-app` anyway and
add to `public_html/.htaccess` line 2: `RewriteRule ^cortexx-app/ - [F,L]`.
Prefer a sibling/subdomain docroot when available.

## Requirements
- PHP ≥ 8.1 (select 8.2 in hPanel → PHP Configuration). Extensions: openssl, mbstring, json (all default).
- Apache/LiteSpeed mod_rewrite — default on Hostinger.
- No Composer, Node, DB, or cron needed on server. Newsletter → CSV.
- Vendor ships inside package; or rebuild: `composer install --no-dev -o` (never `update`).

## Package
Built by `deploy-package.ps1` → `…/marsai/cortexx-deploy/{cortexx-app,public_html}` (≈45 MB, mostly Figma images).
Excluded: `.env`, `tests/`, `docs/`, `node_modules`, QA screenshots, dev logs, storage artifacts.

## Upload (File Manager or SFTP)
1. hPanel → Files → create `cortexx-app` next to `public_html`. Upload app tree.
2. Upload `public_html` contents over existing root — **back up current site first**
   (hPanel → Files → Backup, or zip `public_html` before replacing).
3. Create `cortexx-app/.env` from `.env.production.example`; fill SMTP + `CSRF_SECRET`.
   Generate secret locally: `php -r "echo bin2hex(random_bytes(32));"`
4. Permissions: dirs 755, files 644, `storage/logs` 775 (or 755; PHP-FPM runs as user on Hostinger).
5. If app dir placed elsewhere: set env `CORTEXX_APP_DIR=/abs/path/to/cortexx-app`
   or edit `public_html/index.php` `$appDir`.

## Env checklist
`APP_ENV=production` `APP_DEBUG=false` `APP_URL=https://domain` `APP_BASE_PATH=` (empty = root)
`SMTP_HOST=smtp.hostinger.com` `SMTP_PORT=587` `SMTP_USERNAME` `SMTP_PASSWORD` `SMTP_ENCRYPTION=tls`
`MAIL_FROM` `MAIL_TO` `CSRF_SECRET` (64-hex)
`MAIL_*` legacy names also work; `SMTP_*` aliases read automatically.

## Post-deploy verify
- `https://domain/` → 200; `/robots.txt` `/sitemap.xml` → 200.
- Assets 200: `/assets/css/app.css`, `/assets/images/brand-lumina.svg`.
- Newsletter: POST `/api/newsletter` → JSON (CSRF required; submit via site form).
- Private paths → 403/404: `/cortexx-app/`, `/.env`, `/composer.json`, `/storage/`.
- Enable HTTPS first (hPanel → SSL, free Let's Encrypt) — site uses Google Fonts CDN,
  mixed-content risk only if fonts load over http.
- PHP errors: hPanel → PHP → `display_errors Off`, `log_errors On` → `error_log`.

## Rollback
Keep the pre-upload `public_html` zip. Restore via File Manager; app tree is additive
(new dir) so old site untouched until `public_html` is replaced.

## Known limits
- SMTP delivery untested locally — first real send needs valid `SMTP_*` creds.
- File-based rate limit (3/hr/IP) + CSV store; no DB. Fine at landing-page volume.
- CSRF token is IP+day HMAC, no session cookie; secure-attrs N/A.
- `tests/selfcheck.php` targets `localhost` — dev only, not shipped.
