# GS Inc. Attorneys - Law Firm Website

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.2.0-blue)](https://reactjs.org/)

A modern, full-stack web application for GS Inc. Attorneys, a South African law firm providing exceptional legal services since 2011.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Frontend
- 🎨 Modern, responsive design with mobile-first approach
- 📱 Smooth navigation and user experience
- 📝 Interactive contact form with real-time validation
- 📅 Appointment booking system with time slot management
- 🔍 Detailed service pages with comprehensive information
- 👥 Team member profiles
- ⚡ Fast page loads with Vite bundling

### Backend
- 🔒 Secure REST API with input validation
- 📧 Automated email notifications for form submissions
- 💾 MongoDB database for data persistence
- 🛡️ Rate limiting and security middleware
- ✅ Request validation with express-validator
- 📊 Appointment slot availability checking

### Legal Services
- Civil & Commercial Litigation
- Constitutional & Administrative Law
- Corporate & Commercial Law
- Employment & Labour Law
- Debt Collection & Recovery
- Aviation Law
- Investigations
- Local Government Law
- Real Estate & Property Law
- Criminal Law & Litigation

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS variables
- **Font Awesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - Alternatively, use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud database)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/law-firm-website.git
cd law-firm-website
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd gs-inc-attorneys

# Install dependencies
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/gs_inc_attorneys

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gs_inc_attorneys?retryWrites=true&w=majority

# Email Configuration (Gmail Example)
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your.email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_FROM=GS Inc. Attorneys <noreply@gsi-attorneys.co.za>
EMAIL_ADMIN=shimane@gsi-attorneys.co.za

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Generate an app password for "Mail"
4. Use this password in `EMAIL_PASSWORD`

### Frontend Environment Variables

Create a `.env.local` file in the `gs-inc-attorneys` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_URL=http://localhost:5173
VITE_PHONE_NUMBER=+27118691121
VITE_EMAIL=reception@gsi-attorneys.co.za
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
cd gs-inc-attorneys
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Mode

**Build Frontend:**
```bash
cd gs-inc-attorneys
npm run build
```

**Start Backend:**
```bash
cd backend
NODE_ENV=production npm start
```

## 📁 Project Structure

```
law-firm-website/
├── backend/                    # Backend API
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controllers/
│   │   ├── appointmentControllers.js
│   │   └── contactControllers.js
│   ├── middleware/
│   │   └── validation.js      # Request validation
│   ├── models/
│   │   ├── Appointment.js     # Appointment schema
│   │   └── Contact.js         # Contact schema
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   └── contactRoutes.js
│   ├── scripts/
│   │   ├── initDB.js          # Database initialization
│   │   └── testConnection.js  # Test DB connection
│   ├── utils/
│   │   └── emailService.js    # Email functionality
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Main server file
│
├── gs-inc-attorneys/          # Frontend React App
│   ├── public/
│   ├── src/
│   │   ├── assets/           # Images and static files
│   │   ├── components/
│   │   │   ├── About/
│   │   │   ├── Contact/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── Hero/
│   │   │   ├── Services/
│   │   │   ├── ServicesDeepDive/
│   │   │   └── Team/
│   │   ├── Pages/
│   │   │   └── ServicesPage.jsx
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └── variable.css
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── .env.local            # Frontend environment variables
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── index.html                # Static HTML version
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

### Contact Routes
```
POST   /api/contact          # Submit contact form
GET    /api/contact          # Get all contacts (admin)
```

### Appointment Routes
```
POST   /api/appointments              # Create appointment
GET    /api/appointments              # Get all appointments
GET    /api/appointments/available-slots?date=YYYY-MM-DD  # Check availability
```

### Request Examples

**Submit Contact Form:**
```json
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+27123456789",
  "service": "civil-litigation",
  "message": "I need legal assistance with..."
}
```

**Book Appointment:**
```json
POST /api/appointments
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+27123456789",
  "service": "corporate-commercial",
  "preferredDate": "2024-12-20",
  "preferredTime": "10:00",
  "attorney": "any",
  "meetingType": "in-person",
  "duration": "60min",
  "message": "Optional additional information"
}
```

## 🚢 Deployment

### Backend Deployment (Render/Heroku)

1. Create a new web service
2. Connect your repository
3. Set environment variables
4. Deploy branch: `main`
5. Build command: `cd backend && npm install`
6. Start command: `cd backend && npm start`

### Frontend Deployment (Netlify/Vercel)

**Netlify:**
```bash
# Build settings
Base directory: gs-inc-attorneys
Build command: npm run build
Publish directory: gs-inc-attorneys/dist
```

**Environment Variables:**
- `VITE_API_URL` - Your backend API URL
- `VITE_PHONE_NUMBER` - Law firm phone number
- `VITE_EMAIL` - Law firm email

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (or allow from anywhere: 0.0.0.0/0)
5. Get connection string and add to `.env`

## 🧪 Testing

### Test Database Connection
```bash
cd backend
npm run test-db
```

### Initialize Database
```bash
cd backend
npm run init-db
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows: Check Services
# Mac: brew services list
# Linux: sudo systemctl status mongod

# Start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use
```bash
# Find and kill process on port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill -9
```

### Email Not Sending
- Verify Gmail app password is correct
- Check 2FA is enabled on Gmail account
- Ensure less secure app access is disabled (use app passwords instead)
- Check spam folder for test emails

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Authors

- **Julius Galananzhele** - Director
- **Shimane Sebela** - Director

## 📞 Contact

**GS Inc. Attorneys**
- **Phone:** +27 11 869 1121
- **Email:** reception@gsi-attorneys.co.za
- **Website:** https://www.gsi-attorneys.co.za

**Office Locations:**
- Alberton Office: 8 Du Plessis Road, Alberton
- Bruma Office: 26 Ernest Oppenheimer Avenue, Vasco Dama House, Bruma, Johannesburg

## 🙏 Acknowledgments

- Font Awesome for icons
- Unsplash for placeholder images
- MongoDB for database solutions
- Netlify/Render for hosting platforms

---

**Built with ❤️ for Legal Excellence Since 2011**
