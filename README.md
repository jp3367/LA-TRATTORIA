# La Trattoria

### Authentic Italian Cuisine — Restaurant Website

A fully responsive multi-page restaurant website built with React + Vite as part of a frontend development course.

---

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Pages Overview](#pages-overview)
- [Third-Party Components](#third-party-components)
- [Tutorials & Resources](#tutorials--resources)
- [Design](#design)
- [Code Conventions](#code-conventions)
- [License](#license)

---

## About The Project

**La Trattoria** is a restaurant website built to showcase authentic Italian cuisine. The project was created as the first delivery of a frontend development course, applying React concepts such as components, props, state, and routing.

The homepage features a full-screen hero section with a background image, a highlights strip with three restaurant features, a grid of featured dishes rendered from a JSON array of objects using a reusable DishCard component, and a closing quote section. The design uses a warm, elegant color palette with serif typography to convey the feel of a classic Italian trattoria.

Key highlights:
- Multi-page React app with client-side routing
- Fully responsive using Flexbox and CSS media queries
- Reusable components with props
- Interactive menu with live category filtering
- Reservation form with controlled React state
- Embedded map showing the restaurant location in Las Palmas de Gran Canaria

---

## Built With

- [React 19](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM v7](https://reactrouter.com/)
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
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
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
The main landing page of the website. It includes a full-screen hero section with a call-to-action, a features strip highlighting fresh ingredients, the Italian chef, and the wine cellar, a responsive grid of six featured dishes using the DishCard component, and a closing inspirational quote.

### Menu (/menu)
The full restaurant menu page. Dishes are loaded from a JSON array and rendered with the reusable DishCard component. Users can filter dishes by category (Starters, Pasta, Pizzas, Rice, Meat, Desserts) using interactive filter buttons powered by React state.

### Contact (/contact)
The contact and reservations page. It displays the restaurant address, phone, and email, an embedded OpenStreetMap showing the location in Las Palmas de Gran Canaria, and a reservation form with fields for name, email, date, number of guests, and comments.

### About (/about)
The about page presents the restaurant history since 2008, key statistics, team member cards for the chef, sommelier, and pastry chef, and a values section covering quality, soul, family treatment, and sustainability.

---

## Third-Party Components

| Component | Description | Link |
|-----------|-------------|------|
| OpenStreetMap | Embedded interactive map via iframe showing the restaurant location | [openstreetmap.org](https://www.openstreetmap.org/) |
| Google Fonts | Playfair Display and Lato font families | [fonts.google.com](https://fonts.google.com/) |
| React Router DOM | Client-side routing between pages | [reactrouter.com](https://reactrouter.com/) |

---

## Tutorials & Resources

- [React Official Documentation](https://react.dev/)
- [React Router DOM Docs](https://reactrouter.com/en/main)
- [Vite Getting Started Guide](https://vitejs.dev/guide/)
- [CSS Flexbox Complete Guide — CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Media Queries Guide — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [Best README Template — othneildrew](https://github.com/othneildrew/Best-README-Template)
- [OpenStreetMap Embed Guide](https://wiki.openstreetmap.org/wiki/Embed_Map)

---

## Design

The design follows a refined, editorial aesthetic inspired by classic Italian restaurant branding. A warm color palette with serif typography creates an elegant and inviting feel.

- Primary color: #1a1a1a (deep black) — backgrounds and text
- Secondary color: #c8a96e (warm gold) — accents and highlights
- Accent color: #8b1a1a (dark red) — prices and CTAs
- Background: #faf8f4 (warm white) — page background
- Display font: Playfair Display — headings
- Body font: Lato — body text

Figma inspiration: [Restaurant UI Kit](https://www.figma.com/community/file/1020079203752339534)

---

## Code Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Folders | kebab-case | dish-card/ |
| Component files | PascalCase | DishCard.jsx |
| CSS files | PascalCase | DishCard.css |
| CSS classes/ids | kebab-case | .dish-card-name |
| JS variables | camelCase | filteredItems |
| Boolean variables | is/has prefix | isMenuOpen |
| Routes | kebab-case | /about, /contact |

---

## License

Distributed under the MIT License. This project was created for educational purposes as part of a frontend development course.

---

Made with React
