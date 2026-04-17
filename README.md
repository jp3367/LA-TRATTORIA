# La Trattoria

### Authentic Italian Cuisine — Restaurant Website

A fully responsive multi-page restaurant website built with React + Vite as part of a frontend development course.

---

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Pages Overview](#pages-overview)
- [Import / Export](#import--export)
- [Firebase & Services](#firebase--services)
- [Sample Import Files](#sample-import-files)
- [Third-Party Components](#third-party-components)
- [Tutorials & Resources](#tutorials--resources)
- [Design](#design)
- [Code Conventions](#code-conventions)
- [Git Branches](#git-branches)
- [License](#license)

---

## About The Project

**La Trattoria** is a restaurant website built to showcase authentic Italian cuisine. Created as a delivery of a frontend development course, applying React concepts such as components, props, state, routing, and Firebase Firestore integration.

Key highlights:
- Multi-page React app with client-side routing
- Fully responsive using Flexbox and CSS media queries
- Reusable components with props
- Interactive menu loaded live from Firebase Firestore
- Import / export of menu data in JSON, CSV and XML formats
- Centralized Firebase access through a `services/` layer
- Reservation form with controlled React state
- Embedded map showing the restaurant location in Las Palmas de Gran Canaria

---

## Built With

- [React 19](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM v7](https://reactrouter.com/)
- [Firebase (Firestore)](https://firebase.google.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Google Fonts](https://fonts.google.com/)

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

1. Clone the repo
```sh
git clone https://github.com/YOUR_USERNAME/la-trattoria.git
```

2. Install dependencies
```sh
npm install
```

3. Start the development server
```sh
npm run dev
```

4. Open http://localhost:5173 in your browser

---

## Pages Overview

### Home (/ or /home)
Landing page with hero section, features strip, featured dishes, and closing quote.

### Menu (/menu)
Full restaurant menu loaded from Firebase Firestore. Supports live category filtering.

### Contact (/contact)
Contact and reservations page with embedded OpenStreetMap and reservation form.

### About (/about)
Restaurant history, key statistics, team cards, and values section.

### Datos — Import / Export (/import-export)
Manage the menu data stored in Firebase. Supports importing and exporting in three formats:
- **JSON** — structured array of dish objects
- **CSV** — comma-separated values with header row
- **XML** — custom XML schema with `<dishes>` root and `<dish>` nodes

---

## Import / Export

### How to export
Navigate to **Datos** in the navigation bar. Click any of the three export buttons:
- `Exportar JSON` → downloads `datos.json`
- `Exportar CSV`  → downloads `datos.csv`
- `Exportar XML`  → downloads `datos.xml`

### How to import
Click **Seleccionar archivo** and choose a `.json`, `.csv`, or `.xml` file.
Warning: importing replaces all existing dishes in Firebase.

### Expected data shape

Each dish must have these fields:

| Field | Type | Example |
|-------|------|---------|
| `name` / `<n>` | string | `"Carbonara Clasica"` |
| `description` | string | `"Pasta artesanal..."` |
| `price` | string | `"14,90€"` |
| `category` | string | `"Pasta"` |
| `isPopular` | boolean / string | `true` / `"true"` |

---

## Firebase & Services

All Firebase access is centralized in `src/services/`:

```
src/
  firebase/
    config.js              <- inicializacion de Firebase
  services/
    dishesService.js       <- CRUD sobre la coleccion "dishes" en Firestore
    importExportService.js <- parsers y generadores de JSON / CSV / XML
```

Components and pages **never** import from `firebase/` directly. They always go through `services/`.

---

## Sample Import Files

Use these files to test the import functionality:

- [datos.json](./public/sample-data/datos.json)
- [datos.csv](./public/sample-data/datos.csv)
- [datos.xml](./public/sample-data/datos.xml)

---

## Third-Party Components

| Component | Description | Link |
|-----------|-------------|------|
| Firebase / Firestore | NoSQL cloud database for storing dish data | [firebase.google.com](https://firebase.google.com/) |
| OpenStreetMap | Embedded interactive map via iframe | [openstreetmap.org](https://www.openstreetmap.org/) |
| Google Fonts | Playfair Display and Lato font families | [fonts.google.com](https://fonts.google.com/) |
| React Router DOM | Client-side routing between pages | [reactrouter.com](https://reactrouter.com/) |

---

## Tutorials & Resources

- [React Official Documentation](https://react.dev/)
- [React Router DOM Docs](https://reactrouter.com/en/main)
- [Firebase Web SDK Docs](https://firebase.google.com/docs/web/setup)
- [Vite Getting Started Guide](https://vitejs.dev/guide/)
- [CSS Flexbox Complete Guide — CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Media Queries Guide — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [Best README Template — othneildrew](https://github.com/othneildrew/Best-README-Template)
- [React import/export example — tcrurav](https://github.com/tcrurav/react-import-export-json-xml-csv)

---

## Design

- Primary color: `#1a1a1a` (deep black) — backgrounds and text
- Secondary color: `#c8a96e` (warm gold) — accents and highlights
- Accent color: `#8b1a1a` (dark red) — prices and CTAs
- Background: `#faf8f4` (warm white) — page background
- Display font: Playfair Display — headings
- Body font: Lato — body text

---

## Code Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Folders | kebab-case | `dish-card/` |
| Component files | PascalCase | `DishCard.jsx` |
| CSS files | PascalCase | `DishCard.css` |
| CSS classes/ids | kebab-case | `.dish-card-name` |
| JS variables | camelCase | `filteredItems` |
| Boolean variables | is/has prefix | `isMenuOpen` |
| Routes | kebab-case | `/about`, `/import-export` |

---

## Git Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/import-and-export` | Import/export feature (merged into develop -> main) |

### Branch workflow
```sh
# Crear la rama de feature
git checkout -b feature/import-and-export

# ... desarrollar la feature ...

# Merge a develop
git checkout develop
git merge feature/import-and-export

# Merge a main
git checkout main
git merge develop
```

---

## License

Distributed under the MIT License. This project was created for educational purposes as part of a frontend development course.

---

Made with React + Firebase