# 🍽️ Web-Based CMS for Digital Restaurant Menus

A modern two-application platform that helps restaurant owners manage digital menus while offering customers a fast, interactive menu experience.

![ASP.NET Core](https://img.shields.io/badge/Backend-ASP.NET%20Core%208-512BD4?logo=dotnet&logoColor=white)
![Angular](https://img.shields.io/badge/Frontend-Angular-DD0031?logo=angular&logoColor=white)
![PostgreSQL](<https://img.shields.io/badge/Database-NeonDB%20(PostgreSQL)-4169E1?logo=postgresql&logoColor=white>)
![Firebase](https://img.shields.io/badge/Auth%20%26%20Storage-Firebase-FFCA28?logo=firebase&logoColor=black)
![OpenAI](https://img.shields.io/badge/AI-GPT--4o--mini-412991?logo=openai)

---

## 📌 Overview

This project consists of **two web applications** — an **Admin Application** for restaurant owners and a **Menu Application** for customers — powered by a central **ASP.NET Core** REST API and cloud services.

## 🚀 Features

### **Admin Application (CSR - Angular)**

- 🔐 Login/Signup with **Google** or **email & password** (Firebase Auth)
- 🧭 **2-step onboarding**: restaurant info → preferences
- 🏡 Home dashboard:
  - Edit restaurant name & URL
  - Visit analytics (QR vs URL)
  - AI-powered insights (GPT-4o-mini)
  - Download QR codes (PNG/SVG)
- 📋 **Menu manager**
  - Upload/export via Excel
  - Add/edit/remove menu items and categories (images via Firebase Storage)
  - Reorder items & categories
  - Separate **Drinks** and **Food** views with tables (sorting, filtering, search)
  - Add restaurant info (Wi-Fi, contact, etc.)
- 🎨 **Style editor**: live menu preview, change theme color & font
- 📊 **Analytics**: Most Popular Items, Interactions by Hour, Most Popular Categories
- ⭐ **Reviews** viewer (table of customer reviews)

### **Menu Application (SSR - Angular Universal)**

- ⚡ Server-Side Rendering for instant first-paint content
- 🏠 Home screen with restaurant details
- 🍽️ Menu screen — pick Food or Drinks
- ❤️ Add items to favorites for later reference
- 🤖 AI Chat — ask about dishes & get recommendations (GPT-4o-mini)
- ⭐ Customers can submit reviews

## 🏗️ System Architecture

- **Admin App** (CSR) — manages content and analytics; talks to the server API.
- **Menu App** (SSR) — fetches data server-side for fast customer experience.
- **Server API** — ASP.NET Core REST API that validates Firebase JWTs, persists data to PostgreSQL (NeonDB), serves menu data, handles reviews and analytics, and connects to OpenAI via Semantic Kernel for AI features.
- **Storage & Auth** — Firebase Authentication & Cloud Storage for images.
- **DB** — NeonDB (PostgreSQL).

## 🛠️ Technology Stack

- **Backend:** ASP.NET Core 8 (REST API), Semantic Kernel + OpenAI connector for AI features, EF Core with Npgsql to NeonDB
- **Frontend:** Angular 19 (CSR for Admin; SSR for Menu), Angular Material, Chart.js
- **Cloud:** Firebase Auth & Storage, NeonDB (PostgreSQL), OpenAI (GPT-4o-mini)

## 🌐 Live Demo

**Deployed site:** `https://restaurant-menu-30.web.app/`

## 🖼️ Screenshots
