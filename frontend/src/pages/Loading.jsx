function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0,0,0,.20),rgba(0,0,0,.25)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "rgba(18,18,24,.78)",
          backdropFilter: "blur(12px)",
          borderRadius: "30px",
          padding: "60px",
          border: "1px solid rgba(255,255,255,.08)",
          textAlign: "center",
          minWidth: "380px",
          boxShadow: "0 20px 50px rgba(0,0,0,.45)",
        }}
      >
        <div className="loading-spinner"></div>

        <h1
          style={{
            color: "white",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        >
          Loading...
        </h1>

        <p
          style={{
            color: "#BDBDBD",
            lineHeight: "1.8",
          }}
        >
          Preparing your RestroVerse AI Dashboard.
          <br />
          Please wait a moment...
        </p>

        <div
          style={{
            width: "100%",
            height: "8px",
            background: "rgba(255,255,255,.08)",
            borderRadius: "20px",
            marginTop: "35px",
            overflow: "hidden",
          }}
        >
          <div className="progress-bar"></div>
        </div>

        <style>{`
          .loading-spinner{
              width:75px;
              height:75px;
              margin:auto;
              border-radius:50%;
              border:8px solid rgba(255,255,255,.15);
              border-top:8px solid #7C3AED;
              border-right:8px solid #F97316;
              animation:spin 1s linear infinite;
          }

          .progress-bar{
              width:40%;
              height:100%;
              border-radius:20px;
              background:linear-gradient(90deg,#7C3AED,#F97316);
              animation:loading 2s ease infinite;
          }

          @keyframes spin{
              100%{
                  transform:rotate(360deg);
              }
          }

          @keyframes loading{
              0%{
                  transform:translateX(-100%);
              }

              100%{
                  transform:translateX(260%);
              }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Loading;