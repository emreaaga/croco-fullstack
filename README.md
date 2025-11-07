<div align="center">

# ⚡ Fullstack Admin Dashboard

Secure admin panel featuring **JWT authentication**, **Role-Based Access Control (RBAC)**, and a clean **REST API**.

**Auth:** HTTP-only cookies | **DB:** PostgreSQL (Drizzle ORM) | **Validation:** Zod | **Tests:** Jest + Supertest

<br>

### 🖼️ Preview

| Login Page                        | Dashboard                                 | Users Table                       |
| --------------------------------- | ----------------------------------------- | --------------------------------- |
| ![Login](./screenshots/login.png) | ![Dashboard](./screenshots/dashboard.png) | ![Users](./screenshots/users.png) |

</div>

---

## 🧩 About

_This is a concise fullstack admin application with the following key features:_

- Authentication via JWT stored in **HTTP-only cookies**
- Role-Based Access Control (**admin / user**)
- Typed validation (**Zod**) for all routes
- Security middleware (Helmet, rate-limit, CORS, compression)
- Robust integration tests using **Jest + Supertest**

---

## 🧰 Tech Stack

**Backend:**

- Node.js (Express)
- PostgreSQL + Drizzle ORM
- Zod (validation)
- Jest + Supertest (testing)
- pnpm (package manager)

**Frontend:**

- React + Vite
- TypeScript
- Tailwind CSS + Shadcn(UI library)
- Axios
- React Router

**DevOps / Tools:**

- Docker
- ESLint + Prettier
- GitHub Actions (optional CI/CD)

## ⚙️ Getting Started

> The backend uses **pnpm**.

### 🪜 Prerequisites

`npm i -g pnpm`
Installation and Setup

1. Clone the repository:

```bash
1.1) git clone [https://github.com/emreaaga/croco-fullstack.git](https://github.com/emreaaga/croco-fullstack.git)
1.2) cd croco-fullstack
```

2. Backend Setup & Run:

```bsh
2.1) pnpm install
2.2) pnpm dev
```

3. Environment Variables:
   `cp .env.example .env` - Set your own values in the newly created .env file.

4. Frontend Setup (Optional):
   4.1) `cd frontend` 4.2) `npm install` 4.3) `npm run dev`

## 🧪 Tests

Run the integration tests using the following command: `pnpm test`

Test User Credentials

> During testing, an admin user is automatically created and available for immediate login (no seeding required):

- **email:** test@gmail.com
- **password:** test1234

The tests cover: **_authentication_**, **_user management_**, and **_RBAC_**. Database connections are properly closed after the tests complete.

✨ Features

- JWT Authentication (via HTTP-only cookies)
- Role-Based Access Control (admin/user)
- REST API with Zod validation
- Security Middleware: Helmet, CORS, rate-limit, compression
- Integration Tests (Jest + Supertest)
- Auto-Admin Creation after running pnpm test
