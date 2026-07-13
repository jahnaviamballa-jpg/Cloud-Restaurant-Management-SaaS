# Installation Guide

## Project Requirements

- Node.js
- Python 3.12
- PostgreSQL
- Docker

## Clone Repository

git clone repository-url

## Backend Setup

cd backend

pip install -r requirements.txt

Run backend:

uvicorn app.main:app --reload

## Frontend Setup

cd frontend

npm install

npm run dev

## Database Configuration

Configure PostgreSQL database URL.

## Environment Variables

Required:

DATABASE_URL

SECRET_KEY

JWT_ALGORITHM

VITE_API_BASE_URL

## Running Locally

Start backend and frontend separately.

## Deployment Steps

1. Push code to GitHub.
2. Deploy backend on Render.
3. Deploy frontend on Render.
4. Configure environment variables.