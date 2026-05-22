const FEATURES = [
  {
    icon: "⚡",
    title: "Instant processing",
    desc: "Average analysis completes in under 1.2 seconds per document, regardless of size or complexity.",
  },
  {
    icon: "🔐",
    title: "Secure by default",
    desc: "Documents are processed in isolated sandboxes and never stored permanently without your consent.",
  },
  {
    icon: "🧠",
    title: "AI-powered insights",
    desc: "Powered by large language models to extract summaries, sentiment, keywords, and actionable insights.",
  },
  {
    icon: "📊",
    title: "Batch processing",
    desc: "Upload and analyze dozens of documents simultaneously with a unified results dashboard.",
  },
  {
    icon: "🌐",
    title: "Multiple formats",
    desc: "Supports PDF, DOCX, TXT, CSV — with more formats being added regularly.",
  },
  {
    icon: "🔗",
    title: "API access",
    desc: "Integrate document analysis directly into your existing workflows via our REST API.",
  },
];

export default function About() {
  return (
    <div className="page">
      <div className="section-header">
        <h2 className="section-title">
          Built for document-heavy<br />workflows
        </h2>
        <p className="section-sub" style={{ maxWidth: 520 }}>
          DocAI is a platform designed to help individuals and teams process large volumes of
          documents without the manual effort — extracting what matters, fast.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card animate-in">
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="divider" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        {[
          { label: "Documents analyzed", value: "2" },
          { label: "Active users", value: "1" },
          { label: "Languages supported", value: "0" },
          { label: "Uptime SLA", value: "?" },
        ].map((s) => (
          <div key={s.label} className="stat-card" style={{ textAlign: "center" }}>
            <div className="stat-value" style={{ fontSize: 36, marginBottom: 6 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}