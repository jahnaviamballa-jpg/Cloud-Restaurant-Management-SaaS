# Cloud Deployment

## Overview

This project will be deployed on cloud platforms.

The frontend, backend, and database will be hosted using cloud services.

Cloud deployment provides:

- High Availability
- Scalability
- Reliability
- Easy Maintenance
- Secure Access

The application can be deployed on services such as Render, AWS, or Microsoft Azure.

---

# Cloud Folder

## Purpose

This folder contains all cloud deployment, Docker, monitoring, and security documentation.

It includes Docker configuration files, deployment guides, cloud architecture, environment variable documentation, monitoring setup, and security-related resources.

---

## Deployment Workflow

1. Develop the application.
2. Push the source code to GitHub.
3. Build Docker images.
4. Deploy the backend.
5. Deploy the frontend.
6. Connect the PostgreSQL database.
7. Configure environment variables.
8. Enable Auto Deploy.
9. Monitor the deployed application.

---

## Cloud Technologies Used

- Docker
- Docker Compose
- Render
- PostgreSQL
- Environment Variables
- GitHub

---

## Future Deployment Plan

- Containerize the backend and frontend using Docker.
- Deploy both services on Render.
- Host the PostgreSQL database on Render PostgreSQL.
- Configure environment variables securely.
- Enable automatic deployment through GitHub.
- Add monitoring and logging for application health.
- Support deployment to AWS and Microsoft Azure in the future.

---

## Folder Structure

```
cloud/
│
├── deployment/
├── docker/
├── monitoring/
├── security/
├── README.md
├── deployment_plan.md
├── cloud_architecture.md
├── research.md
└── render.yaml
```

---

## Maintained By

**Member 3 – Cloud & DevOps**

Responsible for:

- Cloud Deployment
- Docker Configuration
- Render Configuration
- Environment Variables
- Deployment Documentation
- Cloud Architecture
- Monitoring & Security Planning
## Running with Docker

### 1. Install Docker Desktop

Download Docker Desktop and ensure it is running.

### 2. Run Docker Compose
----
docker compose -f cloud/docker/docker-compose.yml up
----
### 3. Open Frontend

http://localhost:5173

### 4. Open Backend Swagger

http://localhost:8000/docs

---

## Backend Deployment

### Platform

Render

### Live API

https://your-backend.onrender.com

### Swagger

https://your-backend.onrender.com/docs

### Deployment Steps

1. Create Render account.
2. Connect GitHub repository.
3. Configure backend.
4. Add environment variables.
5. Deploy the application.