# Testing

The extension ships with Pest tests and a Playwright end-to-end suite.

## Pest tests

### Setup

1. In `tests/Pest.php` add:

```php
use Webkul\Admin\Tests\AdminTestCase;

uses(AdminTestCase::class)->in('../packages/Webkul/HistoryPreviewRestore/tests');
```

2. In `composer.json` under `autoload-dev.psr-4` add:

```json
"Webkul\\HistoryPreviewRestore\\Tests\\": "packages/Webkul/HistoryPreviewRestore/tests"
```

### Run

```bash
composer dump-autoload
./vendor/bin/pest packages/Webkul/HistoryPreviewRestore/tests/
```

## Playwright E2E

### Prerequisites

- UnoPim running at `http://localhost:8000` (matches the default `APP_URL` in `.env`)
- Admin credentials: `admin@example.com` / `admin123`

The Playwright config defaults to `http://localhost:8000`. If your install runs on a different host or port, export `BASE_URL` before running tests:

```bash
BASE_URL=http://127.0.0.1:8000 npx playwright test
```

### Setup

```bash
cd packages/Webkul/HistoryPreviewRestore/tests/e2e-pw
npm install
npx playwright install chromium
```

### Run

```bash
npx playwright test
```
