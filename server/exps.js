import { HfInference } from '@huggingface/inference'

import fs from 'fs';
import dotenv from 'dotenv'

dotenv.config();

// Read the image file as a Buffer
const oldImageBuffer = fs.readFileSync("./local-images/1737485193439.jpg");


// Convert the Buffer to an ArrayBuffer
const oldImageArrayBuffer = oldImageBuffer.buffer.slice(
    oldImageBuffer.byteOffset,
    oldImageBuffer.byteOffset + oldImageBuffer.byteLength
);



const hf = new HfInference(process.env.HF_TOKEN)

const model = "ghoskno/Color-Canny-Controlnet-model"


const prompt = `make it a high teck spying machine targetted on Narco Criminals with vaporwave asthetic and better anotomy and more detailed and more colorful` 

try {
    const newImageBlob = await hf.imageToImage({
        model: model,
        inputs: oldImageArrayBuffer,
        parameters: {
            prompt: prompt,
            negative_prompt: "Black and white photo. text, bad anatomy, blurry, low quality",
        // Between 0 and 1
            strength: 0.65,
        }
    });

    if (!newImageBlob) {
        console.error('No response from imageToImage API');
    }

    const filePath = `./local-images/${Date.now()}.png`;
    fs.mkdirSync('./local-images', { recursive: true });
    const arrayBuffer = await newImageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);
} catch (error) {
    console.error('Error in imageToImage:', error);
}

