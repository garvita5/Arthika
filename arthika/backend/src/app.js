const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

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

// Error handler
app.use(errorHandler);

module.exports = app;
