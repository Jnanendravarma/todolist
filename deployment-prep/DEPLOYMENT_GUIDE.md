# Deployment Guide for Todo App

## Architecture
- **Frontend**: React app (port 3000 in development)
- **Backend**: Express API (port 8080)
- **Database**: MongoDB

## Environment Variables Needed

### Backend (.env file)
```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=8080
NODE_ENV=production
```

### Frontend (environment variables)
```
REACT_APP_API_URL=https://your-backend-url.com
```

## Deployment Steps

### 1. Database Setup (MongoDB Atlas)
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create new cluster (M0 Sandbox - FREE)
4. Create database user
5. Whitelist IP addresses (0.0.0.0/0 for all)
6. Get connection string

### 2. Backend Deployment (Railway/Render)

#### Option A: Railway (Easier)
1. Go to https://railway.app
2. Sign up with GitHub
3. Connect your repository
4. Deploy backend folder
5. Add environment variables
6. Deploy

#### Option B: Render
1. Go to https://render.com
2. Connect GitHub repository
3. Create Web Service
4. Select backend folder
5. Add environment variables
6. Deploy

### 3. Frontend Deployment (Netlify)
1. Build the frontend locally
2. Go to https://netlify.com
3. Drag and drop build folder
4. Or connect GitHub repo for auto-deploy
5. Add environment variables

## Build Commands
- Frontend: `npm run build` (in frontend folder)
- Backend: `npm start` (in backend folder)

## Configuration Updates Needed
- Update CORS origins in backend
- Update API URLs in frontend
- Add production environment variables