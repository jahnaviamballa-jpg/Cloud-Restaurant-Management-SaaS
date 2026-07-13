# Cloud Restaurant Management SaaS - Backend

## Menu APIs

### POST /restaurants/{restaurant_id}/menu
Add a new menu item for a restaurant.

### GET /restaurants/{restaurant_id}/menu
Retrieve all menu items of a restaurant.

### GET /menu/{menu_id}
Retrieve a single menu item by ID.

### PUT /menu/{menu_id}
Update an existing menu item.

### DELETE /menu/{menu_id}
Delete a menu item.

## Restaurant APIs

### POST /restaurants
Create a new restaurant.

### GET /restaurants
Retrieve all restaurants.

### GET /restaurants/{id}
Retrieve restaurant details by ID.

### PUT /restaurants/{id}
Update restaurant details.

### DELETE /restaurants/{id}
Delete a restaurant.

## Order APIs

POST /orders
Place a new order.

GET /orders
Retrieve all orders.

GET /orders/{order_id}
Retrieve an order by ID.

PUT /orders/{order_id}/status
Update the status of an order.

DELETE /orders/{order_id}
Delete an order.

## AI Inventory Prediction APIs

### Get All Predictions
GET /predictions

Returns inventory prediction for all items.

---

### Get Prediction by Item
GET /predictions/{inventory_id}

Returns prediction details for a single inventory item.

---

### Inventory Analytics
GET /predictions/analytics/inventory

Returns:
- Total inventory items
- Low stock items
- Critical stock items
- Average days remaining

---

## Prediction Formula

Days Remaining = Current Stock / Average Daily Usage

---

## Reorder Recommendation Logic

Days Remaining < 5
→ Reorder Immediately (50 units)

Days Remaining < 10
→ Plan Reorder (20 units)

Days Remaining ≥ 10
→ Stock Sufficient

## Analytics APIs

### GET /analytics/sales
Returns:
- Today Orders
- Weekly Orders
- Monthly Orders

### GET /analytics/revenue
Returns:
- Today Revenue
- Weekly Revenue
- Monthly Revenue

### GET /analytics/top-items
Returns:
- Top Selling Menu Items
- Number of Orders
- Revenue Generated

### GET /analytics/orders
Returns:
- Pending Orders
- Preparing Orders
- Ready Orders
- Served Orders
- Cancelled Orders

### GET /analytics/inventory
Returns:
- Total Inventory Items
- Low Stock Count
- Critical Stock Count
- Average Days Remaining

# Backend Features

## Authentication APIs
- Register
- Login

## Restaurant APIs
- Create Restaurant
- Get Restaurants
- Update Restaurant
- Delete Restaurant

## Menu APIs
- Add Menu Item
- Get Menu
- Update Menu
- Delete Menu

## Order APIs
- Place Order
- Get Orders
- Update Order Status
- Delete Order

## Inventory APIs
- Add Inventory
- Update Inventory
- Delete Inventory
- Automatic Stock Deduction
- Low Stock Alerts

## AI Prediction APIs
- GET /predictions
- GET /predictions/{id}
- GET /analytics/inventory (Prediction Analytics)

## Analytics APIs
- GET /analytics/sales
- GET /analytics/revenue
- GET /analytics/top-items
- GET /analytics/orders
- GET /analytics/inventory

## Reports APIs
- GET /reports/sales
- GET /reports/inventory
- GET /reports/orders

## Notification APIs
- GET /notifications
- GET /notifications/low-stock

## Installation

1. Clone the repository
2. Create a virtual environment
3. Install requirements
4. Configure `.env`
5. Run:
   uvicorn app.main:app --reload

## Environment Variables

DATABASE_URL=<your_database_url>
SECRET_KEY=<your_secret_key>