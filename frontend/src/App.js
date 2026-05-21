import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
export default function App() {
  return (
    <div className="container">
      <h1>AI Document Analyzer</h1>

      <div className="card">
        <div className="upload-box">
          📄 Drop your file here or click to upload
        </div>

        <button className="button">
          Analyze Document
        </button>

        <div className="result">
          AI result will appear here...
        </div>
      </div>
    </div>
  );
}