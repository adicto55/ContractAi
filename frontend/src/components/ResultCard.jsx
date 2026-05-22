import React from "react";

const ResultCard = ({ data }) => {
  return (
    <div className="card">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ResultCard;