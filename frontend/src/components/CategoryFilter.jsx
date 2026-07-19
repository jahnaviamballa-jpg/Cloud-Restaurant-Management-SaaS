const categories = [
  "All",
  "Biryani",
  "Starters",
  "Main Course",
  "Desserts",
  "Drinks",
];

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <div
      style={{
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "30px",
}}
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          style={{
  padding: "12px 22px",
  margin: "8px",
  borderRadius: "30px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
  transition: "all .3s ease",
transform:
  selectedCategory === category
    ? "scale(1.05)"
    : "scale(1)",

  background:
    selectedCategory === category
      ? "linear-gradient(90deg,#7C3AED,#F97316)"
      : "rgba(20,20,28,.92)",

  color:
    selectedCategory === category
      ? "white"
      : "#d5d5d5",

  border:
    selectedCategory === category
      ? "none"
      : "1px solid rgba(255,255,255,.08)",
}}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;