# GS Inc. Attorneys Documentation

Welcome to the project documentation for the GS Inc. Attorneys marketing site and API. This file powers the GitHub Pages build by living inside the `docs/` directory.

## Project Structure

- `gs-inc-attorneys/` – React 19 + Vite frontend.
- `backend/` – Express + MongoDB REST API.
- `shared/` – Shared data used by both the backend and frontend.

## Local Development

```bash
# Frontend
cd gs-inc-attorneys
npm install
npm run dev

# Backend
cd backend
npm install
cp env.sample .env   # add your secrets
npm run dev
```

## Deployment

- The project uses a Render blueprint (`render.yaml`) to deploy both the frontend and backend.
- Environment variables (Mongo URL, email credentials, etc.) must be set in Render before deployment.

## Support

If the GitHub Pages build fails, ensure this `docs/` folder exists on the default branch and contains this `index.md`. For additional help, reach out via the repository issues tab.

