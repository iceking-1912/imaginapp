import express from 'express';
import * as  dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import hfapiRoutes from './routes/hfapiRoutes.js';

dotenv.config();

const back = express()

back.use(cors());
back.use(express.json());

back.use('/api/v1/post', postRoutes);
back.use('/api/v1/hf', hfapiRoutes);

back.get('/', async (req, res) => {
  res.send('Backend server is Live!')
})

const startserving = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    back.listen(8090, () => {
      console.log(`Backend Server has Started at http://localhost:8090 `);
    })
  } catch (err) {
    console.log(err);
  }
}

startserving()