function PredictionFilter({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search Inventory..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          flex: 1,
          minWidth: "260px",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          outline: "none",
          fontSize: "16px",
        }}
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        style={{
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontSize: "16px",
          minWidth: "220px",
        }}
      >
        <option value="All">
          All Items
        </option>

        <option value="Critical">
          Critical
        </option>

        <option value="Reorder Soon">
          Reorder Soon
        </option>

        <option value="Monitor Stock">
          Monitor Stock
        </option>

        <option value="Stock Sufficient">
          Stock Sufficient
        </option>
      </select>
    </div>
  );
}

export default PredictionFilter;