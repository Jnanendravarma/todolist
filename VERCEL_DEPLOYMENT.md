# Vercel Deployment Guide - Supabase Version

## Prerequisites
1. Vercel account (free tier available)
2. Supabase account (free tier available) ✅ Already set up
3. Git repository (GitHub) ✅ https://github.com/Jnanendravarma/todolist

## Project Structure
This is a full-stack application with:
- **Backend**: Express.js API (Node.js) with Supabase
- **Frontend**: React application
- **Database**: Supabase (PostgreSQL)

## Deployment Steps

### 1. Database Setup (Supabase) ✅ DONE
Your Supabase project is already configured:
- Project ID: itdwjxkyqwlileayofcw
- URL: https://itdwjxkyqwlileayofcw.supabase.co
- Table: `todos` (needs to be created if not done yet)

### 2. Deploy to Vercel

#### Option A: Automatic Deployment
1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in Vercel dashboard
3. Set environment variables (see below)
4. Deploy

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### 3. Environment Variables

Set these in Vercel dashboard (Project → Settings → Environment Variables):

**Production Environment Variables:**
- `MONGODB_URI` = Your MongoDB Atl (Backend):**
- `SUPABASE_URL` = https://itdwjxkyqwlileayofcw.supabase.co
- `SUPABASE_ANON_KEY` = Your Supabase anon key (from .env file)
- `NODE_ENV` = production
- `FRONTEND_URL` = Your Vercel app URL (e.g., https://your-project.vercel.app)
- `PORT` = 5000

**Frontend Environment Variables:**
- `REACT_APP_API_URL` = /api (for production, relative path
**Frontend automatically detects backend API at `/api` routes**

### 4. Project Configuration

The project includes:
- `vercel.json` - Vercel configuration for monorepo deployment
- Backend API routes prefixed with `/api`
- CORS configured for Vercel domains
- Health check endpoint at `/api/health`

### 5. API Endpoints

Once deployed, your API will be available at:
- `https://your-project.vercel.app/api/health` - Health check
- `https://your-project.vercel.app/api/todos` - Todo CRUD operations

### 6. Local Development

1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### 7. Environment Files

Create `.env` files from examples:
- `backend/.env` (from `backend/.env.example`)
- `frontend/.env` (from `frontend/.env.example`)
Supabase credentials and table exists
3. **API not found**: Ensure routes start with `/api`
4. **Supabase errors**: Check Row Level Security policies are enabled

### Common Issues:
1. **CORS errors**: Check FRONTEND_URL environment variable
2. **Database connection**: Verify MongoDB Atlas connection string
3. **API not found**: Ensure routes start with `/api`

### Supabase**: 500MB database, 2GB bandwidth, 50MB file storage

## Scaling
- Upgrade Vercel plan for more resources
- Use Supabase Pro for larger databases and more resources
- Consider Redis for caching (Vercel KV or Supabase Edge Functionsnutes execution time
- **MongoDB Atlas**: 512MB storage, M0 cluster

## Scaling
- Upgrade Vercel plan for more resources
- Use MongoDB Atlas paid tiers for larger databases
- Consider Redis for caching (Vercel KV)