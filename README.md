# Yeolpumta Ultimate

A high-difficulty, gamified study manager React application using standard modern web technologies.

## Features

- **Dashboard**: Central hub for stats, daily challenges, and consistency heatmaps.
- **StudyBoard**: Drag-and-drop Kanban board for managing study tasks.
- **Gamification**: Challenge acceptance flows, XP, and streaks.
- **Visuals**: Framer Motion animations, Recharts analytics, and an animated particle background.
- **Accessibility**: Reduced motion support, ARIA labels, and keyboard navigation.

## Setup & Running

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173`. MSW is enabled by default to mock API responses.

3.  **Run Tests**
    ```bash
    npm run test
    ```

4.  **Build**
    ```bash
    npm run build
    ```

## Architecture

- **State**: Zustand (`src/store/useStore.ts`)
- **Styling**: Tailwind CSS with custom `ultimate` color palette.
- **Mock API**: MSW (`src/api/msw-handlers.ts`).
- **Icons**: Lucide React.
- **Drag & Drop**: @dnd-kit/core.

## Key Components

| Component | Description |
|-----------|-------------|
| `StudyBoard` | Kanban board. Handles drag-and-drop logic for tasks. |
| `ProgressRing` | SVG-based animated circular progress indicator. |
| `ChallengeCard` | Interactive card with multi-step modal flow. |
| `AnimatedBackground` | Canvas-based particle system (disabled on reduced-motion). |

## Deployment

This is a pure SPA. Run `npm run build` to generate the `dist` folder.
- **Netlify/Vercel**: Drag and drop the `dist` folder or connect your repo.
- **Serve**: Ensure your web server rewrites all routes to `index.html`.
