export default function AboutPage() {
  return (
    <div className="container">
      <h1 className="title">About Codehive</h1>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          Codehive is a simplified Q&A platform for developers to ask and answer coding questions. Our mission is to
          build a community where programmers can learn, share their knowledge, and advance their careers by helping
          others solve coding challenges.
        </p>
      </div>

      <div className="about-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Code-Focused</h3>
            <p>
              Our platform is designed specifically for programmers, with features that make it easy to share and
              discuss code.
            </p>
          </div>
          <div className="feature-card">
            <h3>Community-Driven</h3>
            <p>
              Our platform thrives on the contributions of developers from all backgrounds, creating a diverse knowledge
              base.
            </p>
          </div>
          <div className="feature-card">
            <h3>Knowledge Repository</h3>
            <p>
              Every question and answer becomes part of a searchable knowledge base that benefits developers worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar"></div>
            <h3>John Doe</h3>
            <p className="member-role">Founder & Developer</p>
            <p>Full-stack developer with a passion for building community platforms.</p>
          </div>
          <div className="team-member">
            <div className="member-avatar"></div>
            <h3>Jane Smith</h3>
            <p className="member-role">Lead Designer</p>
            <p>UX/UI designer focused on creating intuitive user experiences.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
