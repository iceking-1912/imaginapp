import express from 'express';
import * as dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference'
import fs from 'fs';
import fetch from 'node-fetch';
import sharp from 'sharp';

dotenv.config();

const router = express.Router()


const hf = new HfInference(process.env.HF_TOKEN);

router.route('/').get((req, res) => {
    res.send('Hugging Face API Route is working');
});

async function generateImageFromText(promptsp, width, height, seed) {
    try {
        console.log("fetching image");

        const promptpr = `Create a visually captivating image with vivid, dynamic colors and hyper-realistic textures. Ensure the scene is illuminated with dramatic, cinematic lighting that highlights sharp, intricate details. Focus on artistic excellence, maintaining perfect clarity and balance in every element. Use advanced techniques like cinematic framing, high contrast, and deep tonal ranges to create a breathtaking, high-definition composition that showcases depth, contrast, and precision in every aspect.`;

        const prompt = `${promptpr} ${promptsp}`;



        // Function to download and enhance the image
        async function downloadImage(imageUrl, prompt) {
            if (!prompt) {
                console.error('Prompt is undefined or empty!');
                return; // Exit if prompt is not valid
            }

            // Extract the first 10 words of the prompt and sanitize the filename
            const filename = prompt
                .split(' ') // Split the prompt into words
                .slice(0, 10) // Take the first 10 words
                .join('_') // Join them with underscores
                .replace(/[^\w\s-]/g, '') // Remove special characters (except for spaces and hyphens)
                .replace(/\s+/g, '_') // Replace spaces with underscores
                .toLowerCase(); // Convert to lowercase

            try {
                // Fetching the image from the URL
                const response = await fetch(imageUrl);
                // Reading the response as a buffer
                const buffer = await response.buffer();

                // Create directory if it doesn't exist
                fs.mkdirSync('./local-images', { recursive: true });

                // Resize and enhance the image using sharp
                await sharp(buffer)
                    .resize({ width: 3840, height: 2160, fit: 'cover' }) // Resize to 4K resolution
                    .toFile(`./local-images/${filename}.png`); // Save the high-res image with the limited filename

                // Logging completion message
                console.log('Download and enhancement completed');

                const storedImage = fs.readFileSync(`./local-images/${filename}.png`);
                const base64Image = storedImage.toString('base64');
                return base64Image;

            } catch (err) {
                console.error('Error downloading or enhancing the image:', err);
            }
        }


        // const prompt = 'From the dazzling expanse of glistening ice caps to the deep...';
        // const width = 1920;
        // const height = 1080;
        // const seed = 42; // Each seed generates a new image variation
        const model = 'flux'; // Using 'flux' as default if model is not provided
        // const model = 'turbo'



        const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true`;

        // const imgdata = await downloadImage(imageUrl, promptsp);

        return imageUrl;
        // Read the stored image and convert to base64

        // const response = await hf.textToImage({
        //     // provider: "replicate",
        //     model: "black-forest-labs/Flux.1-dev",
        //     inputs: prompt,
        //     parameters: {
        //         width: 2160,            // Higher resolution for better quality
        //         height: 1440,
        //         guidance_scale: 7.5,    // Balance prompt adherence
        //         num_inference_steps: 50 // More steps for refinement
        //     }
        // });

        // if (!response) {
        //     console.error('No response from textToImage API');
        //     return;
        // }

        // console.log("Response received:", response);

        // try {
        //     const arrayBuffer = await response.arrayBuffer();
        //     const buffer = Buffer.from(arrayBuffer);
        //     const filePath = `./local-images/${Date.now()}.png`;
        //     fs.mkdirSync('./local-images', { recursive: true });
        //     fs.writeFileSync(filePath, buffer);
        //     console.log("Image saved to", filePath);

        // } catch (error) {
        //     console.error('Error saving image:', error);
        // }
        // const bytes = await response.arrayBuffer();
        // if (!bytes) {
        //     console.error('Error in textToImage: No bytes received');
        //     return;
        // }
        // const base64 = Buffer.from(bytes).toString('base64');

        // if (!base64) {
        //     console.error('Error in textToImage: No base64 string generated');
        //     return
        // }
        // return base64
    } catch (error) {
        console.error('Error in textToImage:', error);
    }
}

router.route('/').post(async (req, res) => {
    try {
        const { prompt, width, height, seed } = req.body;

        const img = await generateImageFromText(prompt, width, height, seed);

        res.status(200).json({ image: img });
    } catch (error) {
        console.error('Error in image generation process:', error.message);
    }
});



export default router