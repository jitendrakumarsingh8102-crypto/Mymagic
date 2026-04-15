# My Magic - Full Stack Anniversary Website

A beautiful, functional replica of our special website, now powered by a permanent Instagram-style gallery.

## Project Structure

- `/myMagic`: React (Vite) frontend.
- `/backend`: Node.js (Express) server for the Moments feed.

## Getting Started

### 1. Prerequisite Setup

#### Backend configuration
1. Navigate to the `backend` folder.
2. Rename `.env.example` to `.env`.
3. Fill in your credentials:
   - **MONGODB_URI**: Your MongoDB connection string.
   - **CLOUDINARY_CLOUD_NAME**: Your Cloudinary account name.
   - **CLOUDINARY_API_KEY**: Your API key.
   - **CLOUDINARY_API_SECRET**: Your API secret.

### 2. Running the Application

You will need **two terminal windows** open at the same time:

#### Terminal 1: Backend Server
```bash
cd backend
npm install
node server.js
```

#### Terminal 2: Frontend Website
```bash
cd myMagic
npm install
npm run dev
```

## Features

- **Instagram-Style "Moments" Gallery**: Upload photos directly to Cloudinary and persist them in MongoDB.
- **Responsive Navigation**: Horizontally scrollable navigation for a clean mobile experience.
- **Anniversary Countdown**: Real-time counter since the magic began.
- **Romantic Aesthetic**: Consistent blush-pink and rose-gold theme across all views.
- **Easter Eggs**: Secret messages hidden behind interactive elements.

Made with ❤️ for someone special.
