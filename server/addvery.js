import request from "request";

const options = {
  method: "POST",
  url: "http://localhost:8090/api/v1/hf", // Added http://
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "cyberpunk_alley",
    prompt: `(photorealistic:1.6), (ultra-detailed:1.6), cinematic lighting, 8k, Unreal Engine 5, (dark cyberpunk alleyway:1.8), (rainy night, neon signs reflecting on wet surfaces:1.7), (holographic advertisements, flickering lights:1.6), (gritty urban environment, graffiti on walls:1.5), (steamy air, dim light from hidden bars:1.4), (atmospheric depth of field, blurred background details:1.3), (diverse characters in futuristic clothing, some interacting:1.7), (subtle motion blur on passing hovercars, reflections of neon lights:1.2), (cool blue and purple light, rain dripping, puddles reflecting the city:1.5), (ambient occlusion shadows, realistic textures: wet concrete, shiny metal, damp clothing:1.5), (1 woman with cybernetic enhancements:1.8), (naturalistic facial features, determined expression:1.7) <lora:cyberpunk_v1:0.5>, (glowing cybernetic implants, stylish haircut:1.6), (wearing a futuristic jacket, high-tech boots:1.5), (leaning against a wall, looking at the camera:1.4), (confident pose, slightly angled, engaging the viewer:1.3), (short colorful hair, wet and slightly messy:1.2), (Leica Summilux lens bokeh, soft focus on background details:1.4), (film grain:1.0), (subtle chromatic aberration), (Arri Alexa color grading, cool color palette with pops of neon:1.3), (ambient sounds faintly implied: rain, city noise, distant music, electronic hum:1.6)

Negative prompt: (cartoonish:1.7), 3D render, anime, (flat lighting:1.6), (oversaturated:1.5), plastic texture, (mismatched proportions:1.6), (tiling:1.5), (muted colors:1.5), (poor depth:1.6), (unnatural skin tones:1.7), (cloned faces:1.6), (muddy textures:1.6), (oversharpened:1.4), (lack of ambient occlusion:1.5), (floating objects:1.6), (unnatural poses:1.7), (bad anatomy, poorly drawn hands, extra limbs, mutated features:1.8), (child, little girl, young girl:1.9), (bright sunlight:1.8)`,
    width: 1980,
    height: 1080,
    seed: 2323523253, // Changed seed
  }),
};

request(options, function (error, response) {
  if (error) {
    console.error("Error:", error); // Use console.error for errors
    return; // Stop execution to prevent further errors
  }
  if (response.statusCode !== 200) {
    // Check for non-200 status codes
    console.error(
      "Status Code Error:",
      response.statusCode,
      response.statusMessage
    );
    console.error("Response Body:", response.body); // Log the response body for debugging
    return;
  }
  console.log("Response Body:", response.body); //  Log the response body for debugging
});
