// import { MongoClient, ServerApiVersion } from "mongodb";

// import * as dotenv from "dotenv";

// dotenv.config({ path: "/home/arcticarc/EX_CODE/imaginapp/server/.env" });

// // const uri =
// //   "mongodb+srv://kingoftheiceland:SkobQ7Eg03dub65S@imaginapp.fzgfu.mongodb.net/";

// const filter = {
//   name: {
//     $type: "string",
//   },
//   prompt: {
//     $type: "string",
//   },
//   photo: {
//     $type: "string",
//   },
// };

// console.log(process.env.MONGO_URI);

// const client = new MongoClient(process.env.MONGO_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const coll = client.db("imaginapp").collection("posts");
// const cursor = coll.find(filter);
// const result = await cursor.toArray();
// console.log(result);

// await client.close();

import { mongoose } from "mongoose";
// const uri =
//   "mongodb+srv://kingoftheiceland:SkobQ7Eg03dub65S@imaginapp.fzgfu.mongodb.net/imaginapp";

// const uri = "mongodb://localhost:27017/imaginapp";

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  __v: { type: Number, required: true },
});

const Post = mongoose.model("Post", postSchema);

async function createPost() {
  const newPost = new Post({
    name: "CAT PANDAe",
    prompt: "vfdbujdsvnj",
    photo: "objvfdjofuj",
    __v: 1,
  });

  try {
    const result = await newPost.save();
    console.log(`New post created with the following id: ${result._id}`);
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    mongoose.connection.close();
  }
}

export default createPost;
