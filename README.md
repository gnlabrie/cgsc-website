# Guy Labrie - Consultation TI Inc

A clean, professional bilingual single-page website for Guy Labrie - Consultation TI Inc, hosted at [cgsc.ca](https://cgsc.ca).

- **Default language:** English
- **French:** Canadian French (fr-CA), switched via EN | FR in the navigation

## Quick Start

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

A local server is required for translations and projects to load.

## Customize

### Page content (English & French)

Edit the translation files:

| File | Purpose |
|------|---------|
| `i18n/en.json` | English page content |
| `i18n/fr.json` | French (Canada) page content |

The `data-i18n` attributes in `index.html` map elements to keys in these files.

### Projects

Each project lives in its own file under `projects/` with `en` and `fr` sections:

```json
{
  "en": {
    "tag": "Platform Engineering",
    "title": "Project title",
    "description": "Short summary.",
    "details": ["Tech stack", "Year · scope"]
  },
  "fr": {
    "tag": "Ingénierie de plateforme",
    "title": "Titre du projet",
    "description": "Résumé court.",
    "details": ["Technologies", "Année · portée"]
  }
}
```

Add new project filenames to `projects/manifest.json`.

### CV links

- English: `docs/CGI CV Guy Labrie - English - 202601.pdf` (set in `i18n/en.json`)
- French: `docs/CGI CV Guy Labrie - Francais - 202601.pdf` (set in `i18n/fr.json`)

The Connect section shows one CV link that switches with the selected language.

## Structure

| File              | Purpose                              |
|-------------------|--------------------------------------|
| `index.html`      | Page structure and i18n hooks        |
| `i18n/en.json`    | English translations                 |
| `i18n/fr.json`    | French (Canada) translations         |
| `i18n.js`         | Language switching and DOM updates   |
| `styles.css`      | Layout, typography, responsive       |
| `script.js`       | Mobile menu and footer year          |
| `projects.js`     | Loads and renders project cards      |
| `projects/*.json` | Bilingual consulting project data    |
| `opensource.js`   | Loads and renders open-source cards  |
| `opensource/*.json` | Bilingual GitHub project data      |

## Deploy

This is a static site. Deploy to any static host (GitHub Pages, Netlify, Vercel, Azure Static Web Apps, etc.) by uploading the project files.
