import React, { useState } from "react";
import Upload from "./Upload";
import Result from "./Result";

const Home = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <h1>AI Document Analyzer</h1>
      <Upload setResult={setResult} />
      {result && <Result result={result} />}
    </div>
  );
};

export default Home;
