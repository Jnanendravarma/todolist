# Vercel Deployment Guide

## Prerequisites
1. Vercel account (free tier available)
2. MongoDB Atlas account (free tier available)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Project Structure
This is a full-stack application with:
- **Backend**: Express.js API (Node.js)
- **Frontend**: React application
- **Database**: MongoDB

## Deployment Steps

### 1. Database Setup (MongoDB Atlas)
1. Create free MongoDB Atlas account
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string

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
- `MONGODB_URI` = Your MongoDB Atlas connection string
- `NODE_ENV` = production
- `FRONTEND_URL` = Your Vercel app URL (e.g., https://your-project.vercel.app)

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

## Troubleshooting

### Common Issues:
1. **CORS errors**: Check FRONTEND_URL environment variable
2. **Database connection**: Verify MongoDB Atlas connection string
3. **API not found**: Ensure routes start with `/api`

### Logs:
- Check Vercel function logs in dashboard
- Use `/api/health` endpoint to verify backend status

## Free Tier Limits
- **Vercel**: 100GB bandwidth, 6,000 minutes execution time
- **MongoDB Atlas**: 512MB storage, M0 cluster

## Scaling
- Upgrade Vercel plan for more resources
- Use MongoDB Atlas paid tiers for larger databases
- Consider Redis for caching (Vercel KV)