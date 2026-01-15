import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, Eye, MessageSquare } from "lucide-react";
import Stats from "../Stats";
import API_BASE_URL from "../../api";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [sortBy]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const sortParam = sortBy === "newest" ? "" : `?sort=${sortBy}`;
      const res = await axios.get(`${API_BASE_URL}/questions${sortParam}`);
      setAllQuestions(res.data);
      setQuestions(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch questions.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = allQuestions.filter((q) =>
      q.title.toLowerCase().includes(term.toLowerCase()) ||
      q.snippet.toLowerCase().includes(term.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase()))
    );

    setQuestions(filtered);
  };

  const handleVote = async (id, type) => {
    try {
      await axios.post(`${API_BASE_URL}/questions/${id}/vote`, { type });
      fetchQuestions();
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const totalAnswers = allQuestions.reduce((sum, q) => sum + (q.answers?.length || 0), 0);
  const totalViews = allQuestions.reduce((sum, q) => sum + (q.views || 0), 0);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Community Questions</h1>
        <Link to="/ask">
          <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}>
            + Ask Question
          </button>
        </Link>
      </div>

      {!loading && <Stats totalQuestions={allQuestions.length} totalAnswers={totalAnswers} totalViews={totalViews} />}

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "stretch" }}>
        <input type="text" placeholder="Search questions..." value={searchTerm} onChange={handleSearch}
          style={{ flex: 1, minWidth: "250px", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "1rem" }} />
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "10px 15px", border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer", fontSize: "1rem", backgroundColor: "#fff", minWidth: "150px" }}>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="views">Most Viewed</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ display: "inline-block", width: "40px", height: "40px", border: "4px solid #f3f3f3", borderTop: "4px solid #007bff", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : questions.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No questions found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {questions.map((question) => (
            <div key={question._id}
              style={{ display: "flex", gap: "15px", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#fff", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)"}>
              
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", minWidth: "50px" }}>
                <button onClick={() => handleVote(question._id, 'up')}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "5px", color: "#666" }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#666"}>
                  <ArrowUp size={20} />
                </button>
                <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{question.votes || 0}</span>
                <button onClick={() => handleVote(question._id, 'down')}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "5px", color: "#666" }}
                  onMouseOver={(e) => e.target.style.color = "#ff4444"}
                  onMouseOut={(e) => e.target.style.color = "#666"}>
                  <ArrowDown size={20} />
                </button>
              </div>

              <div style={{ flex: 1 }}>
                <Link to={`/question/${question._id}`} style={{ textDecoration: "none", color: "#007bff", fontSize: "1.2rem", fontWeight: "500" }}
                  onMouseOver={(e) => e.target.style.textDecoration = "underline"}
                  onMouseOut={(e) => e.target.style.textDecoration = "none"}>
                  {question.title}
                </Link>
                <p style={{ margin: "10px 0", color: "#555", lineHeight: "1.5" }}>{question.snippet.substring(0, 200)}{question.snippet.length > 200 ? "..." : ""}</p>
                
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
                  {question.tags.map((tag, index) => (
                    <span key={index} style={{ backgroundColor: "#e8f4f8", color: "#007bff", borderRadius: "4px", padding: "4px 10px", fontSize: "0.85rem", fontWeight: "500" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "15px", fontSize: "0.9rem", color: "#666", alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Eye size={16} /> {question.views || 0} views
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <MessageSquare size={16} /> {question.answers?.length || 0} answers
                  </span>
                  <span>asked by <strong>{question.user}</strong> {formatTime(question.time)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;