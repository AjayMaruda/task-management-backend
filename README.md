# 🛠️ Task Management Backend API

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/OpenAPI_3.0-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Pino](https://img.shields.io/badge/Pino_Logger-3178C6?style=for-the-badge&logo=node.js&logoColor=white)

**Enterprise-grade RESTful API server for the Task Management System built with Node.js, Express 5, TypeScript, Mongoose 9, and OpenAPI / Swagger.**

[API Documentation](#-api-documentation--swagger) · [Installation](#-installation--setup) · [Environment Variables](#-environment-variables)

</div>

---

## 🌟 Overview

The **Task Management Backend** provides a high-performance, secure, and fully typed REST API architecture designed to power modern task management web and mobile clients. It enforces robust validation, stateless authentication via JSON Web Tokens (JWT), standardized HTTP status codes, structured logging, and strict data persistence via Mongoose schemas.

---

## ✨ Core Features

- **🛡️ End-to-End Type Safety:** Written entirely in TypeScript (`v6.x`) using `tsx` for high-speed development execution.
- **🔐 Secure Authentication & Authorization:** Stateless JWT bearer tokens (`protect` middleware) coupled with `bcryptjs` password hashing and salted digests.
- **📦 Comprehensive Data Models:** Clean, highly optimized MongoDB schemas for `Users` and `Tasks` with built-in indexing, soft-deletion patterns, and cascade protections.
- **📜 Interactive Swagger Documentation:** Automatic generation of OpenAPI 3.0 specs accessible directly via the `/api-docs` endpoint.
- **✅ Request Validation:** Middleware-driven request body and parameter validation using `express-validator` to intercept malformed data cleanly before reaching controllers.
- **⚡ Structured Logging:** Blazing-fast JSON structured logging via **Pino** and `pino-pretty` for beautiful terminal output during development and JSON formatting in production.
- **🚀 Modern Express 5:** Built on the latest `express@5.x` engine ensuring native Promise rejection handling across async controllers without manual try/catch wrappers.

---

## 📂 Project Structure

```
task-management-backend/
├── src/
│   ├── config/             # Database connection, environment config, Swagger spec initialization
│   ├── controllers/        # Request handling logic for Auth, Users, and Tasks
│   ├── dtos/               # Data Transfer Objects & Validation rules (`CreateTaskDTO`, `LoginDTO`)
│   ├── interfaces/         # TypeScript interfaces defining User, Task, and Request extensions
│   ├── middleware/         # Auth protection, centralized error handling, and request validators
│   ├── models/             # Mongoose 9 schemas and database models (`Task`, `User`)
│   ├── routes/             # Express routing modules (`authRouter`, `userRouter`, `taskRouter`)
│   ├── services/           # Business logic decoupling controllers from direct database operations
│   ├── utils/              # Helper functions, JWT generators, and custom error classes
│   ├── app.ts              # Express application configuration and middleware pipelines
│   └── server.ts           # HTTP server entry point, Pino logger setup, and graceful shutdown
├── .env.example            # Environment variables template
├── eslint.config.js        # ESLint flat config with strict TypeScript type-checking rules
├── tsconfig.json           # Compiler options and path aliases
└── package.json            # Scripts, dependencies, and Husky hook setups
```

---

## 🚀 Installation & Setup

### 1. Prerequisites

- **Node.js** (`v18+` or `v20+` recommended)
- **MongoDB** (Running locally on `port 27017` or a cloud-hosted MongoDB Atlas URI)

### 2. Clone & Install Dependencies

```bash
git clone https://github.com/AjayMaruda/task-management-backend.git
cd task-management-backend
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your custom secrets:

```bash
cp .env.example .env
```

| Variable     | Default / Example                           | Description                                                   |
| :----------- | :------------------------------------------ | :------------------------------------------------------------ |
| `PORT`       | `5000`                                      | Port on which the API server listens                          |
| `NODE_ENV`   | `development`                               | Application environment (`development`, `production`, `test`) |
| `MONGO_URI`  | `mongodb://127.0.0.1:27017/task-management` | MongoDB connection string                                     |
| `JWT_SECRET` | `your_jwt_secret_key_here`                  | Secret private key used to sign and verify JWT tokens         |
| `JWT_EXPIRE` | `7d`                                        | Token expiration time (`1d`, `7d`, `30m`)                     |
| `CLIENT_URL` | `http://localhost:5173`                     | Allowed CORS origin for frontend client requests              |

---

## 🏃 Running the Application

### Development Mode (with Live Reload via `tsx watch`)

```bash
npm run dev
```

### Production Build & Execution

```bash
# Compile TypeScript to JavaScript in /dist
npm run build

# Start the production server
npm start
```

---

## 📖 API Documentation & Swagger

When running in development mode, the interactive **Swagger UI** is automatically mounted. Open your browser and navigate to:

👉 **`http://localhost:5000/api-docs`**

### API Endpoints Overview

#### 🔐 Authentication & Users (`/api/auth` & `/api/users`)

- `POST /api/auth/register` — Register a new user account (Requires `email`, `password`, `name`).
- `POST /api/auth/login` — Authenticate and return a signed JWT bearer token.
- `GET /api/users/me/:id` — Get specific user profile (Protected).
- `POST /api/users/list` — Retrieve paginated user list with search support (Protected).
- `PUT /api/users/:id` — Update profile metadata (Protected).
- `DELETE /api/users/:id` — Soft-delete user account (Protected).

#### 📋 Tasks (`/api/tasks`)

- `POST /api/tasks` — Create a new task with title, description, due date, and status (Protected).
- `POST /api/tasks/list` — Retrieve paginated tasks with search queries (`query`), filtering by status, and custom sorting (Protected).
- `PUT /api/tasks/:id` — Update task fields or change status (`Pending`, `In Progress`, `Completed`) (Protected).
- `DELETE /api/tasks/:id` — Soft-delete a task from active views (Protected).

---

## 📜 Available NPM Scripts

| Script            | Command                   | Purpose                                              |
| :---------------- | :------------------------ | :--------------------------------------------------- |
| `npm run dev`     | `tsx watch src/server.ts` | Starts the dev server with instant hot-reloading     |
| `npm start`       | `tsx src/server.ts`       | Runs the server directly using `tsx`                 |
| `npm run build`   | `tsc`                     | Transpiles TypeScript files into production-ready JS |
| `npm run prepare` | `husky`                   | Initializes Husky git hooks (`pre-commit`)           |

---

## 🛡️ Code Quality & Git Hooks

This project enforces strict code formatting and zero-warning linting through **Husky** and **lint-staged**. Before any commit is finalized, linting automatically verifies changed `.ts` files to guarantee high codebase integrity.

---

## 📄 License

Licensed under the **ISC License**.
