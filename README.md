# Auric Ventures — Luxury CIF Gold Website

Modern, trust-driven website for Auric Ventures, a Nairobi-based company specializing in CIF deliveries of verified gold doré bars.

## Tech
- HTML + Tailwind (CDN) for rapid, responsive layout
- Custom CSS for gold theme and animations (`assets/css/styles.css`)
- Minimal vanilla JS for interactions (`assets/js/main.js`)

## Structure
- `index.html` — Single-page layout: Home, About, Process, Why, Contact
- `assets/css/styles.css` — Theme (charcoal, gold), fine borders, reveal animations
- `assets/js/main.js` — Reveal on scroll, smooth anchor scroll, form UX

## Run locally
Just open `index.html` in a browser. For file URLs blocking fonts on some setups, serve a local HTTP server:

```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Imagery suggestions (royalty-free)
Replace placeholders in `assets/images/` with curated images. Suggested sources:

- Gold doré bars / macro textures:
  - Unsplash — search: "gold bars", "gold texture" (`https://unsplash.com/s/photos/gold-bars`)
  - Pexels — search: "gold" (`https://www.pexels.com/search/gold/`)
- Secure vaults / logistics:
  - Unsplash — search: "vault", "security" (`https://unsplash.com/s/photos/vault`)
  - Pexels — search: "private jet" (`https://www.pexels.com/search/private%20jet/`)
- Nairobi skyline at dusk:
  - Unsplash — search: "Nairobi skyline" (`https://unsplash.com/s/photos/nairobi`)

Recommended placements:
- `assets/images/hero-gold.jpg` — Hero background (gold bars or private jet detail)
- `assets/images/nairobi-dusk.jpg` — About card background

Credit photographers per source license if required by the selected image.

## Branding notes
- Headings: Playfair Display; Body: Montserrat
- Colors: Charcoal `#0b0b0c`, Gold `#d4af37`, accents in Ivory/Platinum
- Tone: Refined, discreet, confident. Short, purposeful sentences.

## Customization
- Update email and WhatsApp link in Contact section (`index.html`).
- Swap OG image at `/assets/og.jpg` and favicon at `/assets/favicon.svg`.
- Consider self-hosting fonts and Tailwind for production hardening.

## CTA
Contact Auric Ventures to explore verified gold supply and bespoke CIF partnerships.