import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        required
      />
    </div>
  );

  return (
    <div className="page page-sm">
      <div className="section-header">
        <h2 className="section-title">Get in touch</h2>
        <p className="section-sub">
          Have a question, feature request, or want to discuss enterprise plans? We'd love to hear from you.
        </p>
      </div>

      {sent ? (
        <div className="card" style={{ textAlign: "center", padding: "52px 32px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, marginBottom: 10, color: "var(--text)" }}>
            Message sent!
          </div>
          <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>
            We'll get back to you at {form.email} within 24 hours.
          </div>
          <button className="btn btn-outline" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
            Send another
          </button>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              {field("name", "Your name", "text", "Jane Smith")}
              {field("email", "Email address", "email", "jane@company.com")}
            </div>
            {field("subject", "Subject", "text", "Enterprise plan inquiry")}
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="Tell us what you're working on…"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Send message →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}