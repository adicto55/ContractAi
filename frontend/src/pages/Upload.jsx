import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loader from "../components/Loader";
import { uploadFile } from "../services/fileService";

const Upload = ({ setResult }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const data = await uploadFile(file);
      setResult(data);
    } catch (err) {
      alert("Ошибка загрузки");
    }
    setLoading(false);
  };

  return (
    <div>
      <FileUploader onUpload={handleUpload} />
      {loading && <Loader />}
    </div>
  );
};

export default Upload;
