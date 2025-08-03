This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
Week 6: Build a Task Management API
Zemenay TechJuly 11, 2025
Overview
Welcome to Week 6 of your backend development journey! This week, you'll focus on a hands-on exercise to solidify your skills from the past five weeks. Instead of new lessons, you'll build a Task Management API using Next.js, Prisma, and PostgreSQL. The project involves creating a secure, modular API for users to manage tasks, with features like authentication, categorization, and filtering. You'll work individually to design and implement the API, applying your knowledge of CRUD operations, JWT authentication and middleware. The week culminates in an in-person session to present your work and receive feedback.

Learning Objectives
Apply Prisma and PostgreSQL to design and implement a database schema with relationships.
Build secure Next.js API routes with JWT authentication and middleware.
Implement CRUD operations and filtering for tasks and categories.
Organize code in a modular structure using utilities and middleware.
Use Git and GitHub for version control.

Weekly Schedule
Day 1: Project Setup and Planning
Exercise Focus:

Initialize a Next.js project and set up Prisma with a PostgreSQL database (local or via Supabase).
Plan the database schema: Users (for authentication), Tasks (with title, description, status), and Categories (e.g., Work, Personal).
Outline API routes: auth routes (/api/auth/*), task routes (/api/tasks/*), and category routes (/api/categories/*).
Day 2: Database Schema and Authentication
Exercise Focus:

Define the Prisma schema for Users, Tasks, and Categories.
Run prisma migrate to set up the database.
Implement authentication routes:

POST /api/auth/register: Create a user with password hashing (bcrypt).
POST /api/auth/login: Authenticate and return a JWT.
Tips:

Use Prisma Studio to verify the database schema.
Test authentication routes with Postman or ThunderClient.
Commit changes to a feature branch.

Day 3: CRUD Operations for Tasks
Exercise Focus:

Implement CRUD routes for tasks:

GET /api/tasks: List all tasks for the authenticated user.
POST /api/tasks: Create a new task (JWT-protected).
PUT /api/tasks/[id]: Update a task.
DELETE /api/tasks/[id]: Delete a task.
Add middleware to verify JWT for protected routes.
Tips:

Use Prisma Client for CRUD operations (e.g., findMany, create, update, delete).
Ensure only the authenticated user can access their tasks.
Push changes to a feature branch.
Day 4: Categories and Filtering
Exercise Focus:

Implement routes for categories:

GET /api/categories: List all categories.
POST /api/categories: Create a category (JWT-protected).
Add filtering to the task list:
GET /api/tasks?category=work: Filter tasks by category.
GET /api/tasks?status=completed: Filter tasks by status (e.g., pending, completed).
Tips:

Use Prisma’s filtering capabilities (e.g., where clause) for queries.
Test filtering with multiple parameters in Postman or ThunderClient.
Commit changes to a feature branch.
Day 5: Error Handling and Deployment
Exercise Focus:

Add error handling and input validation (e.g., using Zod or Joi) for all API routes.
Refactor code into a modular structure (e.g., /lib/prisma.ts, /utils/, /middlewares/).
Deploy the API to Vercel or Railway.
Tips:

Validate inputs (e.g., task title not empty, valid category ID).
Test the deployed API to ensure all routes work correctly.
Push final changes and create a pull request to merge into main.
Day 6: In-Person Presentation
Exercise Focus:

Present your Task Management API during the in-person session:

Demonstrate all API routes using Postman or ThunderClient (auth, CRUD, filtering).
Show the GitHub repository with clear commit history, branches, and pull requests.
Share the deployed API URL and test it live.
Discuss challenges faced and solutions implemented.
Receive and provide feedback to peers.
Tips:

Prepare a brief demo script to showcase key features (e.g., registering a user, creating tasks, filtering by category).
Document your API in the GitHub README (e.g., list endpoints, example requests).
Test the deployed API thoroughly before the presentation.

Additional Notes
Exercise Scope: The Task Management API is designed to be achievable within a week, focusing on core backend skills. If working in groups, assign roles (e.g., schema design, API routes, deployment) to divide work.
Collaboration: Use a GitHub repository for version control. Create feature branches (e.g., feature/auth, feature/tasks) and use pull requests for code reviews.
Testing: Test all API routes thoroughly with Postman or ThunderClient, including edge cases (e.g., invalid inputs, unauthorized access).
Enhancements: Feel free to add optional features like task priorities, due dates, or user roles (e.g., admin to manage categories) to challenge yourself.
Tools: Use VS Code for coding, Postman or ThunderClient for API testing, and ensure Node.js, Git, and PostgreSQL are set up.


HAPPY CODING!

