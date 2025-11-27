# Architecture Overview

## Tech Stack

The Yeolpumta Ultimate application is built using a modern, performance-focused React stack:

- **Core Framework**: React 18 (Functional Components + Hooks)
- **Build Tool**: Vite (ESBuild based, extremely fast HMR)
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS (Utility-first), `clsx` and `tailwind-merge` for class manipulation.
- **State Management**: Zustand (Minimalist, hook-based global state).
- **Animations**: Framer Motion (Declarative animations).
- **Drag & Drop**: @dnd-kit (Accessible, lightweight drag and drop).
- **Charts**: Recharts (Declarative SVG charting).
- **API Mocking**: MSW (Mock Service Worker) for intercepting network requests at the browser level.
- **Testing**: Vitest (Unit/Integration) + React Testing Library.

## Directory Structure

```text
src/
├── api/             # MSW handlers and seed data
├── charts/          # Recharts wrapper components
├── components/      # Reusable UI components
├── store/           # Global state (Zustand)
├── tests/           # Unit and Integration tests
├── utils/           # Helper functions (animations, accessibility)
├── App.tsx          # Main application layout
└── main.tsx         # Entry point
```

## State Management (Zustand)

We use a single store (`useStore`) to manage the application state. This avoids prop drilling and provides a central location for logic.

**Key Slices:**
1.  **User**: Profile data, XP, Energy.
2.  **Tasks**: List of tasks with status (todo, doing, done).
3.  **UI**: Theme (dark/light), Reduced Motion preferences, Loading states.
4.  **Analytics**: Heatmap and timeseries data.

**Data Flow:**
1.  Components subscribe to specific slices of the store using selectors (e.g., `const user = useStore(state => state.user)`).
2.  Components trigger actions defined in the store (e.g., `acceptChallenge()`).
3.  The store updates state immutably.
4.  Subscribed components re-render.

## API & Mocking

The application is designed to be backend-agnostic. All data fetching occurs in the `api/` layer (currently mocked via MSW).

- **Development**: MSW intercepts `fetch` requests in the browser and returns mock data from `seed.json`.
- **Testing**: MSW server intercepts requests in Node.js environment for integration tests.
- **Production**: To connect a real backend, simply remove the `enableMocking()` call in `App.tsx` and ensure your API endpoints match the paths used in the store.

## Animation Strategy

Animations are handled via `framer-motion` for complex component transitions and `requestAnimationFrame` for the canvas background.

- **Reduced Motion**: All animations check the `reducedMotion` flag in the store (or system preference) to either disable themselves or simplify the transition (e.g., fade instead of spring).
