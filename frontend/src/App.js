import { useState } from "react";
import "./styles/main.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    if (page === "about") return <About />;
    if (page === "contact") return <Contact />;
    return <Dashboard />;
  };

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <footer>
        <div className="footer">
          <span className="footer-text">© 2026 DocAI. All rights reserved.</span>
          <nav className="footer-links">
            <a className="footer-link" href="#privacy">Privacy</a>
            <a className="footer-link" href="#terms">Terms</a>
            <a className="footer-link" href="#docs">API docs</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}