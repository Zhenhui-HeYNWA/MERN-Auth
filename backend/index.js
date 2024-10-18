/* eslint-disable no-undef */
import express from 'express';
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json()); //allows us to parse incoming req :req.body
app.use(cookieParser());

app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on prot ${PORT}`);
});
