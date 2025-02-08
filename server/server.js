// import { MongoClient } from 'mongodb';

// /*
//  * Requires the MongoDB Node.js Driver
//  * https://mongodb.github.io/node-mongodb-native
//  */

// const filter = {
//     'name': {
//         '$type': 'string'
//     },
//     'prompt': {
//         '$type': 'string'
//     },
//     'photo': {
//         '$type': 'string'
//     }
// };

// const client = await MongoClient.connect(
//     'mongodb://localhost:27017/imaginapp'
// );
// const coll = client.db('imaginapp').collection('posts');
// const cursor = coll.find(filter);
// const result = await cursor.toArray();
// console.log(result);

// await client.close();
import mongoose from "mongoose";
import express from "express";
import Post from "./mongodb/models/post.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch((err) => console.error("Mongoose connection error:", err));

app.use("/posts", async (req, res) => {
  try {
      const { name, prompt, photo } = req.body;
      
    try {
        
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });
        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        console.error( error);
        
    }
      // console.log("DB POST CREATED");
    
  } catch (err) {
    res.status(500).json({ success: false, message: `${err}` });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
