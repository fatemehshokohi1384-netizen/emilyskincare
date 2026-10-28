# Emily Skincare — Landing Page Development Brief (Draft / Editable)

## Goal
Build an initial, editable, production-quality Persian RTL landing page for **Emily Skincare** at **emiliskincare.ir**. This is a DRAFT: the owner must be able to review and request changes. Do not publish or deploy without explicit approval. Prioritize a working local preview and mobile responsiveness.

## Visual style
Modern, distinctive, elegant, minimal skincare design; white, very light lavender and soft pink, subtle gradients and generous whitespace. Avoid dark/heavy purple, clutter, cartoonish emoji, or giant decorative elements. Use SVG icons and semantic, accessible HTML. Persian RTL typography with excellent mobile layout. The mockup images are design references, NOT assets to use as flattened page sections.

## Sections in order
1. **Hero**: hamburger navigation on mobile; headline exactly «با امیلی، پوستت رو خاص‌تر کن!» and subtitle exactly «اینجا هر پوست، مراقبت خاص خودش رو داره.»; primary CTA «رزرو نوبت». Use a real supplied Emily image if available; do not fabricate or alter her identity. A subtle small Emily SKINCARE wall logo is a design reference, not mandatory in code.
2. **Services**: five minimal cards with elegant custom SVG icons: اسیدتراپی، آبرسانی، درمان جوش و آکنه، الگاپیل، مزونیدلینگ. Each has a clickable details modal/accordion with headings «آشنایی با این روش»، «مراقبت‌های بعد از انجام»، «نکات مهم قبل از رزرو» and CTA. Avoid inventing medical outcomes or unsupported treatment claims; use editable placeholder copy until approved.
3. **About Emily — «من کی‌ام؟»**: chosen genuine portrait of Emily in purple work uniform seated beside framed certificates, rectangular rounded photo on the RIGHT on desktop, above copy on mobile. Badge «+۵۰۰ مراجعه‌کننده» on photo. Text on LEFT: «سلام، من امیلی‌ام! ♡ از سال ۱۳۹۹ وارد دنیای مراقبت از پوست شدم. توی این مسیر آموزش‌های تخصصی دیدم و مدارک مرتبط با حوزه پوست رو گرفتم. همیشه برام مهم بوده که هر پوست با توجه به نیازهای خودش، مراقبت مناسب و ویژه‌ای دریافت کنه.» Add clickable «بیشتر درباره من» accordion to expand additional biography. Do not show four permanent cards below this section. Keep wording editable and avoid inventing exact certificates.
4. **Before/After gallery**: 3 genuine before-and-after examples. Prefer interactive draggable comparison slider using separately cropped original photos. Original screenshots have Instagram text/emoji/chrome; crop those away without changing skin texture or treatment outcomes. Do NOT use AI-generated before/after images as genuine results. If source pairs are not ready, display clearly labeled placeholders, not fabricated results. Require permission to publish identifiable client images. Optional «مشاهده نمونه‌کارهای بیشتر» CTA.
5. **Testimonials — «از زبان شما»**: 3 elegant white/lavender text cards with genuine client feedback transcribed from screenshots, no colorful emojis. Keep original meaning and obtain approval for edits. On mobile use a horizontally swipeable carousel. Do not invent testimonials or ratings. Hide identifying customer details unless consented. Optional «مشاهده پیام اصلی» with privacy-safe screenshot.
6. **Booking CTA**: prominent «رزرو نوبت» button. The full booking/payments backend is a future phase. Until functional, link the button to a REAL available contact channel (e.g. Instagram) with accurate wording such as «هماهنگی نوبت», and do not pretend bookings/payments work.
7. **Contact & footer**: Instagram **@skincere.emili**, link **https://www.instagram.com/skincere.emili/**; telephone **09904489200**, clickable `tel:09904489200`; address **استان کرمان، شهرستان فاریاب**. Provide a Google Maps search link for Faryab, Kerman (not a fabricated exact clinic pin). Footer Emily Skincare and simple quick links. Cards and links must be real HTML, not images.

## Explicitly excluded from this landing MVP
Do NOT build a management dashboard, real payment gateway, deposit booking engine, customer portal, loyalty/referral program, or a «چرا امیلی؟» section now. Those are later phases. Preserve extensibility.

## Later-phase requirements (record only, do not implement now)
- Direct booking with 200,000 toman deposit; auto-confirm only after verified payment.
- Every service initially 60 minutes. Hours Saturday–Thursday 09:00–12:00 and 16:00–20:00; Friday closed. Admin can adjust schedule and block days.
- Cancel 24h+ before appointment: deposit refundable; later: not refundable, subject to published policy and applicable rules.
- Customer portal: next appointment, completed visit count, history, payments; admin dashboard: appointments, services, daily/weekly revenue and progress charts.
- Settlement links payments to actual customer and appointment; online payments require verified gateway callback; offline payments require Emily confirmation.
- Referral: inviter earns 100,000 toman credit per successful completed referral; max 100,000 toman redeemed per visit; every 10 successful referrals earns an additional free facial (10,20,30...). Keep referral and free facial rewards separate. Loyalty gift after 5 completed visits, exact reward TBD.

## Engineering & delivery
- Inspect the existing project first; do not delete existing files without permission.
- Choose a simple maintainable stack appropriate to what exists; if starting from scratch, a fast lightweight static landing is acceptable.
- Organize components/sections so copy, images, layout and colors can be edited independently.
- Use real local image assets provided by the owner. If absent, use explicit placeholders and document required filenames.
- RTL, mobile-first, semantic HTML, keyboard-accessible controls, proper focus styles, image alt text, lazy loading, reasonable image optimization, SEO title/description, and no dead buttons.
- Test locally, explain the exact run command and preview URL, then ask for design review. Do not deploy to production without permission.

## Workflow
1. Implement an editable FIRST DRAFT.
2. Run locally and provide preview instructions.
3. Wait for feedback and iterate section-by-section.
4. Only after approval, help deploy to emiliskincare.ir with HTTPS and verified DNS/server access.
