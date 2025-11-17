# GS Inc. Attorneys – Render Ready Stack

A full-stack marketing site and lead-intake API for a South African law firm.  
Firebase has been completely removed — deployment now targets Render (static front-end + Node backend + MongoDB Atlas or compatible).

## Project Structure

- `gs-inc-attorneys/` – React 19 + Vite marketing site
- `backend/` – Express 5 API with MongoDB + Nodemailer
- `render.yaml` – Infrastructure-as-code definition for Render

## Requirements

- Node 22.x (matching the Render runtime)
- npm 10+
- MongoDB connection string
- SMTP credentials for Nodemailer

## Environment Variables

### Backend (`backend/.env`)
Use `backend/env.sample` as a reference and provide values for:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your mongodb connection string>
CLIENT_URL=https://gs-inc-attorneys.onrender.com
EMAIL_SERVICE=<gmail|sendgrid|...>
EMAIL_USERNAME=<smtp user>
EMAIL_PASSWORD=<smtp password>
EMAIL_FROM="GS Inc. Attorneys <no-reply@gsi-attorneys.co.za>"
EMAIL_ADMIN=<internal notifications address>
```

### Frontend (`gs-inc-attorneys/.env`)

```
VITE_API_URL=https://gs-inc-backend.onrender.com/api
VITE_PHONE_NUMBER=+27118691121
VITE_EMAIL=reception@gsi-attorneys.co.za
```

## Local Development

1. **Backend**
   ```bash
   cd backend
   npm install
   cp env.sample .env   # fill in values
   npm run dev
   ```
   The API listens on `http://localhost:5000`.

2. **Frontend**
   ```bash
   cd gs-inc-attorneys
   npm install
   npm run dev
   ```
   Update `VITE_API_URL` to `http://localhost:5000/api` for local testing.

## Render Deployment

`render.yaml` provisions two services:

1. **`gs-inc-backend` (Node service)**
   - Builds with `npm install`
   - Starts with `npm start`
   - Requires secrets for `MONGODB_URI`, `EMAIL_*`
   - Sets `CLIENT_URL` so CORS matches the front-end origin

2. **`gs-inc-attorneys` (Static site)**
   - Builds with `npm ci && npm run build`
   - Publishes the `dist` directory
   - Adds `VITE_API_URL=https://gs-inc-backend.onrender.com/api`

To deploy:

```bash
render blueprint deploy
```

Then set the required secrets in the Render dashboard (or via `render env:set`). After deployment, update DNS or use the default `onrender.com` domains referenced above.

## Testing & Health Checks

- Backend health endpoint: `GET https://gs-inc-backend.onrender.com/api/health`
- Frontend rewrite rule sends all routes to `index.html` for SPA navigation.

With Firebase removed, all hosting, analytics, and API traffic flow through Render-managed services.
