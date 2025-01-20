const express = require('express');
const mongoose = require('mongoose');
const Pollinations = require('pollinations');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/imaginapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  name: String,
  prompt: String,
  photo: String,
});

const Post = mongoose.model('Post', postSchema);

app.get('/fetch-image', async (req, res) => {
  const { prompt, width, height, model, seed } = req.query;

  try {
    const imageUrl = await Pollinations.generateImage(prompt, {
      width: parseInt(width),
      height: parseInt(height),
      model,
      seed: parseInt(seed),
    });

    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image from Pollinations API' });
  }
});

app.post('/store-data', async (req, res) => {
  const { name, prompt, photo } = req.body;

  try {
    const newPost = new Post({ name, prompt, photo });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to store data in MongoDB' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
