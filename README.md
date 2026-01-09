# Pokeverse

Pokeverse is a full-stack Pokémon search engine (Pokédex) built using Node.js and React (Vite).  
It focuses on performance, clean architecture, and a polished user experience while consuming data from the public PokeAPI.

---

## Features

- Search Pokémon by name with debounced input
- Fetch a random Pokémon using a reliable backend implementation
- Backend caching for faster repeated searches
- Recent searches powered by cached data
- Responsive Pokémon grid view
- Infinite scrolling using IntersectionObserver
- Sorting by Pokémon ID and name (ascending and descending)
- Detailed Pokémon view with animated stats
- Smooth modal open/close interactions
- Home navigation without page reloads
- High-resolution official Pokémon artwork
- Custom loading animation during API calls

---

## Tech Stack

### Frontend
- React with Vite
- TypeScript
- Axios
- Custom CSS

### Backend
- Node.js
- Express
- Axios
- In-memory caching

### Package Manager
- Yarn

---

## Getting Started

### Start Backend
```bash
cd backend
yarn
yarn dev
```

Backend runs on:
```bash
http://localhost:4000
```

### Start Frontend

```bahs
cd frontend/pokeverse-ui
yarn
yarn dev
```

Frontend runs on:
```bash
http://localhost:5173
```

### Backend APIs

- Search Pokémon
GET /api/v1/pokeverse/pokemon/:name

- Random Pokémon
GET /api/v1/pokeverse/pokemon/random

- Pokémon List (Grid + Sorting)
GET /api/v1/pokeverse/pokemon?limit=24&offset=0&sort=name_asc

- Recent Searches
GET /api/v1/pokeverse/pokemon/recent

### Design Highlights

- Clear separation between controllers, services, and cache layers

- Name-based caching for consistency and performance

- ID-based fetching for random Pokémon to avoid failures

- Explicit UI view modes to prevent conflicting renders

- Infinite scroll implemented without scroll event listeners

- Sorting fully integrated with pagination

### Author

Raj Motwani
rajmotwani38@gmail.com