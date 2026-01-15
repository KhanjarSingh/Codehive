import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowUp, ArrowDown, Eye, Clock, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import API_BASE_URL from '../../api';

const SingleQuestion = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (questionId) fetchQuestion();
  }, [questionId]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/questions/${questionId}`);
      setQuestion(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching question:", err);
      setLoading(false);
    }
  };

  const handleVote = async (type) => {
    try {
      await axios.post(`${API_BASE_URL}/questions/${questionId}/vote`, { type });
      fetchQuestion();
    } catch (err) {
      toast.error("Vote failed");
    }
  };

  const handleAnswerVote = async (answerId, type) => {
    try {
      await axios.post(`${API_BASE_URL}/questions/${questionId}/answers/${answerId}/vote`, { type });
      fetchQuestion();
    } catch (err) {
      toast.error("Vote failed");
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) {
      toast.error("Please write an answer");
      return;
    }

    const userName = prompt("Enter your name (or leave blank for Anonymous):");

    try {
      setSubmitting(true);
      await axios.post(`${API_BASE_URL}/questions/${questionId}/answers`, {
        text: answerText,
        user: userName?.trim() || "Anonymous"
      });
      toast.success("Answer posted successfully!");
      setAnswerText("");
      fetchQuestion();
    } catch (err) {
      toast.error("Failed to post answer");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <div style={{ display: "inline-block", width: "50px", height: "50px", border: "5px solid #f3f3f3", borderTop: "5px solid #007bff", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!question) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>Question not found</h2>
        <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>Go back to home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Toaster position="top-right" />
      
      <Link to="/" style={{ color: "#007bff", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>
        ← Back to questions
      </Link>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <button onClick={() => handleVote('up')}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#666" }}
            onMouseOver={(e) => e.target.style.color = "#007bff"}
            onMouseOut={(e) => e.target.style.color = "#666"}>
            <ArrowUp size={28} />
          </button>
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{question.votes || 0}</span>
          <button onClick={() => handleVote('down')}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#666" }}
            onMouseOver={(e) => e.target.style.color = "#ff4444"}
            onMouseOut={(e) => e.target.style.color = "#666"}>
            <ArrowDown size={28} />
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "15px", color: "#333" }}>{question.title}</h1>
          
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px", fontSize: "0.9rem", color: "#666" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Clock size={16} /> Asked {formatTime(question.time)}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Eye size={16} /> {question.views || 0} views
            </span>
          </div>

          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "20px" }}>
            <p style={{ lineHeight: "1.8", whiteSpace: "pre-wrap", color: "#333" }}>{question.snippet}</p>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
            {question.tags.map((tag, index) => (
              <span key={index} style={{ backgroundColor: "#e8f4f8", color: "#007bff", borderRadius: "4px", padding: "6px 12px", fontSize: "0.9rem", fontWeight: "500" }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "15px", backgroundColor: "#e8f4f8", borderRadius: "6px", width: "fit-content" }}>
            <User size={20} color="#007bff" />
            <span style={{ color: "#555" }}>Asked by <strong>{question.user}</strong></span>
          </div>
        </div>
      </div>

      <hr style={{ margin: "40px 0", border: "none", borderTop: "2px solid #e0e0e0" }} />

      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
        {question.answers?.length || 0} Answer{question.answers?.length !== 1 ? 's' : ''}
      </h2>

      {question.answers && question.answers.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          {question.answers.map((answer) => (
            <div key={answer._id} style={{ display: "flex", gap: "20px", marginBottom: "30px", padding: "20px", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <button onClick={() => handleAnswerVote(answer._id, 'up')}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "5px", color: "#666" }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#666"}>
                  <ArrowUp size={22} />
                </button>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{answer.votes || 0}</span>
                <button onClick={() => handleAnswerVote(answer._id, 'down')}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "5px", color: "#666" }}
                  onMouseOver={(e) => e.target.style.color = "#ff4444"}
                  onMouseOut={(e) => e.target.style.color = "#666"}>
                  <ArrowDown size={22} />
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ lineHeight: "1.8", whiteSpace: "pre-wrap", marginBottom: "15px", color: "#333" }}>{answer.text}</p>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  Answered by <strong>{answer.user}</strong> on {formatTime(answer.time)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "15px" }}>Your Answer</h3>
        <form onSubmit={handleSubmitAnswer}>
          <textarea value={answerText} onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your answer here..."
            rows="8"
            style={{ width: "100%", padding: "15px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "1rem", lineHeight: "1.6" }}
            required
          />
          <button type="submit" disabled={submitting}
            style={{ marginTop: "15px", padding: "12px 24px", backgroundColor: submitting ? "#ccc" : "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: submitting ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "1rem" }}>
            {submitting ? "Posting..." : "Post Your Answer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleQuestion;