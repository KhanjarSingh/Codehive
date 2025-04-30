import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleQuestion = () => {
  const { questionId } = useParams(); // This must match your route
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!questionId) {
      setError("Invalid Question ID");
      setLoading(false);
      return;
    }

    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/questions/${questionId}`);
        setQuestion(res.data);
      } catch (err) {
        setError("Error fetching question");
        console.log(err)

      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!question) return <p>No question found.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{question.title}</h2>
      <p><strong>Description:</strong> {question.snippet}</p>
      <p><strong>Tags:</strong> {question.tags?.join(', ')}</p>
      <p><strong>Posted By:</strong> {question.user}</p>
      <p><strong>Time:</strong> {new Date(question.time).toLocaleString()}</p>
    </div>
  );
};

export default SingleQuestion;
