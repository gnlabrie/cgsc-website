# Guy Labrie - Consultation TI Inc

A clean, professional single-page website for Guy Labrie - Consultation TI Inc, hosted at [cgsc.ca](https://cgsc.ca).

## Quick Start

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

Alternatively, run `npm run dev` — a local server is required for projects to load.

## Customize

Edit `index.html` to update:

- **Company name & tagline** — hero and About sections (`Guy Labrie - Consultation TI Inc`)
- **Expertise cards** — four skill areas in the Expertise section
- **Experience timeline** — your career history
- **Links** — LinkedIn URL, email, and CV PDFs (`docs/`) in the Connect section

### Projects

Each project lives in its own file under `projects/`:

| File | Purpose |
|------|---------|
| `projects/manifest.json` | Lists project files and display order |
| `projects/*.json` | One file per project |

To **update** a project, edit its JSON file. To **add** a project, create a new JSON file and add its filename to `manifest.json`. To **remove** a project, delete its entry from `manifest.json`.

Example project file (`projects/kafka-gcp.json`):

```json
{
  "tag": "Platform Engineering",
  "title": "Kafka Self-Managed Clusters on GCP",
  "description": "Short summary of the engagement.",
  "details": [
    "GCP · Terraform · Ansible",
    "2024 · Team of 7"
  ]
}
```

To add more social links later, duplicate a `.social-link` anchor in the Connect section.

## Structure

| File              | Purpose                              |
|-------------------|--------------------------------------|
| `index.html`      | Page content and structure           |
| `styles.css`      | Layout, typography, responsive       |
| `script.js`       | Mobile menu and footer year          |
| `projects.js`     | Loads and renders project cards      |
| `projects/*.json` | Individual project data              |

## Deploy

This is a static site. Deploy to any static host (GitHub Pages, Netlify, Vercel, Azure Static Web Apps, etc.) by uploading the project files.
