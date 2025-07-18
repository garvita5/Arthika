const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const path = require('path'); // Added for SPA routing

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    process.env.PRODUCTION_URL || "https://arthika.onrender.com"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use("/api", routes);

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Arthika API",
    version: "1.0.0",
    endpoints: {
      query: "POST /api/query",
      speechToText: "POST /api/speech-to-text",
      textToSpeech: "POST /api/text-to-speech",
      roadmap: "GET/POST /api/user/:id/roadmap",
      trustScore: "GET /api/score/:id",
      legal: "GET /api/legal",
      feedback: "POST /api/feedback"
    }
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// SPA Routing - Serve React app for all non-API routes
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // For all other routes, serve the React app
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error handler
app.use(errorHandler);

module.exports = app;
