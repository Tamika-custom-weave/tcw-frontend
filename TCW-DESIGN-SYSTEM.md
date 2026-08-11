# Tamika Custom Weave — Design System

> Premium luxury hair commerce website inspired by Swiss editorial/catalog design, combining strict minimalist structure with a sophisticated black, white, and gold identity.

## Theme

Light only.

The website should feel premium, sophisticated, feminine, clean, and fashion-forward while maintaining a strong editorial/catalog structure.

The primary visual foundation is **black and white**, with **luxury gold used as the single brand accent**.

Gold should be used selectively for branding, important highlights, active states, subtle accents, and premium details. Do not turn the website into a gold-colored interface.

The overall design should feel like a high-end luxury hair/fashion catalog rather than a typical beauty store.

---

# Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Obsidian Black | `#000000` | `--color-obsidian-black` | Primary text, borders, buttons, icons, strong UI elements |
| Pure White | `#FFFFFF` | `--color-pure-white` | Main page background, product surfaces, image backgrounds |
| Champagne Gold | `#C9A227` | `--color-champagne-gold` | Primary TCW brand accent, highlights, active states, premium details |
| Soft Gold | `#E6D3A3` | `--color-soft-gold` | Very subtle secondary gold accents |
| Concrete Gray | `#CACACA` | `--color-concrete-gray` | Borders, dividers, product grid structure |
| Mist Gray | `#F1F1F1` | `--color-mist-gray` | Subtle surfaces and inactive states |
| Iron Gray | `#404040` | `--color-iron-gray` | Secondary text and heavier structural elements |
| Ash Gray | `#616161` | `--color-ash-gray` | Muted text and helper information |

### Color Rules

- Black and white should remain the dominant colors.
- Gold is the only chromatic brand accent.
- Never use multiple accent colors.
- Do not use gold as the main page background.
- Do not use gradients unless specifically required.
- Avoid excessive gold borders and gold-filled components.
- Gold should communicate luxury, importance, selection, or brand identity.
- Product photography should remain the visual focus.

---

# Typography

Keep the same typography system as the Freitag reference.

### Primary Font

`AkkStdRg (Akkurat Standard)`

Use it throughout the website.

- Weight: 400
- Display: 48px
- Heading: 32px
- Subheading: 24px
- Body: 16px
- Small labels: 11px
- Tight display line-height
- Uppercase labels
- Letter spacing on small labels

Do not introduce decorative fonts, serif fonts, or script fonts.

The typography should remain clean, compressed, editorial, and sophisticated.

---

# Type Scale

| Role | Size | Line Height | Letter Spacing |
|---|---:|---:|---:|
| Label | 11px | 1.15 | 0.44px |
| Body | 16px | 1.5 | 0.32px |
| Subheading | 24px | 1.28 | normal |
| Heading | 32px | 0.97 | -0.16px |
| Display | 48px | 0.97 | -0.48px |

Use uppercase typography for navigation, labels, categories, and important product metadata.

---

# Spacing

Base unit: 4px.

Use the existing Freitag spacing scale:

4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 48px.

Section spacing should generally remain between 64px and 80px.

Product/card padding: 12px.

Element gap: 12px.

---

# Border Radius

Keep the same shape language:

- Buttons: `9999px`
- Badges: `9999px`
- Images: `12px`
- Navigation elements: `16px`
- Small inline elements: `4px`

Buttons should remain pill-shaped.

---

# Shadows

Keep shadows extremely subtle.

### Primary Shadow

`rgba(0, 0, 0, 0.12) 2px 2px 10px 0px`

### Small Shadow

`rgba(45, 45, 45, 0.5) 2px 2px 5px 0px`

Avoid heavy shadows and floating-card aesthetics.

---

# Layout

Maximum page width: `1440px`

Use a strict editorial/catalog grid.

The design should feel structured, spacious, and intentional.

Use:

- Full-width hero sections
- Modular category sections
- Product grids
- Thin 1px dividers
- Strong alignment
- Large product photography
- Minimal decorative elements

Avoid excessive rounded cards, gradients, glassmorphism, or generic SaaS-style layouts.

---

# Primary Button

Black background.

White text.

