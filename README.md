# Task Management System

Full-stack Task Management Application.
- **Frontend:** React.js
- **Backend:** Java Spring Boot
- **Database:** PostgreSQL

## Folder Structure
```
task-management-system/
├── backend/        Spring Boot app
└── frontend/        React app
```

## Database Fields (tasks table)
| Field        | Type      |
|--------------|-----------|
| id           | BIGSERIAL (PK) |
| title        | VARCHAR   |
| description  | VARCHAR   |
| assigned_to  | VARCHAR   |
| priority     | VARCHAR (HIGH/MEDIUM/LOW) |
| status       | VARCHAR (PENDING/IN_PROGRESS/COMPLETED) |
| due_date     | DATE      |
| created_at   | TIMESTAMP |

## API Endpoints

| Method | Endpoint                     | Description                          |
|--------|-------------------------------|---------------------------------------|
| GET    | /api/tasks                   | Get all tasks                         |
| GET    | /api/tasks/{id}               | Get task by ID                        |
| POST   | /api/tasks                   | Create new task                       |
| PUT    | /api/tasks/{id}                | Update task (full update)             |
| PATCH  | /api/tasks/{id}/status         | Update only task status               |
| DELETE | /api/tasks/{id}                | Delete task                           |
| GET    | /api/tasks/search?title=&assignedTo=&priority=&status= | Search & filter tasks |
| GET    | /api/tasks/dashboard           | Get dashboard stats (total/pending/in-progress/completed) |

### Sample request body (POST/PUT)
```json
{
  "title": "Design login page",
  "description": "Create UI mockups for login screen",
  "assignedTo": "John Doe",
  "priority": "HIGH",
  "status": "PENDING",
  "dueDate": "2026-07-15"
}
```

### Sample PATCH status body
```json
{ "status": "IN_PROGRESS" }
```

## Setup & Execution Steps

### 1. Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+ and npm
- PostgreSQL 14+ installed and running

### 2. Database Setup
```bash
# Login to psql
psql -U postgres

# Create database
CREATE DATABASE task_management_db;
\q
```
(Tables are auto-created by Hibernate `ddl-auto=update` on first run — no manual schema needed.
`backend/src/main/resources/schema.sql` is provided for reference only.)

### 3. Backend Setup
```bash
cd backend

# Edit src/main/resources/application.properties if your DB
# username/password differ from the default postgres/postgres

# Build and run
mvn clean install
mvn spring-boot:run
```
Backend will start at: **http://localhost:8080**

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will start at: **http://localhost:3000**

### 5. Usage
1. Open http://localhost:3000 in your browser.
2. Dashboard shows Total / Pending / In Progress / Completed task counts.
3. Click **+ Add New Task** to create a task (Title, Description, Assigned To, Priority, Status, Due Date — all mandatory fields validated; due date cannot be in the past).
4. Use the search bar to search by **Task Title** or **Assigned To**, and dropdowns to filter by **Priority** / **Status**, then click **Search**. Click **Reset** to clear filters.
5. In the task table you can:
   - **Edit** a task
   - **Delete** a task
   - Change the **Status** directly from the dropdown in the table row


