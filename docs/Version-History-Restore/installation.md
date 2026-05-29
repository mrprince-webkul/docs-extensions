# Installation

## Requirements

- Unopim v2.0.0 or higher
- PHP 8.3+, Composer 2.5+, Node.js 20 LTS+

## Steps

### 1. Merge the extension files

Unzip the Supplier Data Portal package and copy the `packages/` folder into your Unopim project root, merging with any existing `packages/` directory.

### 2. Register the service provider

Open `bootstrap/providers.php` and add:

```php
use Webkul\Supplier\Providers\SupplierServiceProvider;

return [
    // ...existing providers...
    SupplierServiceProvider::class,
];
```

### 3. Update Composer autoload

In `composer.json`, add the namespace under `autoload.psr-4`:

```json
"autoload": {
    "psr-4": {
        "Webkul\\Supplier\\": "packages/Webkul/Supplier/src"
    }
}
```

### 4. Run the installer

```bash
composer dump-autoload
php artisan supplier:install
```

The install command runs all migrations and seeders needed by the extension.

### 5. Build front-end assets

If icons or UI elements are missing, build the supplier front-end assets:

```bash
cd packages/Webkul/Supplier
npm install
npm run build
```

### 6. Verify

- Open `http://your-domain.com/supplier/login` — you should see the supplier login page.
- Open the Unopim admin panel — a **Supplier** section should appear in the sidebar.
