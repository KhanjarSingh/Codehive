import Image from '../../assets/1724597105533.jpeg'

export default function AboutPage() {
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
        About Codehive
      </h1>

      <div
        className="about-section"
        style={{
          marginBottom: "40px",
          padding: "40px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#333", textAlign: "center" }}>Our Mission</h2>
        <p style={{ color: "#555", lineHeight: "1.6", fontSize: "1.1rem" }}>
          Codehive is a simplified Q&A platform for developers to ask and answer coding questions. Our mission is to
          build a community where programmers can learn, share their knowledge, and advance their careers by helping
          others solve coding challenges.
        </p>
      </div>

      <div
        className="about-section"
        style={{
          marginBottom: "40px",
          padding: "40px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#333", textAlign: "center" }}>What We Offer</h2>
        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            className="feature-card"
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#007bff" }}>Code-Focused</h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Our platform is designed specifically for programmers, with features that make it easy to share and
              discuss code.
            </p>
          </div>
          <div
            className="feature-card"
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#007bff" }}>Community-Driven</h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Our platform thrives on the contributions of developers from all backgrounds, creating a diverse knowledge
              base.
            </p>
          </div>
          <div
            className="feature-card"
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#007bff" }}>Knowledge Repository</h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Every question and answer becomes part of a searchable knowledge base that benefits developers worldwide.
            </p>
          </div>
        </div>
      </div>

      <div
        className="about-section"
        style={{
          marginBottom: "40px",
          padding: "40px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#333", textAlign: "center" }}>Our Team</h2>
        <div
          className="team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            className="team-member"
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="member-avatar"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                margin: "0 auto 15px",
              }}
            >
              <img
                src={Image}
                alt="Parth Tandalwade"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#007bff" }}>Parth Tandalwade</h3>
            <p className="member-role" style={{ fontSize: "1rem", color: "#555", marginBottom: "10px" }}>
              Founder & Developer
            </p>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Full-stack developer with a passion for building community platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}