import React from "react";

export default function ResultCard({ result }) {
  if (!result) return null;

  const { filename, summary, risks, obligations, red_flags } = result;

  return (
    <div className="result-card animate-in">
      <div className="result-header">
        <div className="result-title">✦ Analysis — {filename}</div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="result-body">
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Summary</div>
          <p>{summary}</p>
        </div>
      )}

      {/* Red Flags */}
      {red_flags?.length > 0 && (
        <div style={{ padding: "0 24px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--danger)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Red Flags</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {red_flags.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
                <span style={{ color: "var(--danger)", flexShrink: 0 }}>⚠</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks */}
      {risks?.length > 0 && (
        <div style={{ padding: "0 24px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--warning)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Risks</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {risks.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
                <span style={{ color: "var(--warning)", flexShrink: 0 }}>▲</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Obligations */}
      {obligations?.length > 0 && (
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--success)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Obligations</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {obligations.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
                <span style={{ color: "var(--success)", flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}