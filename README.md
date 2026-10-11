# 🛒 Bazar Dor (বাজার দর)

A modern and responsive market price tracking application built with Next.js and TypeScript. Bazar Dor helps users explore daily prices of essential commodities in Bangladesh, compare prices across different markets, track price changes, and view detailed product information. Users can create accounts and sign in using email and password or social authentication.

## 🚀 Live Demo

👉 [Bazar Dor Live Demo](https://bazar-dor-a7-one.vercel.app/)

## 🛠️ Technology Stack

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- REST API
- Better Auth
- MongoDB Atlas
- GitHub OAuth
- Google OAuth
- React Toastify
- Vercel

## ✨ Key Features

- **Explore Products** — Browse essential commodities, including rice, lentils, oil, vegetables, fish, meat, eggs, milk, and spices.
- **Category-Based Browsing** — Explore products by category using dedicated category pages.
- **Product Details** — View detailed product information, current prices, and price changes.
- **Market Price Comparison** — Compare minimum and maximum prices across different markets and divisions.
- **Price Trends** — Identify products with increasing or decreasing prices.
- **Live Price Ticker** — View a continuously scrolling ticker displaying product names, prices, units, and percentage changes.
- **User Authentication** — Register and sign in using email and password.
- **Social Login** — Authenticate using GitHub or Google.
- **User Profile** — Access profile information through the profile page.
- **Protected Routes** — Restrict access to designated features for authenticated users.
- **Responsive Design** — Enjoy a user-friendly interface across desktop, tablet, and mobile devices.
- **Bangla Interface** — Browse product names, prices, categories, and market information in Bengali.

## 📂 Project Structure

```text
Bazar-Dor/
│
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   └── UserInfo.tsx
│   │
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts
│   │
│   ├── category-details/
│   │   └── [cslug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   │
│   ├── components/
│   │   ├── cards/
│   │   │   ├── BazarCard.tsx
│   │   │   ├── PriceCard.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── SingleProductCard.tsx
│   │   │
│   │   ├── homepage/
│   │   │   ├── Banner.tsx
│   │   │   └── ProductSection.tsx
│   │   │
│   │   └── shared/
│   │       ├── CategoryDetailsProducts.tsx
│   │       ├── Footer.tsx
│   │       ├── Marquee.tsx
│   │       ├── Navbar.tsx
│   │       └── NavCategories.tsx
│   │
│   ├── product-details/
│   │   └── [pid]/
│   │       └── page.tsx
│   │
│   ├── profile-info/
│   │   └── page.tsx
│   │
│   ├── types/
│   │   ├── CategoryType.ts
│   │   └── ProductType.ts
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── globals.css
│
├── lib/
│   ├── auth.ts
│   └── auth-client.ts
│
├── public/
├── assets/
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🔗 API

Bazar Dor uses a REST API to retrieve product and category information.

**Base API URL**

```text
https://openapi.programming-hero.com/api/bazardor
```

**Available endpoints**

| Endpoint | Description |
|---|---|
| `/categories` | Retrieve all product categories |
| `/products` | Retrieve all products |
| `/products?category=chal` | Retrieve products by category |
| `/products/{id}` | Retrieve details of a specific product |




## 🔐 Authentication

Bazar Dor uses **Better Auth** for authentication and **MongoDB Atlas** for database storage.

- Email and password authentication
- GitHub OAuth login
- Google OAuth login
- Session management
- Access control for protected pages

The application uses environment variables to configure authentication providers and database connectivity.





## 👨‍💻 Author

**Md. Raju Ahammed**

- GitHub: [mdraju116](https://github.com/mdraju116)
- Live Demo: [Bazar Dor](https://bazar-dor-a7-one.vercel.app/)
