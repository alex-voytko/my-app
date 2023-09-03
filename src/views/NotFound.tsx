import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <h2>Wrong page</h2>
      <div style={{ padding: 30 }}>
        <button onClick={() => navigate("/")}>Back Home</button>
      </div>
    </div>
  );
}
