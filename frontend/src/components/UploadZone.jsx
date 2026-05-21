import { useState, useRef } from "react";

const FILE_ICONS = {
  pdf: { icon: "📄", cls: "pdf" },
  docx: { icon: "📝", cls: "docx" },
  doc: { icon: "📝", cls: "docx" },
  txt: { icon: "📃", cls: "txt" },
  csv: { icon: "📊", cls: "csv" },
};

function getFileType(name) {
  const ext = name.split(".").pop().toLowerCase();
  return FILE_ICONS[ext] || { icon: "📁", cls: "default" };
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadZone({ files, setFiles }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (incoming) => {
    const list = Array.from(incoming);
    setFiles((prev) => [
      ...prev,
      ...list.map((f) => ({ file: f, id: Date.now() + Math.random(), status: "pending" })),
    ]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <div>
      <div
        className={`upload-zone ${drag ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.csv"
          onChange={(e) => addFiles(e.target.files)}
          style={{ display: "none" }}
        />
        <div className="upload-icon">📂</div>
        <div className="upload-title">Drop documents here</div>
        <div className="upload-sub">or click anywhere to browse files</div>
        <div className="upload-types">
          {["PDF", "DOCX", "TXT", "CSV"].map((t) => (
            <span key={t} className="type-pill">{t}</span>
          ))}
        </div>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          {files.map(({ file, id, status, progress }) => {
            const { icon, cls } = getFileType(file.name);
            return (
              <div key={id} className="file-item animate-in">
                <div className={`file-icon ${cls}`}>{icon}</div>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-meta">{formatSize(file.size)}</div>
                  {status === "processing" && (
                    <div className="progress-wrap" style={{ marginTop: 6 }}>
                      <div className="progress-bar" style={{ width: `${progress || 40}%` }} />
                    </div>
                  )}
                </div>
                <span className={`file-status ${status}`}>
                  {status === "pending" && "Queued"}
                  {status === "processing" && "Analyzing…"}
                  {status === "done" && "✓ Done"}
                </span>
                <button className="file-remove" onClick={(e) => { e.stopPropagation(); removeFile(id); }} title="Remove">✕</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}