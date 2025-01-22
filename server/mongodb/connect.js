import mongoose from 'mongoose';
import { castToError } from 'openai/core.mjs';


const connectDB = (url) => {

    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err));

    const imageSchema = new mongoose.Schema({
        prompt: String,
        imagePath: String,
        createdAt: { type: Date, default: Date.now },
    });

    const Image = mongoose.model('Image', imageSchema);

    const newImage = new Image({
        prompt: "jsn",
        date: new Date(),
        imagePath: "1290",
    });

    // try {
    //     newImage.save();
    //     console.log("OBJ added");

    // } catch (err) {
    //     console.log(err);

    // }
}

export default connectDB;