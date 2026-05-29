# Supplier Data Portal

The **Supplier Data Portal** is a Unopim extension that gives external suppliers their own dedicated portal to manage and submit product data for admin review. It keeps supplier activity completely isolated from the main Unopim admin panel.

## How it works

- Suppliers log in through a separate URL (`/supplier/login`) with their own session and authentication guard.
- They can create and manage products within the attribute family assigned to them by the admin.
- Every product submitted by a supplier goes through an **approval workflow** — an admin must approve or reject it before it enters the main catalog.
- Admins manage all of this from within the standard Unopim admin panel under the **Supplier** section.

## Key features

| Feature | Supplier | Admin |
|---|---|---|
| Dedicated login portal | ✓ | — |
| Product dashboard with status metrics | ✓ | — |
| Add / edit / delete products | ✓ | ✓ (review) |
| Import products via CSV / ZIP | ✓ | — |
| Export product data | ✓ | — |
| Approve / reject products | — | ✓ |
| Mass approve / reject | — | ✓ |
| Manage supplier accounts | — | ✓ |
| Real-time notifications | ✓ | — |
| Import/Export tracker | ✓ | ✓ |

## Requirements

- **Unopim** v2.0.0 or higher
- PHP 8.3+, Composer 2.5+, Node.js 20 LTS+

## In this guide

- [Installation](./installation)
- [Admin Guide](./admin-guide)
- [Supplier Guide](./supplier-guide)
