# ResumeFlow v2 API 🚀

A RESTful backend API for building and managing resumes, developed using **Node.js**, **Express.js**, **MySQL**, and **Sequelize ORM**.

The project follows a modular architecture with secure authentication, user management, and resume management. It is designed to be scalable so additional modules like Education, Experience, Skills, Projects, and Certifications can be added easily.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- User Logout

### 👤 User Management
- Get Profile
- Update Profile
- Delete Account

### 📄 Resume Management
- Create Resume
- Get All User Resumes
- Get Resume by ID
- Update Resume
- Delete Resume

### 🛡️ Security
- JWT Authorization
- Password Hashing
- Protected APIs
- Resource Ownership Verification
- Secure CRUD Operations
- Email Normalization
- Model Validations

---

# 🏗️ Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

# 📁 Project Structure

```
ResumeFlow_v2
│
├── config/
│   └── config.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── resumeController.js
│
├── middleware/
│   ├── authenticateUser.js
│   └── errorHandler.js
│
├── migrations/
│
├── models/
│   ├── index.js
│   ├── user.js
│   └── resume.js
│
├── routes/
│   ├── auth.js
│   ├── users.js
│   └── resumes.js
│
├── .env
├── app.js
└── package.json
```

---

# 🗄️ Database Design

## Users

| Field | Type |
|--------|------|
| id | INTEGER |
| name | STRING |
| email | STRING |
| password | STRING |
| created_at | DATE |
| updated_at | DATE |

---

## Resumes

| Field | Type |
|--------|------|
| id | INTEGER |
| user_id | INTEGER (FK) |
| title | STRING |
| template | STRING |
| created_at | DATE |
| updated_at | DATE |

---

# 🔗 Relationships

```
User
 │
 │ hasMany
 ▼
Resume

Resume
 │
 │ belongsTo
 ▼
User
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/logout` | Logout User |

---

## Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users/profile` | Get Profile |
| PUT | `/api/users/profile` | Update Profile |
| DELETE | `/api/users/profile` | Delete Account |

---

## Resumes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/resumes` | Create Resume |
| GET | `/api/resumes` | Get All Resumes |
| GET | `/api/resumes/:id` | Get Resume by ID |
| PUT | `/api/resumes/:id` | Update Resume |
| DELETE | `/api/resumes/:id` | Delete Resume |

---

# 🔐 Authentication

Protected routes require a JWT token.

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/its-deepesh/ResumeFlowAPI-v2.git
```

Go into the project

```bash
cd ResumeFlowAPI-v2
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=resumeflow_v2

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

Run migrations

```bash
npx sequelize-cli db:migrate
```

Start the server

```bash
npm start
```

or

```bash
node app.js
```

---

# 🛡️ Security Features

- Passwords are hashed before storing.
- JWT-based authentication.
- Protected routes using middleware.
- Users can only access their own resumes.
- Resource ownership verification.
- Foreign key constraints.
- Cascade delete between User and Resume.

---

# 📈 Current Progress

## ✅ Completed

### Authentication Module
- [x] Register
- [x] Login
- [x] Logout
- [x] JWT Authentication
- [x] Password Hashing
- [x] Authentication Middleware

### User Module
- [x] Get Profile
- [x] Update Profile
- [x] Delete Account

### Resume Module
- [x] Create Resume
- [x] Get All Resumes
- [x] Get Resume by ID
- [x] Update Resume
- [x] Delete Resume

---

## 🚧 Upcoming Modules

- Education
- Experience
- Projects
- Skills
- Certifications
- AI Resume Suggestions (Mock API)
- Resume Templates
- Resume Import
- Resume Export

---

# 📚 Concepts Implemented

- REST API Design
- MVC Architecture
- Sequelize ORM
- Model Validations
- Sequelize Hooks
- Database Migrations
- One-to-Many Associations
- JWT Authentication
- Authorization
- Password Hashing
- Error Handling Middleware
- Environment Variables
- Secure CRUD Operations
- Foreign Keys
- Cascade Delete

---

# 👨‍💻 Author

**Deepesh Singh**

GitHub: https://github.com/its-deepesh

---

## ⭐ Project Status

**ResumeFlow v2** is actively under development.

Current version includes a complete Authentication, User Management, and Resume Management system. Upcoming releases will focus on Education, Experience, Projects, Skills, Certifications, and AI-powered resume features.