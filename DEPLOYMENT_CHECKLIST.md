# 🚀 Deployment Checklist - Supabase Todo App

## ✅ Pre-Deployment Status

### Backend ✅
- [x] Supabase client configured
- [x] ES modules setup (type: "module")
- [x] CRUD API routes created
- [x] CORS configured for production
- [x] Environment variables structured
- [x] Health check endpoint available
- [x] Production-ready server.js

### Frontend ✅
- [x] API endpoint updated for Supabase
- [x] Environment variables configured
- [x] Production build settings ready
- [x] Development/Production URLs separated

### Database ✅
- [x] Supabase project created
- [x] Project URL: https://itdwjxkyqwlileayofcw.supabase.co
- [ ] ⚠️ TODO: Create `todos` table (see SQL below)

### Git Repository ✅
- [x] Code committed to GitHub
- [x] Repository: https://github.com/Jnanendravarma/todolist
- [x] .env files protected (in .gitignore)

---

## 🎯 Deployment Steps

### Step 1: Create Supabase Table (Required!)

Go to: https://supabase.com/dashboard/project/itdwjxkyqwlileayofcw/sql

Run this SQL:
```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for todos" ON todos
FOR ALL USING (true);
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to: https://vercel.com/new
2. Import your GitHub repository: `Jnanendravarma/todolist`
3. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - Keep default build settings
4. Add Environment Variables (see below)
5. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
npm i -g vercel
vercel login
cd c:\Users\Jnanendravarma927\Downloads\todolist
vercel
```

### Step 3: Environment Variables for Vercel

Add these in **Vercel Dashboard → Settings → Environment Variables**:

#### Backend Variables:
```
SUPABASE_URL=https://itdwjxkyqwlileayofcw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0ZHdqeGt5cXdsaWxlYXlvZmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMDgxMzMsImV4cCI6MjA4Mzc4NDEzM30.shWbW7dqGxtvlOFvuOqf6m8tXYEBHBcwhGNKxS6IMiE
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-project-name.vercel.app
```

⚠️ **Update `FRONTEND_URL`** after first deployment with your actual Vercel URL!

#### Frontend Variables:
```
REACT_APP_API_URL=/api
```

---

## 🧪 Testing After Deployment

### 1. Test API Endpoints
```bash
# Health check
curl https://your-project.vercel.app/api/health

# Get todos
curl https://your-project.vercel.app/api/todos

# Create todo
curl -X POST https://your-project.vercel.app/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test deployment"}'
```

### 2. Test Frontend
1. Open: https://your-project.vercel.app
2. Add a new todo
3. Edit and delete todos
4. Check Supabase dashboard for data

---

## 📁 Project Structure (Vercel Compatible)

```
todolist/
├── backend/
│   ├── config/
│   │   └── supabase.js       # Supabase client
│   ├── routes/
│   │   └── todoRoutes.js     # API routes
│   ├── server.js             # Express server (exports for Vercel)
│   ├── package.json          # type: "module"
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.js            # React app
│   │   └── ...
│   ├── public/
│   ├── package.json
│   ├── .env.development      # Local API URL
│   └── .env.production       # Production API URL (/api)
│
├── vercel.json               # Vercel configuration ✅
├── .gitignore
└── README.md
```

---

## ⚙️ Vercel Configuration

The `vercel.json` file is already configured:
- Backend runs as serverless functions at `/api/*`
- Frontend served as static build
- Both work together seamlessly

---

## 🔒 Security Checklist

✅ Environment variables not committed to Git
✅ .env files in .gitignore
✅ Supabase RLS policies enabled
✅ CORS configured properly
✅ Anon key is safe for frontend use

---

## 🚨 Common Issues & Solutions

### Issue 1: "Cannot find module" errors
**Solution:** Ensure all imports use `.js` extensions (ES modules)

### Issue 2: CORS errors
**Solution:** Update `FRONTEND_URL` in Vercel env variables with actual URL

### Issue 3: Database connection fails
**Solution:** 
- Check Supabase credentials
- Ensure `todos` table exists
- Verify RLS policies

### Issue 4: API routes return 404
**Solution:** Check `vercel.json` routes configuration

---

## 📊 Monitoring

### Vercel Dashboard
- Function logs
- Analytics
- Deployment status

### Supabase Dashboard
- Database viewer
- API logs
- Storage metrics

---

## 🎉 You're Ready to Deploy!

Current Status: **✅ DEPLOYMENT READY**

Missing: Only the `todos` table creation in Supabase (5-minute task)

After creating the table, you can deploy immediately!

---

## 🔗 Quick Links

- **GitHub Repo:** https://github.com/Jnanendravarma/todolist
- **Supabase Dashboard:** https://supabase.com/dashboard/project/itdwjxkyqwlileayofcw
- **Vercel:** https://vercel.com/new

---

## 💡 Next Steps After Deployment

1. Update README with live demo URL
2. Set up custom domain (optional)
3. Enable Vercel Analytics
4. Configure Supabase backup policies
5. Set up monitoring/alerts
