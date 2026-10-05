# ANILyfe V1 Post-MVP

1. Native backend wishlist model and persistent cross-device wishlist.
2. Full returns/refunds API and admin return queue.
3. Multi-seller checkout splitting into independent seller orders in one payment flow.
4. Paystack webhook/idempotency hardening and production payment reconciliation.
5. Atomic inventory reservation/release improvements under high concurrency.
6. Immutable seller earnings/payout ledger and production payout provider integration.
7. Production object storage/CDN for product and KYC documents.
8. Transactional email delivery and configurable admin notifications.
9. Two-factor authentication and multi-device session management.
10. Compiled Tailwind production pipeline once dependency installation is available.
11. Full Playwright/Cypress E2E suite across Android, tablet and desktop viewports.
12. Advanced analytics and downloadable server-generated reports.

## CSS migration (next pass)
- Move `.btn`, `.card`, `.inp`, `.badge`, `.chip`, `.glass*` from `css/style.css` into Tailwind `@layer components`, then delete the legacy files.
- Replace the inline Tailwind runtime with the compiled `css/tailwind.css`.
- Browser E2E on real phones and a visual check of every screen.
