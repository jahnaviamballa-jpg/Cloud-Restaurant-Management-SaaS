import { FaSearch } from "react-icons/fa";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        margin: "20px 0",
        background: "#fff",
      }}
    >
      <FaSearch color="#666" />

      <input
      className="search-input"
  type="text"
  placeholder="🔍 Search your favorite food..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    width: "100%",
    padding: "18px 22px",
    marginBottom: "25px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(20,20,28,.90)",
    color: "white",
    fontSize: "16px",
    outline: "none",
    backdropFilter: "blur(10px)",
    boxSizing: "border-box",
  }}
/>
    </div>
  );
}

export default SearchBar;