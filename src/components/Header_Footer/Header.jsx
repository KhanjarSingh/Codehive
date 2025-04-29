import { NavLink } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <div className="container header-container">
        <div className="logo">
          <NavLink to="/">Codehive</NavLink>
        </div>
        <nav>
          <ul className="nav-menu">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/ask" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Ask
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
