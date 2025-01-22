import express from 'express';
import * as  dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import cors from 'cors';
import { randomBytes } from 'crypto';

dotenv.config();

const back = express()
back.use(cors());
back.use(express.json({ limit: '50mb' }));

back.get('/', (req, res) => {
  res.send('Backend server is Live!')
})




const startserving = () => {

  try {
    connectDB(process.env.MONGO_URI)
    back.listen(8090, () => {


      console.log(`Backend Server has Started at http://localhost:8090 `);
    }
    )
  } catch (err) {
    console.log(err);

  }
}

startserving()