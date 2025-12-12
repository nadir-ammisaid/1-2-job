# 1, 2, Job!

This repository contains a full-stack job board web application built for team development.  
It includes a **frontend (React + Vite)**, a **backend (Node.js + Express)**, **authentication system**, and a **MySQL database**.

---

## 🚀 Project Overview

A modern job board platform that allows users to browse jobs, apply for positions, manage their profiles, and view company information. The project features user authentication, protected routes, and a complete CRUD system for jobs, users, applications, and companies.

---

## 🗂️ Project Structure

```
T-WEB-501-LYO_15/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── connection.js           # MySQL database connection
│   │   ├── controllers/
│   │   │   ├── application.controller.js
│   │   │   ├── company.controller.js
│   │   │   ├── job.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js      # JWT authentication
│   │   ├── models/
│   │   │   ├── Application.js
│   │   │   ├── Company.js
│   │   │   ├── Job.js
│   │   │   └── User.js
│   │   └── routes/
│   │       ├── application.routes.js
│   │       ├── company.routes.js
│   │       ├── job.routes.js
│   │       └── user.routes.js
│   ├── scripts/
│   │   └── reset-db.js                 # Database reset utility
│   ├── public/
│   │   └── logos/                      # Company logos storage
│   ├── server.js                       # Main server file
│   ├── schema.sql                      # Database schema
│   ├── package.json
│   └── .env.sample
│
├── frontend/
│   ├── public/
│   │   └── 12jobLogo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── application/
│   │   │   │   ├── ApplicationForm.jsx
│   │   │   │   └── ApplicationsList.jsx
│   │   │   ├── auth/
│   │   │   │   ├── AuthProvider.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── company/
│   │   │   │   └── FirstSection.jsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   └── TitleSection.jsx
│   │   │   ├── job/
│   │   │   │   └── JobSection.jsx
│   │   │   ├── layout/
│   │   │   │   └── Header.jsx
│   │   │   └── profile/
│   │   │       ├── DetailProfil.jsx
│   │   │       ├── EditProfile.jsx
│   │   │       ├── FirstSection.jsx
│   │   │       └── SecondSection.jsx
│   │   ├── config/
│   │   │   └── axiosConfig.js          # Axios configuration
│   │   ├── hooks/
│   │   │   └── useAuth.js              # Authentication hook
│   │   ├── pages/
│   │   │   ├── private/
│   │   │   │   ├── ApplyJobPage.jsx
│   │   │   │   ├── CompanyPage.jsx
│   │   │   │   ├── EditProfilePage.jsx
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── MyApplicationsPage.jsx
│   │   │   │   └── ProfilePage.jsx
│   │   │   └── public/
│   │   │       ├── AuthenticationPage.jsx
│   │   │       └── LandingPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx                    # Router configuration
│   ├── .env.sample
│   ├── .prettierrc
│   ├── eslint.config.js
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                        # Root package for concurrent scripts
```

---

## ⚙️ Tech Stack

### Frontend

