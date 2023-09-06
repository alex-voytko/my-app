import { useNavigate } from "react-router-dom";

export default function AppBar() {
  const navigate = useNavigate();

  return (
    <header className="app-bar">
      <div className="container">
        <h2 onClick={() => navigate("/")}>myApp</h2>
      </div>
    </header>
  );
}
