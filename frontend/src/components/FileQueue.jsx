import { useState, useEffect } from "react";

export default function FileQueue() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 5 : 100));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h3>Processing Queue</h3>

      <div className="progressBar">
        <div style={{ width: `${progress}%` }}></div>
      </div>

      <p>Status: Processing documents...</p>
    </div>
  );
}