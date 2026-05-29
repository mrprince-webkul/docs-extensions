# Troubleshooting & FAQ

## Troubleshooting

### The Restore action doesn't appear

- The user's role is missing the required permission. Grant **Restore History**, or the edit permission for the record type — see [Permissions & Access](./permissions).
- The deployment is running in **one-step undo** mode, where only the latest version is restorable. Check the `HISTORY_PREVIEW_ANY_VERSION` setting — see [Settings → Restore modes](./settings#restore-modes).

### The History tab is empty

The History tab only shows once a record has been saved at least once. A brand-new record with no edits has no history yet.

### Thumbnails aren't generated for PDFs or videos

Install the optional system tools:

- `ffmpeg` for video frame thumbnails
- `poppler-utils` (`pdftoppm`) for PDF page thumbnails

Image and audio previews don't need these. Without them, the files still appear and can be downloaded — only the generated thumbnail is missing.

### “File is not available on disk anymore”

The underlying file was deleted from storage, so it can't be previewed. The version's other values can still be restored.

### A preview shows the wrong disk or a broken image

Check the storage settings. The primary disk is set by `HISTORY_PREVIEW_DISK`, with `private` and `public` tried as fallbacks. See [Settings → Storage disks](./settings#storage-disks).

### “Restore failed. Please try again.”

This appears when a restore couldn't be completed. Re-open the record and try again; if it persists, check the application logs and confirm the record (and any related data) still exists.

### Changes appeared in the menu/cache but not in the UI

After installing or changing config, clear the cache:

```bash
php artisan optimize:clear
```

## FAQ

### Does restoring delete my current data?

No. Restoring re-applies an older version's values and saves them as a *new* version. Your current state is preserved in history and can be restored again at any time.

### Can I restore a record that was deleted?

Yes. If a record was soft-deleted, restoring an earlier version automatically un-deletes it first, then re-applies the old values.

### Will restoring a translation also affect other fields?

A restore reverts everything that changed in that version together — parent fields, translations, and related pivot data — in one transaction. It won't touch fields that weren't part of that version.

### Does this extension change the Unopim core?

No. It works through Unopim's existing History trait and audit table, adding a single `metadata` column. No core files are edited.

### Is DAM required?

No. DAM is optional. It's only needed for DAM asset thumbnails and the asset re-upload file-preservation behaviour. Everything else works without it.

### Will purging old history stop me from restoring?

No. The purge command always keeps the most recent version of every record, so restore stays possible. See [Purging Old History](./purging-history).

### Who can see who restored a version?

Every restore records who performed it, when, and from which version, and shows a **“Restored from version N”** badge on the version detail. See [Restoring a Version → Restore lineage](./restoring-versions#restore-lineage).
