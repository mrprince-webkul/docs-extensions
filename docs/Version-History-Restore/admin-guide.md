# Admin Guide

Admins manage the Supplier Portal from within the standard Unopim admin panel. After installing the extension, a **Supplier** section appears in the admin sidebar.

## Managing Suppliers

Navigate to **Supplier → Suppliers** to view and manage all supplier accounts.

### Creating a supplier

1. Click **Create Supplier**.
2. Fill in the supplier's name, email, and password.
3. Assign an **Attribute Family** — this determines which product attributes the supplier can fill in.
4. Set the supplier's preferred locale and timezone.
5. Set the status to **Active** and save.

The supplier will receive their credentials and can log in at `/supplier/login`.

### Editing or deactivating a supplier

Open any supplier from the list and update their details. Setting the status to **Inactive** prevents the supplier from logging in without deleting their account or data.

### Deleting a supplier

Click the delete action on a supplier record. This removes the supplier account. Product data submitted by the supplier is not automatically removed.

---

## Reviewing Supplier Products

Navigate to **Supplier → Product Approvals** to see all products submitted by suppliers awaiting review.

### Approving a product

1. Click **Edit** on a pending product to review its details, images, and attributes.
2. If everything looks correct, click **Approve**. The product is added to the main Unopim catalog.

### Rejecting a product

1. Click **Edit** on a pending product.
2. Click **Reject** and provide a reason if needed. The supplier receives a notification about the rejection.

### Mass actions

Select multiple products from the list and use the **Mass Approve** or **Mass Delete** actions to process them in bulk.

---

## Import / Export Tracker

Navigate to **Supplier → Settings → Data Transfer** to monitor all supplier import and export jobs.

- **Tracker** — view the status of each job (pending, running, complete, failed), download logs, and download result archives.
- **Exports** — create and manage export configurations for supplier product data. Run exports manually and download the output file.
- **Imports** — create and manage import configurations. Validate a file before importing and track progress in real time.

Each job shows step-by-step progress so you can quickly identify where a failure occurred.
