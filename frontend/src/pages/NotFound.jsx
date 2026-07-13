import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>😕 Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <Link to="/">
        <button>🏠 Go to Home</button>
      </Link>

      <style>{`
        .error-page {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
        }

        .error-page h1 {
          font-size: 100px;
          color: #ff6b00;
          margin: 0;
        }

        .error-page button {
          background: #ff6b00;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default NotFound;