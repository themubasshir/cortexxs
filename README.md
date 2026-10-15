# Cortexx

Landing page built on **Slim 4** with vanilla PHP templates. Design decoded from Figma — see `docs/design-audit.md`.

## Architecture

```
cortexx/
├── app/
│   ├── Controllers/
│   │   ├── PageController.php         # GET / — renders home page
│   │   └── NewsletterController.php   # POST /api/newsletter — CSRF, honeypot, rate-limit, SMTP via PHPMailer
│   └── Middleware/
│       └── CsrfTokenMiddleware.php    # Stateless per-IP daily HMAC CSRF token
├── bootstrap/app.php                  # App factory, base-path autodetect
├── config/config.php                  # Native .env parser + config array (no phpdotenv dep)
├── routes/web.php                     # Route definitions
├── resources/views/
│   ├── layouts/main.php               # Page shell
│   └── pages/home.php                 # Home sections
├── public/                            # Web root
│   ├── index.php                      # Entry point
│   ├── .htaccess                      # Apache rewrite + caching headers
│   └── assets/{css,js,images}/        # Frontend assets; Figma exports under images/figma/
├── storage/logs/                      # Runtime: subscribers.csv, rate-limit, mail log (gitignored)
├── tests/selfcheck.php                # Standalone smoke checks
├── docs/                              # Design audit + deployment notes + QA screenshots
├── .htaccess                          # Root rewrite → public/ + blocks private dirs
├── index.php                          # Fallback entry for no-rewrite servers
└── deploy-package.ps1                 # Builds Hostinger package (private app/ + public_html/)
```

**Request flow:** `.htaccess` → `public/index.php` → `bootstrap/app.php` → Slim router → controller → PHP view.

**Newsletter pipeline:** CSRF token (HMAC-IP+day) → honeypot field → rate limit → PHPMailer SMTP → append `storage/logs/subscribers.csv`.

## Requirements

- PHP ≥ 8.1
- Apache with `mod_rewrite` (XAMPP works out of the box)
- Composer

## Local setup (XAMPP)

```bash
# Clone into htdocs
cd C:\xampp\htdocs
git clone https://github.com/themubasshir/cortexxs.git cortexx
cd cortexx

# Install dependencies
composer install

# Configure environment
copy .env.example .env
# Edit .env — set MAIL_* / SMTP_* + CSRF_SECRET if testing the newsletter form.
# Generate CSRF_SECRET:  php -r "echo bin2hex(random_bytes(32));"
```

Open `http://localhost/cortexx/` — root `.htaccess` routes into `public/` automatically.

## Environment configuration

All config lives in `.env` (never committed). Two templates provided:

| File | Purpose |
|---|---|
| `.env.example` | Local dev template — `MAIL_*` naming |
| `.env.production.example` | Production template — `SMTP_*` naming (Hostinger convention) |

Both `MAIL_*` and `SMTP_*` are accepted; `SMTP_*` takes precedence when `MAIL_*` is unset.

```env
APP_ENV=local|production
APP_URL=http://localhost/cortexx
APP_BASE_PATH=           # empty = autodetect; set explicitly if routing breaks
MAIL_HOST / SMTP_HOST
MAIL_PORT / SMTP_PORT    # 587
MAIL_USERNAME / SMTP_USERNAME
MAIL_PASSWORD / SMTP_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS / MAIL_FROM
MAIL_FROM_NAME="Cortexx"
CONTACT_RECIPIENT / MAIL_TO
CSRF_SECRET=             # 64-char hex
```

## Tests

```bash
php tests/selfcheck.php
```

11 checks covering: routes, page content, CSRF token presence, form rendering, `.env` blocked from web access. Requires the site running at `http://localhost/cortexx/` (Apache must be up).

## Deployment (Hostinger)

```powershell
.\deploy-package.ps1
```

Builds `cortexx-deploy/` under `%TEMP%` with:

- `cortexx-app/` — private app code + production `vendor/` (installed from `composer.lock`, `--no-dev`)
- `public_html/` — `index.php` reaching one level up into `cortexx-app/`, plus `assets/` and hardened `.htaccess`

Upload both to Hostinger, place `cortexx-app/` outside `public_html/`, create `.env` from `.env.production.example`. Full guide: `docs/DEPLOYMENT.md`.
