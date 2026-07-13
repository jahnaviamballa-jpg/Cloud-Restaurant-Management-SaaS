function Loading() {
  return (
    <div className="loading-page">
      <div className="loading-spinner"></div>
      <h2>Loading...</h2>

      <style>{`
        .loading-page {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .loading-spinner {
          width: 55px;
          height: 55px;
          border: 6px solid #ddd;
          border-top: 6px solid #ff6b00;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;