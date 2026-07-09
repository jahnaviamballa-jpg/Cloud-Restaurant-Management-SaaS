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
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "25px",
      }}
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          style={{
            padding: "10px 18px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            background:
              selectedCategory === category ? "#ff6b00" : "#ddd",
            color:
              selectedCategory === category ? "#fff" : "#000",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;