import request from "request";


async function generateAndPostImage(imageConfig) {  // Takes an imageConfig object
  try {
    const hfOptions = {
      'method': 'POST',
      'url': 'http://localhost:8090/api/v1/hf',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: imageConfig.prompt, // Use the prompt from the config
        width: imageConfig.width,      // Use width from config
        height: imageConfig.height,    // Use height from config
        seed: imageConfig.seed,        // Use seed from config
        // ... any other parameters for /api/v1/hf
      }),
    };

    const hfResponse = await new Promise((resolve, reject) => {
      request(hfOptions, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    if (hfResponse.statusCode !== 200) {
      console.error('Error generating image:', hfResponse.body.image);
      return;
    }

    const hfResponseBody = JSON.parse(hfResponse.body);
    const imageUrl = hfResponseBody.image;
    if (!imageUrl) {
      console.error('Error generating image:', hfResponseBody);
      return;
    }
    console.log('Generated image URL' );

    const postOptions = {
      'method': 'POST',
      'url': 'http://localhost:8090/api/v1/post',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: imageConfig.name,
        prompt: imageConfig.prompt, // Use name from config
        photo: imageUrl,
      }),
    };

    const postResponse = await new Promise((resolve, reject) => {
      request(postOptions, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    if (postResponse.statusCode !== 200) {
      console.error('Error posting image URL:', postResponse.statusCode, postResponse.statusMessage, postResponse.body);
      return;
    }

    console.log('Image URL posted successfully:', postResponse.body);

  } catch (error) {
    console.error('Error:', error);
  }
}


const imageConfigs = [
  // {
  //   name: "tokyo_rain_1",
  //   prompt:
  //     "(photorealistic:1.6), (ultra-detailed:1.6), cinematic lighting, 8k, Unreal Engine 5, (neon-lit Tokyo street at night:1.8), (rainy atmosphere, reflections on wet pavement:1.7), (bustling crowds with umbrellas:1.6), (shinjuku district architecture, towering skyscrapers, glowing signs:1.5), (steamy air, warm light from ramen shops:1.4), (atmospheric depth of field, blurred background lights:1.3), (diverse pedestrians in stylish clothing, some interacting with each other:1.7), (subtle motion blur on passing cars, reflections of neon lights:1.2), (cool blue light, rain falling, puddles reflecting city lights:1.5), (ambient occlusion shadows, realistic textures: wet asphalt, shiny umbrellas, damp clothing:1.5), (1 woman in her late 20s:1.8), (naturalistic East Asian facial features, mature and expressive:1.7) lora:asianBeauty_v1:0.5, (gentle smile, thoughtful gaze:1.6), (stylish trench coat, make a object of variable name and prompt out of it and also diffrent aspect ratio width and height and random seed",
  //   width: 1920,
  //   height: 1080,
  //   seed: Math.floor(Math.random() * 1000000), // Random seed
  // },
  {
    name: "cyberpunk_gaming_1",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (cyberpunk city at night:1.9), (neon lights, holographic billboards:1.8), (rain-soaked streets, reflections on wet pavement:1.7), (futuristic skyscrapers, flying cars:1.6), (atmospheric depth of field, blurred background:1.5), (no people, empty streets:1.4), (subtle motion blur on passing drones:1.3), (soft shadows, realistic textures: metal, glass, neon:1.6), (dynamic and immersive gaming atmosphere:1.5)",
    width: 3840,
    height: 2160,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "greek_goddess_athena_2",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (Athena, Greek goddess of wisdom:1.9), (standing on Mount Olympus:1.8), (golden armor, flowing white robes:1.7), (holding a spear and shield, glowing aura:1.6), (atmospheric depth of field, blurred background:1.5), (divine and powerful expression:1.4), (subtle motion blur on flowing fabric:1.3), (soft shadows, realistic textures: marble, gold, fabric:1.6), (majestic and awe-inspiring atmosphere:1.5)",
    width: 2160,
    height: 3840,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "fantasy_heroine_3",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (fantasy heroine in a mystical forest:1.9), (elven warrior with silver armor:1.8), (glowing sword, magical runes:1.7), (surrounded by ancient trees, glowing mushrooms:1.6), (atmospheric depth of field, blurred background:1.5), (determined and fierce expression:1.4), (subtle motion blur on glowing magic particles:1.3), (soft shadows, realistic textures: armor, leaves, light:1.6), (epic and enchanting atmosphere:1.5)",
    width: 4096,
    height: 2160,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "norse_god_thor_4",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (Thor, Norse god of thunder:1.9), (standing in a stormy battlefield:1.8), (wielding Mjolnir, lightning striking:1.7), (wearing battle armor, red cape:1.6), (atmospheric depth of field, blurred background:1.5), (powerful and commanding expression:1.4), (subtle motion blur on lightning bolts:1.3), (soft shadows, realistic textures: metal, leather, storm clouds:1.6), (epic and dramatic atmosphere:1.5)",
    width: 2160,
    height: 4096,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "sci-fi_space_station_5",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (futuristic space station orbiting Earth:1.9), (massive structure, glowing lights:1.8), (Earth in the background, stars and galaxies:1.7), (docking bays, spacecraft flying:1.6), (atmospheric depth of field, blurred background:1.5), (no people, empty station:1.4), (subtle motion blur on passing ships:1.3), (soft shadows, realistic textures: metal, glass, light:1.6), (immersive and futuristic atmosphere:1.5)",
    width: 3840,
    height: 2160,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "egyptian_goddess_isis_6",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (Isis, Egyptian goddess of magic:1.9), (standing in an ancient temple:1.8), (golden headdress, flowing linen robes:1.7), (holding an ankh, glowing hieroglyphs:1.6), (atmospheric depth of field, blurred background:1.5), (mystical and serene expression:1.4), (subtle motion blur on glowing magic:1.3), (soft shadows, realistic textures: stone, gold, fabric:1.6), (mystical and divine atmosphere:1.5)",
    width: 2160,
    height: 3840,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "post_apocalyptic_wasteland_7",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (post-apocalyptic wasteland:1.9), (ruined cityscape, broken skyscrapers:1.8), (dusty atmosphere, orange sunset:1.7), (abandoned vehicles, overgrown vegetation:1.6), (atmospheric depth of field, blurred background:1.5), (no people, empty ruins:1.4), (subtle motion blur on drifting sand:1.3), (soft shadows, realistic textures: rust, concrete, dirt:1.6), (desolate and haunting atmosphere:1.5)",
    width: 4096,
    height: 2160,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "hindu_god_shiva_8",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (Shiva, Hindu god of destruction:1.9), (meditating on Mount Kailash:1.8), (blue skin, matted hair, third eye:1.7), (holding a trident, surrounded by fire:1.6), (atmospheric depth of field, blurred background:1.5), (calm and powerful expression:1.4), (subtle motion blur on flowing flames:1.3), (soft shadows, realistic textures: skin, metal, fire:1.6), (divine and intense atmosphere:1.5)",
    width: 2160,
    height: 4096,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "fantasy_dragon_rider_9",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (fantasy dragon rider in the sky:1.9), (heroic warrior on a massive dragon:1.8), (glowing scales, fiery breath:1.7), (soaring above clouds, mountain peaks:1.6), (atmospheric depth of field, blurred background:1.5), (determined and fearless expression:1.4), (subtle motion blur on flapping wings:1.3), (soft shadows, realistic textures: scales, armor, clouds:1.6), (epic and adventurous atmosphere:1.5)",
    width: 3840,
    height: 2160,
    seed: Math.floor(Math.random() * 1000000),
  },
  {
    name: "steampunk_city_10",
    prompt:
      "(photorealistic:1.8), (ultra-detailed:1.8), cinematic lighting, 16k, Unreal Engine 5, (steampunk city at dusk:1.9), (gears, pipes, and steam engines:1.8), (Victorian architecture, airships flying:1.7), (cobblestone streets, glowing gas lamps:1.6), (atmospheric depth of field, blurred background:1.5), (no people, empty streets:1.4), (subtle motion blur on spinning gears:1.3), (soft shadows, realistic textures: brass, copper, glass:1.6), (whimsical and industrial atmosphere:1.5)",
    width: 2160,
    height: 3840,
    seed: Math.floor(Math.random() * 1000000),
  },
  // ... more image configurations
];


imageConfigs.forEach(config => generateAndPostImage(config)); // Pass each config to the function


// const options = {
//   method: "POST",
//   url: "http://localhost:8090/api/v1/hf", // Added http://
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     name: "cyberpunk_alley",
//     prompt: `(photorealistic:1.6), (ultra-detailed:1.6), cinematic lighting, 8k, Unreal Engine 5, (dark cyberpunk alleyway:1.8), (rainy night, neon signs reflecting on wet surfaces:1.7), (holographic advertisements, flickering lights:1.6), (gritty urban environment, graffiti on walls:1.5), (steamy air, dim light from hidden bars:1.4), (atmospheric depth of field, blurred background details:1.3), (diverse characters in futuristic clothing, some interacting:1.7), (subtle motion blur on passing hovercars, reflections of neon lights:1.2), (cool blue and purple light, rain dripping, puddles reflecting the city:1.5), (ambient occlusion shadows, realistic textures: wet concrete, shiny metal, damp clothing:1.5), (1 woman with cybernetic enhancements:1.8), (naturalistic facial features, determined expression:1.7) <lora:cyberpunk_v1:0.5>, (glowing cybernetic implants, stylish haircut:1.6), (wearing a futuristic jacket, high-tech boots:1.5), (leaning against a wall, looking at the camera:1.4), (confident pose, slightly angled, engaging the viewer:1.3), (short colorful hair, wet and slightly messy:1.2), (Leica Summilux lens bokeh, soft focus on background details:1.4), (film grain:1.0), (subtle chromatic aberration), (Arri Alexa color grading, cool color palette with pops of neon:1.3), (ambient sounds faintly implied: rain, city noise, distant music, electronic hum:1.6)

// Negative prompt: (cartoonish:1.7), 3D render, anime, (flat lighting:1.6), (oversaturated:1.5), plastic texture, (mismatched proportions:1.6), (tiling:1.5), (muted colors:1.5), (poor depth:1.6), (unnatural skin tones:1.7), (cloned faces:1.6), (muddy textures:1.6), (oversharpened:1.4), (lack of ambient occlusion:1.5), (floating objects:1.6), (unnatural poses:1.7), (bad anatomy, poorly drawn hands, extra limbs, mutated features:1.8), (child, little girl, young girl:1.9), (bright sunlight:1.8)`,
//     width: 1980,
//     height: 1080,
//     seed: 2323523253, // Changed seed
//   }),
// };

// request(options, function (error, response) {
//   if (error) {
//     console.error("Error:", error); // Use console.error for errors
//     return; // Stop execution to prevent further errors
//   }
//   if (response.statusCode !== 200) {
//     // Check for non-200 status codes
//     console.error(
//       "Status Code Error:",
//       response.statusCode,
//       response.statusMessage
//     );
//     console.error("Response Body:", response.body); // Log the response body for debugging
//     return;
//   }
//   console.log("Response Body:", response.body); //  Log the response body for debugging
// });
