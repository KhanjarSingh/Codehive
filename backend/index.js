import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import Question from './models/Questions.js'; // Correct import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection error ❌", err));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Get all questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Post a new question
app.post('/questions', async (req, res) => {
  try {
    const { title, snippet, tags, user, time } = req.body;

    if (!title || !snippet || !tags || !user || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newQuestion = new Question({
      title,
      snippet,
      tags,
      user,
      time,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error adding question:", error.message, error.stack);
    res.status(500).json({ error: error.message || 'Failed to add question' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
