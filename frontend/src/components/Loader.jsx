export default function Loader({ text = "Analyzing documents…" }) {
  return (
    <div className="loader-wrap">
      <div className="loader-ring" />
      <div className="loader-text">{text}</div>
    </div>
  );
}