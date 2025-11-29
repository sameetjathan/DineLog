Step 1: Registration + Role Assignment + Login (Frontend Only)
✔ Registration Page
Full Name
Email
Password

Select Role (Dropdown):
Super Admin
Manager
Cashier
Waiter
Chef
Inventory Manager
Customer

When user selects a role → save it in localStorage (since no database).
Example:

{
  "email": "abc@gmail.com",
  "password": "123456",
  "role": "Manager"
}

✔ Login Page
User enters email + password
Validate with values from localStorage
Redirect to the correct dashboard based on the saved role.

✔ Include the DineLog Logo on:
Registration page
Login page

Step 2: Role-Based Routing (Frontend Only)

When login is successful →
Check role from localStorage → redirect to their specific dashboard page:

Role	Redirect Page
Super Admin	/dashboard/admin.html
Manager	/dashboard/manager.html
Cashier	/dashboard/cashier.html
Waiter	/dashboard/waiter.html
Chef	/dashboard/chef.html
Inventory Manager	/dashboard/inventory.html
Customer	/dashboard/customer.html

No backend → use JavaScript routing + localStorage.

Step 3: Complete Dashboard UI for Each Role
🎩 Super Admin Dashboard

Manage All Users
Assign/Change Roles (frontend only UI)
View Overall Reports
Restaurant Overview Stats
Menu Management
Inventory Overview

👨‍💼 Manager Dashboard
Manage Staff List
Table Management (Add/Edit/Delete tables)
Track Orders
Daily Sales Report UI
Customer Feedback Page

💰 Cashier Dashboard
Billing Page
Generate Invoice (frontend only PDF or HTML)
Order Payment Status
View Sales History (dummy data)

🍽 Waiter Dashboard
Take New Order (menu list + add items)
Current Orders Status
Table Assignments
Call Kitchen Button

👨‍🍳 Chef Dashboard
List of Orders to Cook
Cooking Status (Pending → Cooking → Ready)
Notify Waiter Button

🧺 Inventory Manager Dashboard
Add Stock
Reduce Stock (used in orders)
Low Stock Alerts (fake visual alerts)
Vendor Management UI

🧑‍🤝‍🧑 Customer Dashboard
Browse Menu
Add to Cart
Place Order
Order Tracking
Give Feedback

Step 4: Create All Module Pages (Frontend UI Only)

Make premium UI for:

1. Menu Page
Card-based food items
Search bar
Filters (veg, non-veg, price)

2. Orders Page
For waiter, cashier, chef
Table + order details

3. Inventory Page
Stock list
Add item
Update quantity

4. Billing Page
Add items
Quantity
Tax
Total
Download Bill

5. Reports Page
Daily sales
Orders graph (frontend dummy graph)

Step 5: Add Finishing Touches (Premium Frontend)

✔ Animations (AOS, GSAP)
✔ Responsive navbar with role change
✔ Dark Mode + Light Mode
✔ Toast Notifications (success, error)
✔ Reusable Components:

Header
Sidebar
Cards
Buttons
Order modals

✔ Logout Function
Just remove localStorage data and redirect to login.