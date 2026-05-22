import React from "react";

const FileUploader = ({ onUpload }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default FileUploader;