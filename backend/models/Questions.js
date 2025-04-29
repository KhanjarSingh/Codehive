import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  }
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;  // Default export
