function TopItemsTable({ items = [] }) {
  return (
    <div>
      <h2>🍽️ Top Selling Items</h2>

      <table width="100%" cellPadding="12">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Orders</th>
            <th>Revenue</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.orders} Orders</td>
              <td>{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopItemsTable;