# 🍽️ Web-Based CMS for Digital Restaurant Menus

A modern two-application platform that helps restaurant owners manage digital menus while offering customers a fast, interactive menu experience.

![ASP.NET Core](https://img.shields.io/badge/Backend-ASP.NET%20Core%208-512BD4?logo=dotnet&logoColor=white)
![Angular](https://img.shields.io/badge/Frontend-Angular-DD0031?logo=angular&logoColor=white)
![PostgreSQL](<https://img.shields.io/badge/Database-NeonDB%20(PostgreSQL)-4169E1?logo=postgresql&logoColor=white>)
![Firebase](https://img.shields.io/badge/Auth%20%26%20Storage-Firebase-FFCA28?logo=firebase&logoColor=white)
![OpenAI](https://img.shields.io/badge/AI-GPT--4o--mini-412991?logo=openai)

## 📌 Overview

This project consists of **two web applications** - an **Admin Application** for restaurant owners and a **Menu Application** for customers - powered by a central **ASP.NET Core** REST API and cloud services.

## 🌐 Live Demo

**Deployed site:** `https://restaurant-menu-30.web.app`

## 🚀 Features

### **Admin Application (CSR - Angular)**

- Login/Signup with **Google** or **email & password** (Firebase Auth)
- **2-step onboarding**: restaurant info → preferences
- **Home dashboard**:
  - Edit restaurant name & URL
  - Visit analytics (QR vs URL)
  - AI-powered insights (GPT-4o-mini)
  - Download QR codes (PNG/SVG)
- **Menu manager**
  - Upload/export via Excel
  - Add/edit/remove menu items and categories (images via Firebase Storage)
  - Reorder items & categories
  - Separate **Drinks** and **Food** views with tables (sorting, filtering, search)
  - Add restaurant info (Wi-Fi, contact, etc.)
- **Style editor**: live menu preview, change theme color & font
- **Analytics**: Most Popular Items, Interactions by Hour, Most Popular Categories
- **Reviews** viewer (table of customer reviews)

### **Menu Application (SSR - Angular)**

- Server-Side Rendering for instant first-paint content
- Home screen with restaurant details
- Menu screen - pick Food or Drinks
- Add items to favorites for later reference
- AI Chat - ask about dishes & get recommendations (GPT-4o-mini)
- Customers can submit reviews

## 🛠️ Technology Stack

- **Backend:** ASP.NET Core 8 (REST API), Semantic Kernel + OpenAI connector for AI features, EF Core with Npgsql to NeonDB
- **Frontend:** Angular 19 (CSR for Admin; SSR for Menu), Angular Material, Chart.js
- **Cloud:** Firebase Auth & File Storage, NeonDB (PostgreSQL), OpenAI (GPT-4o-mini)

## 🖼️ Screenshots

<details>
<summary><strong>Admin Application (CSR)</strong></summary>

![Screenshot 1](./screenshots/pic1.png)
![Screenshot 2](./screenshots/pic2.png)
![Screenshot 3](./screenshots/image.png)
![Screenshot 4](./screenshots/pic4.png)
![Screenshot 5](./screenshots/pic5.png)
![Screenshot 6](./screenshots/pic6.png)
![Screenshot 7](./screenshots/pic7.png)
![Screenshot 8](./screenshots/pic8.png)
![Screenshot 9](./screenshots/pic9.png)

</details>

<details>
<summary><strong>Menu Application (SSR)</strong></summary>

![Screenshot 10](./screenshots/pic10.png)
![Screenshot 11](./screenshots/pic11.png)
![Screenshot 12](./screenshots/pic12.png)
![Screenshot 13](./screenshots/pic13.png)

</details>
