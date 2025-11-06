<a id="readme-top"></a>

<div align="center">

# ⚡ Fullstack Admin Dashboard

Minimal, secure admin panel featuring **JWT authentication**, **Role-Based Access Control (RBAC)**, and a clean **REST API**.

**Auth:** HTTP-only cookies | **DB:** PostgreSQL (Drizzle ORM) | **Validation:** Zod | **Tests:** Jest + Supertest

<br>

[Get Started](#-getting-started) · [Tests](#-tests) · [Features](#-features)

</div>

---

## 🧩 About

This is a concise fullstack admin application with the following key features:
* Authentication via JWT stored in **HTTP-only cookies**
* Role-Based Access Control (**admin / user**)
* Typed validation (**Zod**) for all routes
* Security middleware (Helmet, rate-limit, CORS, compression)
* Robust integration tests using **Jest + Supertest**

---

## ⚙️ Getting Started

> The backend uses **pnpm**.

### Prerequisites

```bash
npm i -g pnpm

Installation and Setup
1) Clone the repository:
git clone [https://github.com/emreaaga/croco-fullstack.git](https://github.com/emreaaga/croco-fullstack.git)
cd croco-fullstack

2) Backend Setup & Run:
pnpm install
pnpm dev

3) Environment Variables:
cp .env.example .env - Set your own values in the newly created .env file.

4) Frontend Setup (Optional):
4.1) cd frontend 4.2) npm install 4.3) npm run dev

🧪 Tests
Run the integration tests using the following command: pnpm test

Test User Credentials
During testing, an admin user is automatically created and available for immediate login (no seeding required):
- **email:** test@gmail.com
- **password:** test1234

The tests cover: authentication, user management, and RBAC. Database connections are properly closed after the tests complete.

✨ Features
* JWT Authentication (via HTTP-only cookies)
* Role-Based Access Control (admin/user)
* REST API with Zod validation
* Security Middleware: Helmet, CORS, rate-limit, compression
* Integration Tests (Jest + Supertest)
* Auto-Admin Creation after running pnpm test
