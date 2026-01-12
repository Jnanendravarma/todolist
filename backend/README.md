# Supabase Todo App - Backend

✅ **Successfully migrated from MongoDB to Supabase!**

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend folder:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_public_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Create Supabase Table
In your Supabase SQL Editor, run:
```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for development)
CREATE POLICY "Enable all operations for todos" ON todos
FOR ALL USING (true);
```

### 4. Start Server
```bash
npm start
```

Server will run on: **http://localhost:5000**

## API Endpoints

- `GET /` - API info
- `GET /api/health` - Health check
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Project Structure
```
backend/
├── config/
│   └── supabase.js       # Supabase client configuration
├── routes/
│   └── todoRoutes.js     # CRUD operations for todos
├── server.js             # Express server setup
├── .env                  # Environment variables (DO NOT COMMIT)
├── .env.example          # Example environment variables
└── package.json
```

## Migration Notes
- ✅ Removed MongoDB/Mongoose
- ✅ Added Supabase client
- ✅ Updated to ES modules (type: "module")
- ✅ CRUD operations fully functional
- ✅ Ready for deployment
