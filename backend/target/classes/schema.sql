-- Run this once to create the database (table will be auto-created by Hibernate ddl-auto=update,
-- but this file is provided for reference / manual setup)

CREATE DATABASE task_management_db;

\c task_management_db;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(2000),
    assigned_to VARCHAR(255) NOT NULL,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('HIGH','MEDIUM','LOW')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING','IN_PROGRESS','COMPLETED')),
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
