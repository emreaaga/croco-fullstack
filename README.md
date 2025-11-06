<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<br />
<div align="center">
  <h3 align="center">⚡ Fullstack Admin Dashboard</h3>
  <p align="center">
    Secure admin panel with authentication, RBAC, and REST API.
    <br />
    <a href="#getting-started"><strong>Get Started »</strong></a>
  </p>
</div>

---

## 🧩 About The Project

Fullstack Admin Dashboard is a secure fullstack web app with user authentication, role-based access control, and REST API integration.

- 🔐 JWT authentication (HTTP-only cookies)
- 🧾 Role-based access control (admin / user)
- 🧠 Backend validation & PostgreSQL integration
- 🧩 Integration tests with Jest + Supertest

### Built With

- [![Node.js][Node.js]][Node-url]
- [![Next.js][Next.js]][Next-url]
- [![PostgreSQL][Postgres]][Postgres-url]
- [![TailwindCSS][Tailwind]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## ⚙️ Getting Started

### Prerequisites

Install **pnpm** globally (backend uses it):

```bash
npm install -g pnpm
```

### Installation

1. **Clone the repo:**

```bash
git clone https://github.com/emreaaga/croco-fullstack.git
cd croco-fullstack
```

2. **Backend setup:**

```bash
pnpm install
pnpm dev
```

3. **Create .env file:**

```bash
cp .env.example .env
# set up your configuration
```

4. **Frontend setup:**

```bash
cd frontend
npm install
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🧪 Tests

Run integration tests:

```bash
pnpm test
```

### During tests:

Auto-creates admin user:

- **email:** test@gmail.com
- **password:** test1234

Tests auth, users, and RBAC.

Database connection closes automatically after tests.

> **Note:** After tests, you can log in with the auto-created admin — no manual DB seeding needed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## ✨ Features

- ✅ JWT auth (HTTP-only cookies)
- ✅ RBAC (admin/user)
- ✅ RESTful API with validation
- ✅ Jest + Supertest integration tests
- ✅ Auto-created admin for testing

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/emreaaga/fullstack-admin-dashboard.svg?style=for-the-badge
[contributors-url]: https://github.com/emreaaga/fullstack-admin-dashboard/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/emreaaga/fullstack-admin-dashboard.svg?style=for-the-badge
[forks-url]: https://github.com/emreaaga/fullstack-admin-dashboard/network/members
[stars-shield]: https://img.shields.io/github/stars/emreaaga/fullstack-admin-dashboard.svg?style=for-the-badge
[stars-url]: https://github.com/emreaaga/fullstack-admin-dashboard/stargazers
[issues-shield]: https://img.shields.io/github/issues/emreaaga/fullstack-admin-dashboard.svg?style=for-the-badge
[issues-url]: https://github.com/emreaaga/fullstack-admin-dashboard/issues
[license-shield]: https://img.shields.io/github/license/emreaaga/fullstack-admin-dashboard.svg?style=for-the-badge
[license-url]: https://github.com/emreaaga/fullstack-admin-dashboard/blob/master/LICENSE.txt
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Postgres]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
