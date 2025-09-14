DLQuick — Developer Specification (Business Edition)

General rules
- Language: British English across all UIs.
- Confidential data: Do not show fees/commissions/refund logic in customer UI. Only in Admin and Legal docs.
- Branding: Royal Blue (#0a1a4f) and Chrome Gold (#d4af37). Premium feel.
- Performance: Aim for <1s P95. Avoid heavy JS; stream server components where possible.

Web platform (customer)
- Homepage: category-based hero, double CTA (Get a Quote, Partner with DLQuick), featured categories grid.
- Services & Categories: cards with icon, short description, CTA (Book Now / Get a Quote). Categories: Deliveries, Groceries, Food, Marketplace, Removals, Trades, Auto, Pets, Events, Business Services.
- Search: text + voice, filters/tags (Vegan, Halal, Gluten-Free, Urgent, Tracked), paginated.
- Booking & Checkout: multi-basket; payment methods: Stripe, Apple Pay, Google Pay, Klarna, PayPal.
- Tracking: /track page with live driver GPS/ETA; driver vehicle + registration + branding; auto-call + SMS fallback.
- Legal: Privacy (GDPR UK), Terms (refund inside), Cookie Policy, Legal Pack (PDF download).

Admin & staff (internal)
- Live map for active drivers/orders.
- Earnings dashboard: revenue split (commissions, fees, payouts).
- Refund/returns: admin-only.
- POS integrations (EPOS Now, Square, Shopify, Lightspeed, Clover).
- Incident reports: escalations visible in Admin.
- Roles: Staff, Store Manager, Franchise, Super Admin.

Apps (mobile)
- Customer: tabs (Home, Search, Basket, Track, Profile), features (multi-checkout, live tracking, notifications, reviews, buyer protection, invoices download).
- Driver: dark mode, earnings + instant payout, QR job flow (pickup+deliver), SOS.
- Store: orders board, POS sync, returns gating, basic analytics.
- Admin: HQ theme, live map, tickets, earnings, fraud checks, AI monitoring.

Branding
- Logo: Wings + Stopwatch.
- Colours: Deep Royal Blue (#0a1a4f), Chrome/Matte Gold (#d4af37).
- Buttons: rounded, soft shadows, hover glow.
- Typography: Inter / Poppins / Montserrat.

Acceptance criteria
- No Romanian text.
- Refund logic not visible in customer UI.
- All service pages have CTAs with clear English copy.
- POS sync + QR labels functional.
- Tracking shows live driver info + auto-call logic.
- Search supports filters & tags.
- Mobile apps mirror web logic per role.
- Branding consistent across platforms.

Implementation notes
- Keep customer UI static-friendly where possible; hydrate only interactions.
- Gate admin via NextAuth; expose sensitive data only behind ADMIN roles.
- Notifications (email/Slack) for escalations and operational events.
