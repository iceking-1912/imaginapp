
// Node.js code example for downloading an image
// For more details, visit: https://github.com/pollinations/pollinations/blob/master/APIDOCS.md

import fs from 'fs';
import fetch from 'node-fetch';

async function downloadImage(imageUrl) {
  // Fetching the image from the URL
  const response = await fetch(imageUrl);
  // Reading the response as a buffer
  const buffer = await response.buffer();
  // Writing the buffer to a file named 'image.png'
  fs.writeFileSync('image.png', buffer);
  // Logging completion message
  console.log('Download Completed');
}

// Image details
const prompt = '';
const width = 512;
const height = 512;
const seed = 60733; // Each seed generates a new image variation
const model = 'flux'; // Using 'flux' as default if model is not provided

const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

downloadImage(imageUrl);
