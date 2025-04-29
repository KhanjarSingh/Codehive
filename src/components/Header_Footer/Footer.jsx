import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer>
      <div className="container footer-container">
        <p className="copyright">© {new Date().getFullYear()} Codehive. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/KhanjarSingh" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/parth-tandalwade-295882323/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
