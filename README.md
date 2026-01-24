Hospital Backend V2

This backend handles authentication, RBAC, patient management, appointment workflows, caching, background jobs, and logging

Tech Stacks

Node.js + Express + MongoDB + Docker + Redis

Architecture:
Clean layered backend:
Controller → Service → Repository

Modules:
Auth, Users, Patients, Appointments

Future:
Will support Web + Mobile apps using same APIs.


## Environment Variables


The application requires the following environment variables:


- PORT
- NODE_ENV
- MONGO_URI
- REDIS_URL
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- ACCESS_TOKEN_EXPIRY
- REFRESH_TOKEN_EXPIRY


Refer to `.env.example` for setup.