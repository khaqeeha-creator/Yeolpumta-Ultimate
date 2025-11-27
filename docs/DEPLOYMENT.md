# Deployment Guide

Yeolpumta Ultimate is a Single Page Application (SPA). It can be deployed to any static site host.

## Prerequisites

- Node.js 18+
- npm 9+

## Build Process

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Build**:
    ```bash
    npm run build
    ```

    This command compiles the TypeScript code and bundles assets using Vite. The output will be located in the `dist/` directory.

3.  **Preview Build**:
    ```bash
    npm run preview
    ```
    This spins up a local server serving the `dist/` folder to verify the production build.

## Hosting Options

### Vercel (Recommended)

1.  Install Vercel CLI or connect your GitHub repository to Vercel.
2.  **Build Command**: `npm run build`
3.  **Output Directory**: `dist`
4.  **Rewrites**: Vercel automatically handles SPA routing, but if you encounter 404s on refresh, ensure a `vercel.json` exists with:
    ```json
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
    ```

### Netlify

1.  Connect your repository.
2.  **Build Command**: `npm run build`
3.  **Publish Directory**: `dist`
4.  **Redirects**: Create a `_redirects` file in the `public/` folder with the following content to support client-side routing:
    ```text
    /*  /index.html  200
    ```

### Docker (Nginx)

To containerize the application:

```dockerfile
# Stage 1: Build
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Default Nginx config usually suffices for basic serving, 
# but custom config is needed for SPA routing (try_files).
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables

Currently, the app relies on internal mocks (`MSW`). If connecting to a real API:

1.  Create a `.env` file.
2.  Define `VITE_API_BASE_URL=https://api.your-backend.com`.
3.  Update `src/store/useStore.ts` to use this variable in fetch calls.
