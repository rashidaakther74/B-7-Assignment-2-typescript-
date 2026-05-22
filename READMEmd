# Issue Tracking API

A simple REST API built with Node.js, TypeScript, Express, and PostgreSQL.

## Features
 User signup & login
 JWT authentication
 Role-based access (Contributor, Maintainer)
 Create, read, update, delete issues
 Filter & sort issues

## Tech Stack
 Node.js
 Express.js
 TypeScript
 PostgreSQL
 JWT
 bcryptjs

## Authentication
Use JWT token in headers:
Authorization: <JWT_TOKEN>

## Roles
Contributor:
 Create issue
 Update own open issues only

Maintainer:
 Full access
 Can delete any issue

## API Endpoints

Auth:
 POST /api/auth/signup
 POST /api/auth/login

Issues:
 POST /api/issues (auth required)
 GET /api/issues
 GET /api/issues/:id
 PATCH /api/issues/:id (auth required)
 DELETE /api/issues/:id (maintainer only)

## Request Body (Create Issue)
{
  "title": "Bug title",
  "description": "Bug description",
  "type": "bug"
}

## Database
PostgreSQL with connection pooling (pg Pool)

## Setup
npm install  
npm run dev