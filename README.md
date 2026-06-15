# Noiré — Full-Stack E-Commerce Platform 🛍️

A complete MERN e-commerce store where users browse, filter, and buy products, with a full
admin dashboard for managing the catalog and orders.

![Noiré homepage](screenshots/homepage.png)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Store-000000?style=for-the-badge)](https://e-commerce-frontend-tau-tan.vercel.app/)
&nbsp;
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 🔗 Live

- **Storefront:** https://e-commerce-frontend-tau-tan.vercel.app/
- **Admin dashboard:** `ADD_ADMIN_URL_HERE` _(demo login on request)_

## ✨ Features

**Shoppers**
- Browse, search, filter, and sort products
- Product variants (size selection) and a persistent cart
- Place orders with a delivery address and view order history

**Admin**
- Authenticated admin dashboard
- Add, edit, and delete products
- View and manage all orders across the store

## 🧰 Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, React Router, Context API, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Deployment | Vercel (frontend & backend) |

## 🚀 Getting Started

```bash
# clone
git clone https://github.com/Ghadiiz/E-commerce.git
cd E-commerce

# backend
cd backend && npm install && npm run server

# frontend (new terminal)
cd frontend && npm install && npm run dev

# admin (new terminal)
cd admin && npm install && npm run dev
```

Create a `.env` in `/backend` based on `.env.example`:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

## 📁 Structure

```
E-commerce/
├── frontend/   # customer-facing store (React)
├── admin/      # admin dashboard (React)
└── backend/    # REST API (Node/Express/MongoDB)
```

## 👤 About

Built by **Ghadi Dababneh** to practice end-to-end MERN development — REST API design, auth,
state management, and deployment. Started from a MERN course foundation as a hands-on learning project.

[GitHub](https://github.com/Ghadiiz) · [LinkedIn](https://www.linkedin.com/in/ghadi-dababneh-a203b9378/)

## 📄 License

MIT
