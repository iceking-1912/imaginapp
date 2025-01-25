import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

// const Post = new mongoose.Schema({
//     name: { type: String, required: true },
//     prompt: { type: String, required: true },
//     photo: { type: String, required: true },
// });

// const PostSchema = mongoose.model('Posts', Post);

// export default PostSchema

const db = mongoose.Collection
export default db