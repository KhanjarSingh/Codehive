import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";




const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/questions");
        setAllQuestions(res.data);
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch questions.");
        console.log(err)
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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

  return (
    <div className="container" style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem" }}>Community Questions</h1>
        <Link to="/ask">
          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            + Ask Question
          </button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />

      {loading ? (
        <p>Loading questions...</p>
      ) : error ? (
        <p>{error}</p>
      ) : questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {questions.map((question) => (
            <li
              key={question.id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9"
              }}
            >
              <Link to={`/question/${question.id}`} style={{ textDecoration: "none", color: "#333" }}>
                <h3 style={{ marginBottom: "5px" }}>{question.title}</h3>
              </Link>
              <p style={{ marginBottom: "8px" }}>{question.snippet}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {question.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#e0e0e0",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "0.9rem"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
