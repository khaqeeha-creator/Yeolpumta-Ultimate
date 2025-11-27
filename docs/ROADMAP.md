# Project Roadmap

## Phase 1: Foundation (Current)
- [x] Project scaffold with Vite + React + TypeScript.
- [x] Tailwind CSS styling system with custom "Ultimate" theme.
- [x] Mock API implementation using MSW.
- [x] Core Dashboard (Heatmap, Challenge Card, Stats).
- [x] Kanban Board with Drag & Drop (`@dnd-kit`).
- [x] Accessibility support (ARIA, Reduced Motion).
- [x] Unit Tests for core components.

## Phase 2: Persistence & PWA
- [ ] **Local Persistence**: Integrate `zustand/middleware/persist` to save state to `localStorage`.
- [ ] **PWA Support**: Add `vite-plugin-pwa` for offline capabilities and "Add to Home Screen".
- [ ] **Push Notifications**: Browser-based notifications for timer completion.

## Phase 3: Backend Integration
- [ ] **Auth System**: Replace mock user with JWT/OAuth implementation.
- [ ] **Database**: Connect to PostgreSQL/Supabase.
- [ ] **API Layer**: Replace MSW handlers with real Express/NestJS endpoints.

## Phase 4: Social & Real-time
- [ ] **Real-time Leaderboard**: Use WebSockets (Socket.io) to update XP live.
- [ ] **Study Groups**: Create lobbies for studying together (cam/mic support).
- [ ] **Chat**: Simple text chat within study groups.

## Phase 5: Advanced Analytics
- [ ] **Deep Dive**: Detailed charts for study distribution by tag/subject.
- [ ] **Export**: CSV/PDF export of study logs.
- [ ] **Trends**: AI-based suggestions on optimal study times.
