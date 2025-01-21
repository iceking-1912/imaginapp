
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


import { HfInference } from '@huggingface/inference'

import fs from 'fs';

const hf = new HfInference('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')

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



const response = await hf.textToImage({
  model: 'black-forest-labs/FLUX.1-dev',
  inputs: 'a magical portal opening to another dimension, swirling with vibrant colors and energy make it landscape and deatailed with vaporwave astetic'
});

if (!response) {
  console.log
    ('No response from textToImage API');
}

const arrayBuffer = await response.arrayBuffer();
if (!arrayBuffer) {
  console.log('Failed to convert response to arrayBuffer');
}

const buffer = Buffer.from(arrayBuffer);
const filePath = `./local-images/${Date.now()}.png`;

fs.mkdirSync('./local-images', { recursive: true });
fs.writeFileSync(filePath, buffer);

