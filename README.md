Here’s your **Online Restaurant** project `README.md` in the same format as your Hubly project:

---

# 🍽️ Online Restaurant

A full-stack **restaurant management and food ordering system** built with **Node.js**, **Express**, **HTML/CSS**, and **JavaScript**. This project allows customers to place orders, chefs to manage preparation, and admins to oversee operations in real time.

---

## 🚀 Live Demo

> *Deployment not provided. Add Netlify/Render URLs here if hosted.*
> for user: http://34.132.137.179:5002/user/

> for admin: http://34.132.137.179:5002/admin/

---


## 🧰 Prerequisites

* **Node.js**
* **(Optional)** Redis (for managing state/timers)
* **Local/Cloud Deployment Platforms**

  * GCP VM instance

---

## ✨ Features Implemented

* ✅ Customer-facing interface to browse menu and place orders
* ✅ Admin panel for managing food items and tracking active orders
* ✅ Categorized food menu with:

  * Name
  * Price
  * Preparation Time
  * Description
  * Image
* ✅ Add/Edit/Delete food items from the menu
* ✅ Automatic assignment of chefs based on order load
* ✅ Real-time order tracking
* ✅ Cron job to reduce preparation time every minute
* ✅ Completed orders marked and removed when prep time hits 0
* ✅ Mobile responsive design
* ✅ Modular frontend structure for both customers and admin users

---

## 🔒 Security & Validations

* Input validation on food item forms
* Backend API route structure for protected operations (admin actions)
* Consistent response messaging and error handling

---

## 📦 Dependencies

### 🔧 Backend

* `express`
* `cors`
* `dotenv`
* `node-cron` or native `setInterval` (for countdown jobs)
* `body-parser`

### 🎨 Frontend

* `HTML`, `CSS`, `Vanilla JavaScript`
* `Bootstrap` or custom styling (if used)

---

## 📊 Info

* A **cron job** or interval function automatically decrements the prep time of active orders every minute.
* Chefs are assigned to new orders based on lowest current workload.
* Fully dynamic UI with interactive feedback for customers and admins.

---

## 📧 Contact

For questions or suggestions:

**Maintainer**: Bhanu Prasad
📧 Email: [bhanuprasadchintu.170403@gmail.com](mailto:bhanuprasadchintu.170403@gmail.com)
🔗 LinkedIn: [https://www.linkedin.com/in/bhanu-prasad-thulasimogga-b95891237/](https://www.linkedin.com/in/bhanu-prasad-thulasimogga-b95891237/)

---

Let me know if you want badges, screenshots, or contribution guidelines added as well!
