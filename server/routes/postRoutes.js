//api creations
import express from 'express';

//img storage
import { v2 as cloudinary } from 'cloudinary';

//env variables
import * as dotenv from 'dotenv';

//dbimports
import client from "../mongodb/models/dbclient.js"
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});




router.route('/').get(async (req, res) => {
    try {
        const filter = {
            'name': {
                '$type': 'string'
            },
            'prompt': {
                '$type': 'string'
            },
            'photo': {
                '$type': 'string'
            }
        };

        const coll = client.db('imaginapp').collection('posts');
        const cursor = coll.find(filter);
        const results = await cursor.toArray();
        // console.log(results);
        
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false, message: `${err}` });
    }
});

router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        try {
            const newPost = await Post.create({
                name,
                prompt,
                photo: photoUrl.url,
            })
            res.status(200).json({ success: true, data: newPost });
            // console.log("DB POST CREATED");

        } catch (e) {
            console.log(e)
         }
    } catch (err) {
        res.status(500).json({ success: false, message: `${err}` });
    }
});

export default router;
