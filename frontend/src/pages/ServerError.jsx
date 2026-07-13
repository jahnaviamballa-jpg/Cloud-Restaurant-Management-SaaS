import { Link } from "react-router-dom";

function ServerError() {
  return (
    <div className="server-error-page">
      <h1>500</h1>

      <h2>⚠️ Something Went Wrong</h2>

      <p>
        We are having trouble connecting to the server.
        Please try again later.
      </p>

      <Link to="/">
        <button>🔄 Return Home</button>
      </Link>

      <style>{`
        .server-error-page {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
        }

        .server-error-page h1 {
          font-size: 100px;
          color: #dc3545;
          margin: 0;
        }

        .server-error-page button {
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

export default ServerError;