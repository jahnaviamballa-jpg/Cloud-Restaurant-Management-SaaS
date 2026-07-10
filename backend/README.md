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