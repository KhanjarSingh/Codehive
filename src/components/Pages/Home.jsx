"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function Home() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const res = await axios.get("http://localhost:3000/questions")
        setQuestions(res.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching questions:", err)
        setError("Failed to load questions. Please try again.")
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="container">
      <div className="home-header">
        <h1 className="title" style={{textAlign:"center"}}>All Questions</h1>
        <br/>
        <Link to="/ask" className="ask-btn">
          Ask a Question
        </Link>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading questions...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && questions.length === 0 && (
        <div className="empty-state">
          <h3>No questions available yet.</h3>
          <p>Be the first to ask a question!</p>
          <Link to="/ask" className="ask-btn">
            Ask a Question
          </Link>
        </div>
      )}

      {!loading && !error && questions.length > 0 && (
        <ul className="question-list">
          {questions.map((q) => (
            <li key={q._id} className="question-item">
              <h3>
                <Link to={`/question/${q._id}`}>{q.title}</Link>
              </h3>
              <p className="question-snippet">{q.snippet}</p>
              <div className="question-tags">
                {q.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="question-meta">
                <span className="question-user">Asked by {q.user}</span>
                <span className="question-time">on {formatDate(q.time)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
