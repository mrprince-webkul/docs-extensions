# Submitting to ChatGPT

Once your feed builds successfully, you need to get it to OpenAI.

> [!IMPORTANT]
> **Availability.** ChatGPT shopping is currently live for **United States** shoppers only, and OpenAI treats a standard feed as targeting `US` whatever you enter in [Target Countries](./geography.md). Other markets, India included, need OpenAI to confirm them for your integration first. A merchant based outside the US can still apply if they sell and ship to US customers.

---

## Before you start: get approved by OpenAI

Product feed onboarding is limited to approved merchants. Apply with the form at [chatgpt.com/merchants](https://chatgpt.com/merchants). Approval is not automatic. Once you are accepted, OpenAI gives you the SFTP details your feed is uploaded to.

---

## Delivery methods

| Method | How it works | Use it when |
|---|---|---|
| **SFTP upload** (recommended) | UnoPim pushes every new feed to OpenAI's SFTP server. | Always. This is the file-upload method OpenAI documents for merchants. |
| **Feed URL** | Anyone holding the token downloads the last built feed from your UnoPim server. | You want to inspect the file, or OpenAI specifically asks you for a URL. |

---

## Option A: Upload over SFTP

Enter the SFTP credentials OpenAI gave you and UnoPim uploads every new feed for you. Follow [SFTP Delivery](./sftp-delivery.md). Use **JSONL** or **TSV** with gzip enabled.

OpenAI recommends sending a full snapshot **at least once a day**, overwriting the same file each time. The built-in schedule does this for you as long as the [scheduler and queue worker are running](./schedule-performance.md).

---

## Option B: Share the feed URL

> [!NOTE]
> OpenAI's merchant documentation describes SFTP upload and its Feeds API, not fetching a feed from a URL. Only use this option for ChatGPT if OpenAI asks you for a URL during onboarding.

1. Make sure a **Feed Security Token** is set ([Configuration › General](./general-settings.md)).
2. Copy the URL from the dashboard's **Public Feed URL** box with **Copy URL**, or print it in a terminal:

   ```bash
   php artisan openai-feed:generate --show-url
   ```

   It looks like this:

   ```
   https://pim.example.com/openai-feed/products?token=3f9c2a7e5b8d41c6a0e9f7b2d5c8a1e4b7f0c3d6a9e2b5c8
   ```

3. Give the URL to OpenAI only if they asked for it during onboarding.
4. OpenAI fetches and indexes the feed. The first indexing can take a while.

What OpenAI (or anyone) gets back from the URL:

| Situation | Response |
|---|---|
| Correct token, feed built | **200 OK**: the feed file, with `Last-Modified` and a one-hour `Cache-Control` header. |
| Token missing or wrong | **403 Forbidden**: *"Invalid feed token."* |
| Feed disabled, or not configured | **404 Not Found** |
| Feed enabled but never generated yet | **503 Service Unavailable**: *"The feed is not available yet."* Generate it once. |

The URL is rate-limited to 120 requests per minute per IP address. Opening the URL never triggers a generation; it only serves the last file that was built.

> [!WARNING]
> Anyone who has the full URL, token included, can download your feed. Share it only with OpenAI. If it leaks, click **Generate Token**, save, and update the URL in the OpenAI merchant portal.


---

## Checking the feed status

A small JSON endpoint reports whether the feed is ready, which is handy for uptime monitoring:

```
GET /openai-feed/status?token=<your-token>
```

```json
{
  "status": "ok",
  "exists": true,
  "last_updated": "2026-10-27 07:08:44",
  "size": "54.12 KB",
  "feed_url": "https://pim.example.com/openai-feed/products",
  "enabled": true,
  "channel": "default",
  "locale": "en_US",
  "format": "tsv"
}
```

When a token is set, this endpoint needs the token too (otherwise **403**). The `feed_url` it returns **never** contains the token.

---

## Instant Checkout

The feed makes your products **discoverable** in ChatGPT, with links back to your store. Buying inside ChatGPT is a separate integration that OpenAI must enable for you. The `enable_checkout` flag only takes effect once it is enabled, and only when `enable_search` is also on and the seller privacy policy and terms of service URLs are filled in. See [Commerce Flags](./commerce-flags.md).

---

## What's inside the feed

See [Feed Fields Reference](./feed-fields.md) for every column and where its value comes from.
