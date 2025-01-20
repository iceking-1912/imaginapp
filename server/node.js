const axios = require('axios');
const fs = require('fs');

async function downloadImage(prompt, width = 768, height = 768, model = 'flux', seed = null) {
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=${width}&height=${height}&model=${model}&seed=${seed}`;

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync('generated_image.jpg', response.data);
        console.log('Image downloaded!');
    } catch (error) {
        console.error('Error downloading the image:', error);
    }
}

downloadImage("A beautiful sunset over the ocean", 1280, 720, 'flux', 42,"");