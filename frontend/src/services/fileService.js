import BASE_URL from "./api";

export const analyzeFiles = async (files) => {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));

  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(`Server error: ${response.status}`);
  return response.json();
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
  return response.json();
};