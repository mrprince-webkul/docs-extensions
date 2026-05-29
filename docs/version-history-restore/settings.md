# Settings

The extension works out of the box with sensible defaults. The settings below are optional and let you adapt it to your deployment. They live in environment variables and in `config/history-preview-restore.php`.

## Restore modes

This setting controls **which versions** can be restored.

- **Any version (default).** Every version of a record is restorable. Restoring an older version re-applies its values and saves a new history entry, so nothing is ever lost.
- **One-step undo.** Only the **latest** version can be restored. Attempting to restore any earlier version is rejected. Useful if a deployment depends on the stricter, classic behaviour.

To switch to one-step undo, set this in your `.env` file:

```bash
HISTORY_PREVIEW_ANY_VERSION=false
```

You can also publish the config and set `'allow_restore_any_version' => false` in `config/history-preview-restore.php`.

## Storage disks

File previews are built from the values stored in history. Two settings control where those files are read from:

| Setting | Env variable | Default | Purpose |
|---|---|---|---|
| Primary disk | `HISTORY_PREVIEW_DISK` | `public` | The disk used to build URLs for file values. Change it if your media lives on S3, MinIO, etc. |
| Fallback disks | *(config only)* | `private`, `public` | If the primary disk doesn't hold a file, these disks are tried in order. |

The fallback list is why a single install can preview both DAM assets (stored on the `private` disk) and non-DAM media such as product images (stored on `public`) without any per-deployment configuration.

```bash
# Example: serve preview files from an S3 disk
HISTORY_PREVIEW_DISK=s3
```

## Preview tooling

Image and audio previews work with no extra software. Two optional system tools enable richer thumbnails:

| Tool | Enables |
|---|---|
| `ffmpeg` | Thumbnails generated from a video frame |
| `poppler-utils` (`pdftoppm`) | Thumbnails of a PDF's first page |

Thumbnails are generated on demand and cached on disk, so they're only built once per file.

## Recognised file extensions

The extension decides whether a value is a file by its extension. The default categories are:

| Category | Extensions |
|---|---|
| Image | jpg, jpeg, png, gif, webp, svg, bmp |
| Video | mp4, mov, webm, avi, mkv |
| Audio | mp3, wav, ogg, m4a, flac |
| Document | pdf, doc, docx, xls, xlsx, csv, ppt, pptx, txt |

You can add custom extensions to any category in the `extensions` section of the config file without modifying the extension's code.

## Advanced: per-model overrides

For developers integrating their own modules, the config file lets third-party models opt in without editing this package:

| Config key | Purpose |
|---|---|
| `file_fields` | Force a field to be treated as a file even when its value isn't a recognised file path (e.g. signed URLs or external IDs). |
| `ignored_fields` | Force a field to render as plain text instead of a thumbnail. |
| `extensions` | Add custom file extensions to a category. |
| `resolvers` | Register a custom preview resolver class for a model. |
| `restorers` | Register a custom restorer class for a model. |
| `edit_ability_map` | Map a model to the edit permission that should also enable its Restore action (see [Permissions & Access](./permissions)). |

Modules can also register support at runtime, so no edits to this package's config are required.

## Next steps

- [Permissions & Access](./permissions) — control who can view history and restore
- [Purging Old History](./purging-history) — keep audit tables tidy
