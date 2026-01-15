import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { HelpCircle, Tag, FileText, User } from "lucide-react";
import API_BASE_URL from "../../api";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [tags, setTags] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !snippet.trim() || !tags.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const newQuestion = {
        title,
        snippet,
        tags: tags.split(",").map((tag) => tag.trim()),
        user: userName.trim() || "Anonymous",
        time: new Date().toISOString(),
      };

      await axios.post(`${API_BASE_URL}/questions`, newQuestion);
      toast.success("Question submitted successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Error submitting question:", err);
      toast.error("Failed to submit question. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Toaster position="top-right" reverseOrder={false} />
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#333" }}>
          Ask a Question
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>
          Get help from the community by asking your coding questions
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", border: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "1.1rem", marginBottom: "10px", color: "#333" }}>
                <User size={20} color="#007bff" />
                Your Name (Optional)
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name or leave blank for Anonymous"
                style={{ width: "100%", padding: "12px 15px", border: "2px solid #e0e0e0", borderRadius: "6px", fontSize: "1rem", transition: "border 0.2s" }}
                onFocus={(e) => e.target.style.borderColor = "#007bff"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              />
              <small style={{ color: "#666", marginTop: "6px", display: "block" }}>
                Leave blank to post as Anonymous
              </small>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "1.1rem", marginBottom: "10px", color: "#333" }}>
                <HelpCircle size={20} color="#007bff" />
                Question Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to center a div with CSS?"
                style={{ width: "100%", padding: "12px 15px", border: "2px solid #e0e0e0", borderRadius: "6px", fontSize: "1rem", transition: "border 0.2s" }}
                onFocus={(e) => e.target.style.borderColor = "#007bff"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                required
              />
              <small style={{ color: "#666", marginTop: "6px", display: "block" }}>
                Be specific and imagine you're asking a question to another person
              </small>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "1.1rem", marginBottom: "10px", color: "#333" }}>
                <FileText size={20} color="#007bff" />
                Question Details
              </label>
              <textarea
                value={snippet}
                onChange={(e) => setSnippet(e.target.value)}
                placeholder="Provide all the details about your question. Include what you've tried and what you're expecting..."
                rows="12"
                style={{ width: "100%", padding: "12px 15px", border: "2px solid #e0e0e0", borderRadius: "6px", fontSize: "1rem", lineHeight: "1.6", resize: "vertical", transition: "border 0.2s" }}
                onFocus={(e) => e.target.style.borderColor = "#007bff"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                required
              />
              <small style={{ color: "#666", marginTop: "6px", display: "block" }}>
                Include all necessary information for others to understand your question
              </small>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", fontSize: "1.1rem", marginBottom: "10px", color: "#333" }}>
                <Tag size={20} color="#007bff" />
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="javascript, react, css"
                style={{ width: "100%", padding: "12px 15px", border: "2px solid #e0e0e0", borderRadius: "6px", fontSize: "1rem", transition: "border 0.2s" }}
                onFocus={(e) => e.target.style.borderColor = "#007bff"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                required
              />
              <small style={{ color: "#666", marginTop: "6px", display: "block" }}>
                Add up to 5 tags separated by commas to describe what your question is about
              </small>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ padding: "14px 30px", backgroundColor: isSubmitting ? "#ccc" : "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: isSubmitting ? "not-allowed" : "pointer", fontWeight: "600", fontSize: "1.1rem", width: "100%", transition: "all 0.2s" }}
              onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = "#007bff")}
            >
              {isSubmitting ? "Posting Question..." : "Post Your Question"}
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: "#f8f9fa", padding: "25px", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "15px", color: "#333" }}>
            💡 Tips for Getting Great Answers
          </h3>
          <ul style={{ listStyle: "none", padding: 0, color: "#555", lineHeight: "1.8" }}>
            <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
              <span style={{ position: "absolute", left: 0 }}>✓</span>
              Make your question title clear and specific
            </li>
            <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
              <span style={{ position: "absolute", left: 0 }}>✓</span>
              Provide context and what you've already tried
            </li>
            <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
              <span style={{ position: "absolute", left: 0 }}>✓</span>
              Include relevant code snippets if applicable
            </li>
            <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
              <span style={{ position: "absolute", left: 0 }}>✓</span>
              Use proper grammar and formatting
            </li>
            <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
              <span style={{ position: "absolute", left: 0 }}>✓</span>
              Add relevant tags to reach the right audience
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;