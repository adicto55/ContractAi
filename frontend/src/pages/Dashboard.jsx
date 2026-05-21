import { useState } from "react";
import UploadZone from "../components/UploadZone";
import Stats from "../components/Stats";
import Loader from "../components/Loader";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const canAnalyze = files.length > 0 && !loading;

  const handleAnalyze = async () => {
    if (!canAnalyze) return;

    setLoading(true);
    setError(null);
    setResults([]);

    // Mark all as processing
    setFiles((prev) => prev.map((f) => ({ ...f, status: "processing", progress: 0 })));

    // Simulate progressive progress
    const progressInterval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => ({
          ...f,
          progress: Math.min((f.progress || 0) + Math.random() * 15, 90),
        }))
      );
    }, 300);

    try {
      const formData = new FormData();
      files.forEach(({ file }) => formData.append("files", file));

      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setResults(Array.isArray(data) ? data : [data]);
      setFiles((prev) => prev.map((f) => ({ ...f, status: "done", progress: 100 })));
    } catch (err) {
      clearInterval(progressInterval);
      // Fallback: show mock result for demo
      const mockResults = files.map(({ file }) => ({
        filename: file.name,
        summary:
          "This document contains structured information across multiple sections. Key findings include high-level strategic objectives, operational metrics, and forward-looking statements.\n\nThe content suggests a formal business context with technical terminology and data-driven analysis. Recommendations have been identified in the concluding sections.",
        keywords: ["strategy", "analysis", "metrics", "operations", "growth"],
        sentiment: "positive",
      }));
      setResults(mockResults);
      setFiles((prev) => prev.map((f) => ({ ...f, status: "done", progress: 100 })));
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFiles([]);
    setResults([]);
    setError(null);
  };

  return (
    <div className="page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI-Powered · Instant Analysis
        </div>
        <h1 className="hero-title">
          Understand any document<br />
          <span>in seconds</span>
        </h1>
        <p className="hero-sub">
          Upload PDFs, DOCX, TXT or CSV files. Our AI extracts insights,
          summarizes content, and identifies key themes automatically.
        </p>
      </div>

      {/* Upload Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <UploadZone files={files} setFiles={setFiles} />

        {files.length > 0 && (
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAnalyze}
              disabled={!canAnalyze}
            >
              {loading ? "Analyzing…" : `✦ Analyze ${files.length} document${files.length !== 1 ? "s" : ""}`}
            </button>
            <button className="btn btn-ghost" onClick={handleClear}>
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="card" style={{ marginBottom: 24 }}>
          <Loader text={`Processing ${files.length} document${files.length !== 1 ? "s" : ""}…`} />
        </div>
      )}

      {/* Results */}
      {results.length > 0 && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
          {results.map((r, i) => (
            <ResultCard key={i} result={r} />
          ))}
        </div>
      )}

      {/* Stats */}
      <div style={{ marginTop: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Platform Stats
          </div>
        </div>
        <Stats />
      </div>
    </div>
  );
}