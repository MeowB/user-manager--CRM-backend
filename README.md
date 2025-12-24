# User Management API

Backend service for the User Management CRM application.
Provides API infrastructure for authentication and user persistence

## Tech Stack
- Node.js
- Express
- Prisma ORM (v7)
- PostgreSQL
- TypeScript

## Related Repositories
- Frontend: https://github.com/MeowB/user-manager--CRM-frontend

## Architecture Overview
- Express server
- Prisma 7 with PostgreSQL driver adapter
- Route-based structure

## Routes

- `GET /health`: Health check endpoint.

## Setup (Local Development)

### Requirements
- Node.js >= 18
- PostgreSQL running locally

### Environment Variables
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

### Run
npm install
npx prisma generate
npm run dev