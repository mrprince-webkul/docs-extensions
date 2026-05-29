# Purging Old History

The `history-preview-restore:purge` command deletes old history versions. **The latest version of every entity is always kept**, so it is safe to run unattended (for example from cron).

## Command

```bash
php artisan history-preview-restore:purge --days=90
```

The command first counts how many rows are older than the cutoff, then asks you to confirm before deleting:

```
Purging history rows older than 2026-02-28 12:00:00 (batch=500)
About to delete 1234 audit row(s). Proceed? (yes/no) [no]:
> yes
Deleted 1234/1234...
Done. Deleted 1234 row(s). Latest version per entity preserved.
```

If nothing is old enough to delete, it prints `Nothing to purge.` and exits.

## Options

| Option | Default | Description |
|---|---|---|
| `--days` | `90` | Purge versions older than N days. Must be a positive integer. |
| `--entity` | *(all)* | Limit to one entity tag (e.g. `product`, `asset`, `attribute`). |
| `--batch` | `500` | Number of rows per delete batch. |
| `--dry-run` | off | Report what would be deleted without touching the database. |
| `--force` | off | Skip the confirmation prompt (use in cron). |

## Examples

```bash
# Purge versions older than 90 days
php artisan history-preview-restore:purge --days=90

# Limit the purge to one entity tag
php artisan history-preview-restore:purge --days=180 --entity=product

# Preview what would be deleted, without touching the database
php artisan history-preview-restore:purge --days=30 --dry-run

# Unattended run for cron (skips the confirmation prompt)
php artisan history-preview-restore:purge --days=60 --batch=1000 --force
```

With `--dry-run`, the output reports the count and confirms nothing was changed:

```
Purging history rows older than 2026-04-29 12:00:00 (batch=500, DRY-RUN)
Would delete 1234 row(s). (no rows touched)
```

## Scheduling

To run the purge automatically, add it to the Laravel scheduler with `--force` so it doesn't wait for the confirmation prompt:

```php
$schedule->command('history-preview-restore:purge --days=90 --force')
    ->dailyAt('02:00');
```
