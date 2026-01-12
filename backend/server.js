import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables FIRST
dotenv.config();

import todoRoutes from "./routes/todoRoutes.js";

const app = express();

// CORS configuration for Vercel deployment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL || 'https://your-project.vercel.app',
        /\.vercel\.app$/,  // Allow all Vercel domains
      ]
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Supabase connection info
console.log('✅ Supabase configured');
console.log('📦 Using Supabase URL:', process.env.SUPABASE_URL);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: 'Supabase'
  });
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Supabase Todo API Running', 
    version: '2.0.0',
    database: 'Supabase',
    endpoints: {
      health: '/api/health',
      todos: '/api/todos'
    }
  });
});

// Use todo routes
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

// For Vercel deployment, export the app
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
export default app;