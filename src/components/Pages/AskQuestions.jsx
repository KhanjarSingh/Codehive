import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


function AskQuestion() {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title.trim() || !snippet.trim() || !tags.trim()) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const newQuestion = {
        title,
        snippet,
        tags: tags.split(",").map((tag) => tag.trim()),
        user: "Anonymous",
        time: new Date().toISOString(),
      };

      await axios.post("http://localhost:3000/questions", newQuestion);
      alert("Question submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error submitting question:", err);
      toast.error("Failed to submit question. Please try again.");
      setError(err.response?.data?.error || "Failed to submit question. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: "20px", margin: "0 auto" }}>
      <h1
        className="title"
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "30px",
          color: "#007bff",
        }}
      >
        Ask a New Question
      </h1>
      <Toaster position="top-right" reverseOrder={false} />
      {error && (
        <div
          className="error-message"
          style={{
            color: "red",
            backgroundColor: "#ffe6e6",
            padding: "15px",
            borderRadius: "6px",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <div
        className="ask-question-form"
        style={{
          backgroundColor: "#f9f9f9",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="title"
              style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}
            >
              Question Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to center a div with CSS?"
              className="input-field"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              required
            />
            <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
              Be specific and imagine you're asking a question to another person
            </small>
          </div>

          <div className="input-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="snippet"
              style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}
            >
              Question Details:
            </label>
            <textarea
              id="snippet"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              placeholder="Provide all the details someone would need to answer your question..."
              rows="10"
              className="input-field"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              required
            />
            <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
              Include all necessary information for others to understand your question
            </small>
          </div>

          <div className="input-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="tags"
              style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}
            >
              Tags (comma separated):
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. javascript, react, css"
              className="input-field"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              required
            />
            <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
              Add up to 5 tags to describe what your question is about
            </small>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            style={{
              padding: "12px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
              fontSize: "1rem",
            }}
          >
            {isSubmitting ? "Submitting..." : "Post Question"}
          </button>
        </form>
      </div>

      <div className="question-tips" style={{ marginTop: "30px", textAlign: "left" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "15px" }}>
          Tips for getting good answers:
        </h3>
        <ul style={{ listStyle: "disc", paddingLeft: "25px", color: "#555", lineHeight: "1.6" }}>
          <li>Make sure your question is clear and concise</li>
          <li>Provide all necessary details and context</li>
          <li>Check for grammar and spelling errors</li>
          <li>Add relevant code snippets if applicable</li>
        </ul>
      </div>
    </div>
  );
}

export default AskQuestion;