Gold may be introduced through hover, active, or subtle accent treatment.

- Pill radius: `9999px`
- Padding: approximately `12px 22px`
- Font size: 10–11px
- Uppercase
- Letter spacing: approximately `0.5px`
- Weight: 400

The primary CTA should feel premium and restrained.

---

# Secondary Button

White background.

1px black border.

Black text.

Gold may be used for hover or selected states.

Fully rounded pill shape.

---

# Gold Usage

Gold is the TCW signature.

Use it for:

- Logo details
- Selected navigation states
- Important active states
- Small product badges
- Premium accents
- Hover states
- Small decorative lines
- Important price or customization indicators
- Selected customization options

Do NOT use gold for:

- Entire page backgrounds
- Large content sections
- Every button
- Every border
- Large text blocks
- Excessive decorative elements

Gold should feel expensive because it is restrained.

---

# Product Grid

Products should remain the primary visual focus.

Use a clean catalog-style grid with thin `#CACACA` borders.

Product cards should contain:

- Product image
- Product name
- Product category/type
- Price
- Optional product metadata
- Optional small status badge

Avoid heavy card shadows.

The product photography should dominate the card.

---

# Navigation

White background.

Thin concrete-gray bottom border.

Use black typography and icons.

Gold may be used for:

- Active navigation state
- Small logo details
- Cart count
- Hover state

The navigation should remain clean and minimal.

---

# Hero

The hero should feel editorial and luxurious rather than promotional.

Use large product-focused imagery.

Large 48px typography.

Black/white foundation with restrained gold accents.

The hero should immediately communicate:

**Luxury custom wigs and premium hair.**

Avoid excessive text.

---

# Imagery

Photography should be product-first.

Prioritize:

- Wigs
- Bundles
- Closures
- Frontals
- Finished custom wigs
- Detailed hair texture
- Clean product photography

Avoid generic stock photography.

Avoid unnecessary lifestyle imagery.

The product should always be the visual focus.

---

# Design Principles

1. Luxury through restraint.
2. Black and white are the foundation.
3. Gold is the single brand accent.
4. Typography should remain clean and editorial.
5. Product photography should dominate.
6. Use thin borders instead of heavy cards.
7. Keep buttons pill-shaped.
8. Avoid excessive decoration.
9. Avoid gradients and glassmorphism.
10. Maintain strong spacing and alignment.
11. Keep the interface premium rather than flashy.
12. The website exists primarily to sell hair and custom wigs, so every visual decision should support product discovery and purchasing.

---

# Tailwind CSS v4 Theme

```css
@theme {
  /* Colors */
  --color-obsidian-black: #000000;
  --color-pure-white: #ffffff;
  --color-champagne-gold: #c9a227;
  --color-soft-gold: #e6d3a3;
  --color-concrete-gray: #cacaca;
  --color-mist-gray: #f1f1f1;
  --color-iron-gray: #404040;
  --color-ash-gray: #616161;

  /* Typography */
  --font-ui-sans-serif: 'ui-sans-serif', ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --font-akkstdrg-akkurat-standard:
    'AkkStdRg (Akkurat Standard)', ui-sans-serif, system-ui,
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --font-frg-freitag-regular:
    'FRg (Freitag Regular)', ui-sans-serif, system-ui,
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --font-arial:
    'Arial', ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --font-sans-serif:
    'sans-serif', ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography */
  --text-label-sm: 11px;
  --leading-label-sm: 1.15;
  --tracking-label-sm: 0.44px;

  --text-body: 16px;
  --leading-body: 1.5;
  --tracking-body: 0.32px;

  --text-subheading: 24px;
  --leading-subheading: 1.28;

  --text-heading: 32px;
  --leading-heading: 0.97;
  --tracking-heading: -0.16px;

  --text-display: 48px;
  --leading-display: 0.97;
  --tracking-display: -0.48px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-48: 48px;

  /* Radius */
  --radius-md: 4px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-md: rgba(0, 0, 0, 0.12) 2px 2px 10px 0px;
  --shadow-subtle: rgb(64, 64, 64) 0px -1px 0px 0px;
  --shadow-sm: rgba(45, 45, 45, 0.5) 2px 2px 5px 0px;
}