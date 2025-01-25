// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.

// Find a document in a collection.
// db.getCollection("posts").findOne({
    
// });

// import mongoose from "mongoose";

use("imaginapp");
const Post = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
});


const PostSchema = mongoose.model('Post', Post);

Post.show()



// export default PostSchema;