- [React 18](https://react.dev/) with [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/) for fast development and building
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for API requests
- ESLint + Prettier for code quality

### Backend

- [Node.js](https://nodejs.org/) with [Express 5](https://expressjs.com/)
- [MySQL 2](https://www.npmjs.com/package/mysql2) for database operations
- [JWT](https://jwt.io/) for authentication
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- [CORS](https://www.npmjs.com/package/cors) for cross-origin requests
- [dotenv](https://www.npmjs.com/package/dotenv) for environment variables

---

## 🧩 API Routes

### Jobs

| Method   | Endpoint        | Description                 | Auth Required |
| -------- | --------------- | --------------------------- | ------------- |
| `GET`    | `/api/jobs`     | Retrieve all job listings   | No            |
| `GET`    | `/api/jobs/:id` | Retrieve a single job by ID | No            |
| `POST`   | `/api/jobs`     | Create a new job entry      | Yes           |
| `PATCH`  | `/api/jobs/:id` | Update an existing job      | Yes           |
| `DELETE` | `/api/jobs/:id` | Delete a job                | Yes           |

### Users

| Method   | Endpoint           | Description               | Auth Required |
| -------- | ------------------ | ------------------------- | ------------- |
| `POST`   | `/api/users/login` | User authentication       | No            |
| `POST`   | `/api/users`       | Create a new user account | No            |
| `GET`    | `/api/users`       | Retrieve all users        | Yes           |
| `GET`    | `/api/users/:id`   | Retrieve user by ID       | Yes           |
| `PATCH`  | `/api/users/:id`   | Update user information   | Yes           |
| `DELETE` | `/api/users/:id`   | Delete user account       | Yes           |

### Applications

| Method   | Endpoint                     | Description                          | Auth Required |
| -------- | ---------------------------- | ------------------------------------ | ------------- |
| `GET`    | `/api/applications/user/:id` | Get applications for a specific user | Yes           |
| `POST`   | `/api/applications`          | Submit a new job application         | Yes           |
| `DELETE` | `/api/applications/:id`      | Delete an application                | Yes           |

### Companies

| Method   | Endpoint             | Description                | Auth Required |
| -------- | -------------------- | -------------------------- | ------------- |
| `GET`    | `/api/companies`     | Retrieve all companies     | No            |
| `GET`    | `/api/companies/:id` | Retrieve company by ID     | No            |
| `POST`   | `/api/companies`     | Create a new company       | No            |
| `PATCH`  | `/api/companies/:id` | Update company information | No            |
| `DELETE` | `/api/companies/:id` | Delete a company           | No            |

---

## 🛣️ Frontend Routes

### Public Routes

- `/` - Landing page with job listings
- `/authentication` - Login/Register page

### Protected Routes (Require Authentication)

- `/home` - User dashboard
- `/jobs/:jobId/apply` - Job application form
- `/my-applications` - User's job applications
- `/companies/:companyId?` - Company details
- `/profile` - User profile view
- `/profile/edit` - Edit user profile

---

## 🧰 Installation & Setup

### 1. Clone the repository

```bash
git clone git@github.com:EpitechMscProPromo2028/T-WEB-501-LYO_15.git
cd T-WEB-501-LYO_15
```

### 2. Install dependencies

#### Root (required)

```bash
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Environment Configuration

#### Frontend

Create a `.env` file in the `frontend/` directory:

```bash
cd frontend
cp .env.sample .env
```

Update the values:

```env
VITE_API_URL=http://localhost:4000
VITE_PORT=3000
```

#### Backend

Create a `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.sample .env
```

Update the values with your database credentials:

```env
PORT=4000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ntwJob
JWT_SECRET=your_jwt_secret_key
```

### 4. Database Setup

1. Create your MySQL database:

```sql
CREATE DATABASE ntwJob;
```

2. Run the SQL schema:

```bash
mysql -u <user> -p ntwJob < backend/schema.sql
```

**Or use the reset script:**

```bash
node backend/scripts/reset-db.js
```

### 5. Run the project

Start both frontend and backend concurrently from the root:

```bash
npm run dev
```

This will start:

- **Backend server** on http://localhost:4000
- **Frontend development server** on http://localhost:3000

Then open **http://localhost:3000** to access the application.

---

## 🔐 Authentication System

The application uses JWT (JSON Web Tokens) for authentication:

- **Registration**: Users can create accounts with email/password
- **Login**: Authentication returns a JWT token
- **Protected Routes**: Frontend routes are protected using `ProtectedRoute` component
- **API Protection**: Backend routes use `authenticateToken` middleware
- **Auto-redirect**: Unauthenticated users are redirected to `/authentication`

---

## 🧑‍💻 Development Guidelines

- Use **feature branches** derived from `dev`
- Create **Pull Requests** to merge into `main`
- Follow the **Conventional Commits** format:

```
<type>(<scope>): <description>
```

Examples:

```
feat(auth): add JWT authentication system
fix(jobs): resolve job listing pagination issue
chore(deps): update dependencies to latest versions
```

---

## 🗄️ Database Schema

The application uses MySQL with the following main tables:

- **users** - User accounts and profiles
- **companies** - Company information and logos
- **jobs** - Job listings linked to companies
- **applications** - User job applications with resumes

---

## 📜 License

This project is part of an **Epitech Master of Science coursework** and is intended for educational and collaborative use.

---

## 🧠 Authors

- **Nadir AMMI SAID**
- **Warith DIMIA**
- **Toni SAGE**

**Epitech Master of Science – Lyon 2028 Cohort**
