
// import express from 'express';

// const app = express();

// app.get('/fetch-image', async (req, res) => {
//   try {
//     const response = await hf.textToImage({
//       model: 'black-forest-labs/FLUX.1-dev',
//       inputs: 'a picture of a green bird'
//     });
//     const buffer = await response.buffer();

//     const filePath = `./local-images/${Date.now()}.png`;
//     fs.writeFileSync(filePath, buffer);

//     res.json({ imageUrl: filePath });
//   } catch (error) {
//     console.error('Fetch image error:', error);
//     res.status(500).json({ error: 'Failed to fetch image.' });
//   }
// });

// for await (const aiop of ailib.textGenerationStream({
//   model: "google/gemma-2-2b-it",
//   inputs: "a mermaid swimming gracefully in an underwater city, surrounded by coral reefs and sea creatures",
//   parameters: {
//     max_new_tokens: 100,
//     temperature: 0.7,
//   },
// })) {
//   console.log(aiop.generated_text);
// }
















// async function query(data) {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers",
//     {
//       headers: {
//         Authorization: "Bearer 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",
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(data),
//     }
//   );
//   const result = await response.blob();
//   return result;
// }




// query({
//   "inputs": "a carnival with colorful rides and games, the air filled with laughter and music"
// }).then((response) => {
//   response.arrayBuffer().then((arrayBuffer) => {
//     const buffer = Buffer.from(arrayBuffer);
//     const filePath = `./local-images/${Date.now()}.png`;
//     fs.mkdirSync('./local-images', { recursive: true });
//     fs.writeFileSync(filePath, buffer);
//   });
// });


// const __dirname = path.resolve();
// const absolutePath = path.join(__dirname, 'local-images', '1737557478563.png');

// console.log('Absolute path:', absolutePath);

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// import mongoose from 'mongoose';


// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function () {
//   console.log('Connected to database');
// });
// db.useDb('imaginapp');

// if (!db) {
//   throw new Error('Failed to connect to database');
// }


// await genratedImgDBInsert(filePath);
// console.log('DB Insert completed successfully');

// import { HfInference } from '@huggingface/inference'
// import dotenv from 'dotenv'
// import ranPrompt from '../client/src/utils/index.js'
// import fs from 'fs';
// import path from 'path';

// dotenv.config();

// const hf = new HfInference(process.env.HF_TOKEN)


// const ranPro = ranPrompt('a magical portal opening to another dimension, swirling with vibrant colors and energy make it landscape and deatailed with vaporwave astetic')

// if (!ranPro) {
//   console.error('No response from textToImage API');
// }  
// console.log(ranPro);






// function genratedImgDBInsert(absolutePath) {

//   db.collection('posts').insertOne({
//     name: "Nelson",
//     description: ranPro,
//     image: absolutePath
//   });
// }


// async function generateImageFromText(ranPro) {
//   try {
//     console.log("fetching image");
//     const response = await hf.textToImage({
//       model: 'black-forest-labs/FLUX.1-dev',
//       inputs: ranPro
//     });
//     if (!response) {
//       console.error('No response from textToImage API');
//     }
//     console.log("image fetched");
//     return response;
//   } catch (error) {
//     console.error('Error in textToImage:', error);
//   }
// }

// async function fsSaver() {
//   const arrayBuffer = await response.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);
//   const filePath = `./local-images/${Date.now()}.png`;
//   fs.mkdirSync('./local-images', { recursive: true });
//   fs.writeFileSync(filePath, buffer);
//   console.log("Image saved to", filePath);
//   return filePath;
// }


// try {



//   const imageResponse = await generateImageFromText(ranPro);
//   if (!imageResponse) {
//     throw new Error('Failed to generate image');
//   }


//   console.log('genn Img completed successfully');

//   const filePath = await fsSaver(imageResponse);

//   if (!filePath) {
//     throw new Error('Failed to save image');
//   }

//   console.log('fs Save completed successfully');




// } catch (error) {
//   console.error('Error in image generation process:', error.message);
// }





import { HfInference } from '@huggingface/inference';
import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getRandomValues } from 'crypto';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const imageSchema = new mongoose.Schema({
  prompt: String,
  imagePath: String,
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

const hf = new HfInference(process.env.HF_TOKEN);

const ranPro = 'a space explorer discovering a new alien planet with strange flora and fauna';

if (!ranPro) {
  console.error('No response from textToImage API');
}

async function generateImageFromText(prompt) {
  try {
    console.log("fetching image");

    const response = await hf.textToImage({
      model: 'black-forest-labs/FLUX.1-dev',
      inputs: prompt
    });

    if (!response) {
      console.error('No response from textToImage API');
      return;
    }

    console.log("Response received:", response);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = `./local-images/${Date.now()}.png`;
    fs.mkdirSync('./local-images', { recursive: true });
    fs.writeFileSync(filePath, buffer);
    console.log("Image saved to", filePath);

    // Save to MongoDB

    
    console.log("Image data saved to MongoDB");
  } catch (error) {
    console.error('Error in textToImage:', error);
  }
}

generateImageFromText(ranPro).catch(error => {
  console.error('Error in image generation process:', error);
});

