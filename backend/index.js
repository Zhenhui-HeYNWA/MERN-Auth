import express from 'express';
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //allows us to parse incoming req :req.body

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on prot ${PORT}`);
});
