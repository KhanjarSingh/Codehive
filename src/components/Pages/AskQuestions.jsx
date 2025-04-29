import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AskQuestion() {
  const [title, setTitle] = useState("")
  const [snippet, setSnippet] = useState("")
  const [tags, setTags] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!title.trim() || !snippet.trim() || !tags.trim()) {
      setError("Please fill in all fields")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      const newQuestion = {
        title,
        snippet,
        tags: tags.split(",").map((tag) => tag.trim()), // split tags into array
        user: "Anonymous",
        time: new Date().toISOString(), // send correct ISO time format
      }

      await axios.post("http://localhost:3000/questions", newQuestion)

      // Show success message
      alert("Question submitted successfully!")
      navigate("/") // redirect back to Home
    } catch (err) {
      console.error("Error submitting question:", err)
      setError(err.response?.data?.error || "Failed to submit question. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <h1 className="title">Ask a New Question</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="ask-question-form">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Question Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to center a div with CSS?"
              className="input-field"
              required
            />
            <small>Be specific and imagine you're asking a question to another person</small>
          </div>

          <div className="input-group">
            <label htmlFor="snippet">Question Details:</label>
            <textarea
              id="snippet"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              placeholder="Provide all the details someone would need to answer your question..."
              rows="8"
              className="input-field"
              required
            />
            <small>Include all necessary information for others to understand your question</small>
          </div>

          <div className="input-group">
            <label htmlFor="tags">Tags (comma separated):</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. javascript, react, css"
              className="input-field"
              required
            />
            <small>Add up to 5 tags to describe what your question is about</small>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Post Question"}
          </button>
        </form>
      </div>

      <div className="question-tips">
        <h3>Tips for getting good answers:</h3>
        <ul>
          <li>Make sure your question is clear and concise</li>
          <li>Provide all necessary details and context</li>
          <li>Check for grammar and spelling errors</li>
          <li>Add relevant code snippets if applicable</li>
        </ul>
      </div>
    </div>
  )
}

export default AskQuestion
