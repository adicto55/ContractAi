import React from "react";
import ResultCard from "../components/ResultCard";

const Result = ({ result }) => {
  return (
    <div>
      <h2>Результат анализа:</h2>
      <ResultCard data={result} />
    </div>
  );
};

export default Result;