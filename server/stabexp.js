import { HfInference } from "@huggingface/inference";
import * as dotenv from "dotenv";

dotenv.config();

const hf = new HfInference(process.env.HF_TOKEN);


async function generateEnhancedImage(hf, mainPrompt) {
    // System prompt to enhance any main prompt
    const systemPrompt = `
    Generate a high-quality image with vibrant colors, ultra-realistic textures, 
    dynamic lighting, and sharp details. Emphasize artistic quality, focus, and 
    clarity. Use techniques like cinematic composition, rich contrasts, and 
    high-definition elements for a visually stunning result.
  `;

    // Combine the system prompt with the user-defined main prompt
    const enhancedPrompt = `${systemPrompt} ${mainPrompt}`;

    const output = await hf.textToImage({
        model: 'stabilityai/stable-diffusion-xl', // Use a high-quality image generation model
        inputs: enhancedPrompt,
        parameters: {
            width: 1024,            // Higher resolution for better quality
            height: 1024,
            guidance_scale: 7.5,    // Balance prompt adherence
            num_inference_steps: 50 // More steps for refinement
        }
    });

    console.log('Generated Image URL:', output.image_url);
}

// Example usage
generateEnhancedImage(hf, "A magical forest with glowing trees and a serene river at twilight.");
