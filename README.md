# AURELIA Health Clinic — premium website prototype

A responsive, art-directed static website for the fictional AURELIA Health Clinic.

## Run
Open `index.html` in a browser, or serve the folder with any static server. No build step is required.

## Architecture
- `index.html` — semantic page structure and content regions
- `css/styles.css` — design system, responsive layout, motion and accessibility rules
- `js/app.js` — content data, service interaction, doctor rendering, testimonials and mock booking drawer
- `assets/` — favicon and social preview artwork

Clinic content is kept as data arrays in `js/app.js`, so another clinic can be substituted without rebuilding the presentation layer.

## Production handoff
The image URLs currently point to Unsplash for prototype presentation. For a paid production deployment, replace them with licensed clinic-specific photography/video and self-host/optimize the assets (AVIF/WebP, responsive `srcset`, CDN caching).

The booking form is intentionally mock-only. The submit handler is isolated in `js/app.js` and can be replaced with a CRM/API call without changing the UI.
