import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import dbConntect from './config/db.config.js';

const app = express();
dbConntect();

import userRouter from './routes/user.routes.js';

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/user', userRouter);

// Port setup with fallback
const PORT = process.env.PORT || 5000;

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
