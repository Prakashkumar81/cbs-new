# Content Broadcast React App

This is a React + Vite frontend project for a Content Broadcasting System designed for teachers, principals, and public live views.

## What is included
- React with Vite and Tailwind CSS
- Role-based routing with `react-router-dom`
- Authentication flow with localStorage token simulation
- Teacher dashboard, upload form, my content page
- Principal dashboard, pending approvals, all content page
- Public live page at `/live/:teacherId`
- Service layer for API calls in `src/services`
- Form validation using `react-hook-form` and `zod`
- Reusable components, loading states, and empty states

## Setup
```bash
cd content-broadcast-react
npm install
npm run dev
```

Open http://localhost:5173

## Demo accounts
- Principal: `principal@example.com` / `password`
- Teacher: `teacher@example.com` / `password`

## Build
```bash
npm run build
```

## Notes
The `src/services` folder contains replaceable API stubs and can be swapped with a real backend by updating the `api.js` interface.
