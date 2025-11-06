<a id="readme-top"></a>

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

<div align="center">

## 🧩 About The Project

Fullstack Admin Dashboard — secure fullstack app with:

🔐 JWT auth (HTTP-only cookies) &nbsp;•&nbsp; 🧾 RBAC (admin/user) &nbsp;•&nbsp; 🧠 Validation & PostgreSQL &nbsp;•&nbsp; 🧪 Integration tests (Jest + Supertest)

</div>

<div align="center">

## 🛠 Built With

</div>

<div align="center">

<!-- Core -->

<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=fff&style=for-the-badge" /></a>
<a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge" /></a>
<a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=fff&style=for-the-badge" /></a>
<a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle%20ORM-0b3?style=for-the-badge" /></a>

<!-- Auth / Validation / Security -->
<img src="https://img.shields.io/badge/JSON%20Web%20Token-000?logo=jsonwebtokens&logoColor=fff&style=for-the-badge" />
<img src="https://img.shields.io/badge/Zod-3b82f6?style=for-the-badge" />
<img src="https://img.shields.io/badge/Helmet-111?style=for-the-badge" />
<img src="https://img.shields.io/badge/Rate%20Limit-444?style=for-the-badge" />
<img src="https://img.shields.io/badge/bcrypt-121212?style=for-the-badge" />

<!-- HTTP / Utils -->
<img src="https://img.shields.io/badge/cookie--parser-555?style=for-the-badge" />
<img src="https://img.shields.io/badge/cors-555?style=for-the-badge" />
<img src="https://img.shields.io/badge/compression-555?style=for-the-badge" />
<img src="https://img.shields.io/badge/morgan-555?style=for-the-badge" />
<img src="https://img.shields.io/badge/dotenv-555?style=for-the-badge" />
<img src="https://img.shields.io/badge/nodemailer-2a8?style=for-the-badge" />

<!-- DX / Tests -->

<a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=for-the-badge" /></a>
<a href="https://github.com/ladjs/supertest"><img src="https://img.shields.io/badge/Supertest-000?style=for-the-badge" /></a>
<img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge" />
<img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=000&style=for-the-badge" />
<img src="https://img.shields.io/badge/drizzle--kit-0b3?style=for-the-badge" />

</div>
<div align="center">

- 🔐 JWT authentication (HTTP-only cookies)
- 🧾 Role-based access control (admin / user)
- 🧠 Backend validation & PostgreSQL integration
- 🧩 Integration tests with Jest + Supertest
  
</div>

## ⚙️ Getting Started

<div align="center">
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

</div>

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
