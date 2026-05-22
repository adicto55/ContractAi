const STATS = [
  { label: "Pages Processed", value: "12,430", trend: "+8% this week" },
  { label: "Avg. Speed", value: "1.2s", trend: "per document" },
  { label: "Accuracy Rate", value: "98.4%", trend: "↑ 0.3% vs last month" },
  { label: "Storage Used", value: "2.4 GB", trend: "of 10 GB plan" },
];

export default function Stats() {
  return (
    <div className="stats-grid">
      {STATS.map((s) => (
        <div key={s.label} className="stat-card animate-in">
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
          <div className="stat-trend">{s.trend}</div>
        </div>
      ))}
    </div>
  );
}