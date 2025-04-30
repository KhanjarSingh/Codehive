import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import Question from './models/Questions.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection error ❌", err));


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});


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
// Get a single question by ID
app.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(question);
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    res.status(500).json({ error: "Failed to fetch the question" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
