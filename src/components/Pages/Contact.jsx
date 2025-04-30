"use client"

import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container" style={{ padding: "20px", margin: "0 auto" }}>
      <h1 className="title" style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "30px" }}>
        Contact Us
      </h1>

      <div
        className="contact-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="contact-info" style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#007bff" }}>Get in Touch</h2>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            We'd love to hear from you. Reach us at:
          </p>

          <div className="contact-details" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div className="contact-item">
              <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>Email</h3>
              <p style={{ color: "#333" }}>parth.k@adypu.edu.in</p>
            </div>

            <div className="contact-item">
              <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>Social Media</h3>
              <p style={{ color: "#333" }}>Twitter: <spam><a href="https://x.com/Parth_00007" target="_blank">Parth</a></spam></p>
              <p style={{ color: "#333" }}>GitHub: <spam><a href="https://github.com/KhanjarSingh" target="_blank">KhanjarSingh</a></spam></p>
              <p style={{ color: "#333" }}>Linkedin: <spam><a href="https://www.linkedin.com/in/parth-tandalwade-295882323/" target="_blank">Parth Tandalwade</a></spam></p>
            
            </div>

          </div>
        </div>

        <div className="contact-form-container">
          {submitted ? (
            <div
              className="success-message"
              style={{
                textAlign: "center",
                backgroundColor: "#e6ffe6",
                padding: "20px",
                borderRadius: "6px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ fontSize: "1.5rem", color: "#28a745", marginBottom: "10px" }}>Message Sent!</h3>
              <p style={{ color: "#555", marginBottom: "20px" }}>
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="primary-btn"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#007bff" }}>
                Send us a Message
              </h2>
              <form
                onSubmit={handleSubmit}
                className="contact-form"
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <div className="input-group">
                  <label
                    htmlFor="name"
                    style={{ fontWeight: "bold", display: "block", marginBottom: "8px", color: "#333" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                    }}
                  />
                </div>

                <div className="input-group">
                  <label
                    htmlFor="email"
                    style={{ fontWeight: "bold", display: "block", marginBottom: "8px", color: "#333" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                    }}
                  />
                </div>

                <div className="input-group">
                  <label
                    htmlFor="message"
                    style={{ fontWeight: "bold", display: "block", marginBottom: "8px", color: "#333" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="input-field"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                    }}
                  ></textarea>
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
                    fontSize: "1rem",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}