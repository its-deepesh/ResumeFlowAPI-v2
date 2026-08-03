# ResumeFlow v2

ResumeFlow v2 is a RESTful Resume Builder API built with **Node.js**, **Express.js**, **MySQL**, and **Sequelize ORM**.

This project is a complete rebuild of the original ResumeFlow internship project. Unlike the first version, which used a JSON file as the database, ResumeFlow v2 uses MySQL with Sequelize to provide a scalable and production-ready backend architecture.

---

## 🚀 Current Progress

### Completed

- Project initialization
- Express server setup
- Sequelize ORM configuration
- MySQL database connection
- Environment variable configuration using `dotenv`
- User model creation
- User migration
- Database migration execution
- User model validations
- Email normalization using Sequelize Hooks

### In Progress

- Authentication Module

### Planned

- Documents
- Sections
- Items
- Versions
- Templates
- AI Mock APIs
- Job Applications

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- dotenv
- Nodemon
- Sequelize CLI

---

# 📁 Project Structure

```
ResumeFlow-v2/
│
├── config/
├── controllers/
├── middleware/
├── migrations/
├── models/
├── routes/
├── seeders/
├── services/
├── validations/
├── utils/
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

# 🗄️ Database

## Current Tables

- users
- SequelizeMeta

---

# 👤 User Model

| Field | Type | Description |
|------|------|-------------|
| id | INTEGER | Primary Key |
| name | STRING | User's full name |
| email | STRING | Unique email address |
| password | STRING | Hashed password *(coming next)* |
| created_at | DATE | Record creation timestamp |
| updated_at | DATE | Record update timestamp |

---

# ✅ Model Features

### User Model

- Name validation
- Email validation
- Password validation
- Unique email constraint
- Email normalization hook
- Automatic timestamps
- Snake case database columns

---

# 📌 Development Workflow

Every feature in ResumeFlow v2 follows this workflow:

```
Requirement
        ↓
Database Design
        ↓
ER Diagram
        ↓
Migration
        ↓
Model
        ↓
Validation
        ↓
Hooks
        ↓
Controller
        ↓
Routes
        ↓
Testing
        ↓
Git Commit
```

---

# 🔜 Upcoming Modules

- Authentication
- Documents
- Sections
- Items
- Versions
- Templates
- AI Mock APIs
- Applications

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project directory

```bash
cd ResumeFlow-v2
```

Install dependencies

```bash
npm install
```

Configure environment variables

Create a `.env` file.

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=resumeflow_v2

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

Run migrations

```bash
npx sequelize-cli db:migrate
```

Start the development server

```bash
npm run dev
```

---

# 🎯 Project Goals

- Learn production-level backend development.
- Replace JSON-based storage with MySQL and Sequelize.
- Build scalable REST APIs using the MVC architecture.
- Implement authentication and authorization using JWT.
- Apply database normalization and model associations.
- Follow clean code and Git best practices.

---

# 📈 Project Status

**Current Version:** v2.0.0

**Status:** 🚧 Under Development

---

## 👨‍💻 Author

**Deepesh Singh**

Built as part of backend development learning and internship using **Node.js**, **Express.js**, **MySQL**, and **Sequelize ORM**.
