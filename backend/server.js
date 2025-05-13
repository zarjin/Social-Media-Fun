import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import dbConntect from './config/db.config.js';

const app = express();
dbConntect();

// Import routers
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';

// CORS configuration for production
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173', // your frontend URL
  credentials: true, // allow cookies with cross-origin requests
};
app.use(cors(corsOptions));

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Route Setup
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// Error Handling Middleware (for unhandled errors)
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server error',
  });
});

// Port setup with fallback
const PORT = process.env.PORT || 5000;

// Graceful Shutdown
const shutdown = () => {
  console.log('Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Server start
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
