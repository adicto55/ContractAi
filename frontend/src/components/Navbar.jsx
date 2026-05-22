export default function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">
      <a className="navbar-logo" href="#" onClick={() => setPage("dashboard")}>
        <div className="navbar-logo-icon">⬡</div>
        DocAI
      </a>

      <div className="nav-links">
        <button
          className={`nav-btn ${page === "dashboard" ? "active" : ""}`}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${page === "about" ? "active" : ""}`}
          onClick={() => setPage("about")}
        >
          About
        </button>
        <button
          className={`nav-btn ${page === "contact" ? "active" : ""}`}
          onClick={() => setPage("contact")}
        >
          Contact
        </button>
        <button className="nav-cta" onClick={() => setPage("dashboard")}>
          Get started →
        </button>
      </div>
    </nav>
  );
}