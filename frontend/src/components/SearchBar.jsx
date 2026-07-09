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
        type="text"
        placeholder="Search food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          border: "none",
          outline: "none",
          marginLeft: "10px",
          width: "100%",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

export default SearchBar;