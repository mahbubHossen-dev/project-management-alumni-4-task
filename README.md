# Smart Project & Task Collaboration System (Server)

A full-stack project management platform that helps teams manage projects, tasks, team members, and work progress efficiently. The system supports role-based access control, project tracking, task management, analytics, and collaboration features.

## Features Overview

### Authentication & Authorization

* User Registration & Login
* Firebase Authentication
* JWT Protected Routes
* Role-Based Access Control

  * Admin
  * Project Manager
  * Team Member

### Project Management

* Create Projects
* Update Project Details
* Delete Projects
* Search Projects
* Filter by Project Status
* Deadline Tracking

### Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Assign Team Members
* Task Status Tracking
* Priority Levels (High, Medium, Low)
* Deadline Validation
* Duplicate Task Prevention Within Same Project

### Team Collaboration

* Add Team Members to Projects
* Manage Assigned Members
* Activity Tracking

### Search & Productivity Features

* Search Tasks by Title or Description
* Search Projects by Name
* Filter by:

  * Status
  * Priority
  * Assigned Member
  * Deadline Status
* Sort by:

  * Latest Created
  * Nearest Deadline
  * Recently Updated

### Analytics Dashboard

* Tasks by Priority
* Task Status Distribution
* Team Productivity Overview
* Project Progress Trend

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* CORS
* dotenv

### Frontend

* React.js
* React Router
* TanStack Query
* Tailwind CSS
* DaisyUI
* Recharts
* Axios

---

## Environment Variables

Create a `.env` file in the root directory and add:

DB_USER=your_database_user

DB_PASS=your_database_password

CLIENT_URL=your_client_url

---

## Project Setup Instructions

### Clone Repository

git clone YOUR_SERVER_REPOSITORY_LINK

cd alumni-4-task-server

### Install Dependencies

npm install

### Run Development Server

npm run dev

### Production

npm start

---

## Demo Credentials

### Admin

Email: [admin@example.com](mailto:admin@example.com)

Password: Admin123@

### Project Manager

Email: [manager@example.com](mailto:manager@example.com)

Password: Manager123@

### Team Member

Email: [member@example.com](mailto:member@example.com)

Password: Member123@

---

## API Endpoints

### Projects

GET /projects

POST /projects

PATCH /projects/:id

DELETE /projects/:id

PATCH /projects/add-member/:id

### Tasks

GET /tasks

POST /tasks

PATCH /tasks/:id

PATCH /tasks/status/:id

DELETE /tasks/:id

### Analytics

GET /analytics/task-priority

GET /analytics/task-status

GET /analytics/team-productivity

GET /analytics/project-progress

---

## Deployment Instructions

### Backend Deployment (Vercel)

Install Vercel CLI

npm install -g vercel

Login

vercel login

Deploy

vercel --prod

### Environment Variables

Add all required environment variables in the Vercel Dashboard:

* DB_USER
* DB_PASS

Redeploy after updating variables.

---

## Live Links

Frontend: https://alumni-4-task.web.app/

