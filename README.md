# Task Management API

A secure, full-featured Task Management API built with **Next.js**, **Prisma**, and **PostgreSQL**. This API provides complete user authentication, task CRUD operations, category management, and advanced filtering capabilities.

## 🚀 Features

- **🔐 JWT Authentication** - Secure user registration and login
- **📋 Task Management** - Full CRUD operations with user-specific access
- **📁 Category System** - Organize tasks with categories
- **🔍 Advanced Filtering** - Filter tasks by category and status
- **✅ Input Validation** - Comprehensive validation using Zod
- **🛡️ Secure Middleware** - JWT-based route protection
- **📊 Clean Architecture** - Modular code structure

## 🛠️ Tech Stack

- **Framework:** Next.js 15.4.5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **Node.js:** 18+

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-managment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/taskdb"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## 📋 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Categories

#### Get All Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "categories": [
    {
      "id": "category_id",
      "name": "Work",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Category
```http
POST /api/categories
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Personal"
}
```

### Tasks

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `category` - Filter by category name
- `status` - Filter by status (PENDING, COMPLETED)

**Examples:**
```http
GET /api/tasks?category=Work
GET /api/tasks?status=COMPLETED
GET /api/tasks?category=Work&status=PENDING
```

**Response:**
```json
{
  "tasks": [
    {
      "id": "task_id",
      "title": "Complete project",
      "description": "Finish the task management API",
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "category": {
        "id": "category_id",
        "name": "Work"
      }
    }
  ]
}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete documentation",
  "description": "Write API documentation",
  "status": "PENDING",
  "categoryId": "category_id"
}
```

#### Update Task
```http
PUT /api/tasks/{task_id}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "COMPLETED"
}
```

#### Delete Task
```http
DELETE /api/tasks/{task_id}
Authorization: Bearer <jwt_token>
```

## 🧪 Testing

Use the provided `test.rest` file with the REST Client extension in VS Code:

1. **Install REST Client extension**
2. **Open `test.rest` file**
3. **Update the `@token` variable** with your JWT token from login
4. **Click "Send Request"** above each test case

## 📁 Project Structure

```
├── app/
│   └── api/
│       ├── auth/
│       │   ├── register/route.js
│       │   └── login/route.js
│       ├── tasks/
│       │   ├── route.js
│       │   └── [id]/route.js
│       └── categories/
│           └── route.js
├── lib/
│   ├── prisma.js          # Prisma client configuration
│   ├── middleware.js      # JWT verification middleware
│   └── validation.js      # Zod validation schemas
├── prisma/
│   └── schema.prisma      # Database schema
├── test.rest              # API testing file
└── .env                   # Environment variables
```

## 🔒 Security Features

- **Password Hashing:** bcrypt with salt rounds of 12
- **JWT Tokens:** 7-day expiration with secure secret
- **User Isolation:** Users can only access their own tasks
- **Input Validation:** Comprehensive validation on all endpoints
- **SQL Injection Protection:** Prisma ORM prevents SQL injection

## 🎯 Database Schema

### Users
- `id` - Unique identifier
- `email` - Unique email address
- `password` - Hashed password
- `name` - User's full name
- `createdAt` / `updatedAt` - Timestamps

### Categories
- `id` - Unique identifier
- `name` - Unique category name
- `createdAt` / `updatedAt` - Timestamps

### Tasks
- `id` - Unique identifier
- `title` - Task title (required)
- `description` - Task description (optional)
- `status` - PENDING or COMPLETED
- `userId` - Foreign key to Users
- `categoryId` - Foreign key to Categories
- `createdAt` / `updatedAt` - Timestamps

## 🚀 Deployment

Ready to deploy to Vercel:

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📝 License

This project is part of a backend development learning exercise (Week 6: Task Management API).

**Built with ❤️ using Next.js, Prisma, and PostgreSQL**

