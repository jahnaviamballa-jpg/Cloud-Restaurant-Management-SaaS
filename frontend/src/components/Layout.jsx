import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.35)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Topbar />

      <main
        style={{
          padding: "30px",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;