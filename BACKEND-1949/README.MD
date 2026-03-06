# BACKEND-1949

Backend REST API for barber appointment management.

Current stack:
- Node.js
- Express
- MongoDB + Mongoose
- JWT (access + refresh)
- bcryptjs
- dotenv
- cors

## Current project structure

```txt
BACKEND-1949/
|-- App.js
|-- package.json
|-- README.MD
`-- src/
    |-- controllers/
    |   |-- appointmentController.js
    |   |-- authController.js
    |   |-- meController.js
    |   `-- userController.js
    |-- DataBase/
    |   |-- db.js
    |   `-- seed.js
    |-- middlewares/
    |   |-- verifyAdmin.js
    |   `-- verifyToken.js
    |-- models/
    |   |-- Appointment.js
    |   `-- user.js
    `-- router/
        |-- appointmentsRouter.js
        |-- authRouter.js
        |-- meRouter.js
        `-- userRouter.js
```

## Environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/barber_db
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

## Installation and run

```bash
npm install
npm run dev
```

Available scripts:
- `npm run dev`: runs `nodemon App.js`
- `npm start`: runs `node App.js`

Server base URL:
- `http://localhost:3000`

## Authentication model

- `POST /auth/login` returns:
  - `accessToken` (expires in 15m)
  - `refreshToken` (expires in 7d)
- Protected endpoints require header:
  - `Authorization: Bearer <accessToken>`
- `POST /auth/refresh` receives a refresh token and returns a new access token.

## API endpoints (current)

### Auth

- `POST /auth/register`
  - Public
  - Required body: `name`, `secondName`, `email`, `password`, `repeatPassword`, `phone`

- `POST /auth/login`
  - Public
  - Required body: `email`, `password`

- `POST /auth/refresh`
  - Public
  - Required body: `refreshToken`

### Me (authenticated user)

- `GET /me`
  - Requires token
  - Returns current logged user (without password)

- `PATCH /me`
  - Requires token
  - Required body: `name`, `secondName`, `email`, `phone`
  - Optional: `password`, `repeatPassword`

### Users (admin only)

- `GET /users`
  - Requires token + admin role
  - Returns all users

- `PATCH /users/:id`
  - Requires token + admin role
  - Required body: `name`, `secondName`, `email`, `phone`, `role`
  - Optional: `password`

- `DELETE /users/:id`
  - Requires token + admin role
  - Deletes user by id

### Appointments

- `GET /appointments`
  - Requires token + admin role
  - Returns all appointments

- `POST /appointments`
  - Requires token
  - Allowed only for role `user`
  - Required body: `service`, `date`

- `GET /appointments/:id`
  - Requires token
  - Returns appointment by id

- `PATCH /appointments/:id`
  - Requires token
  - Allowed for admin or appointment owner
  - Optional body fields: `status`, `date`, `service`

- `DELETE /appointments/:id`
  - Requires token + admin role
  - Deletes appointment by id

## Seed (demo data)

To create demo users:

```bash
node src/DataBase/seed.js
```

Current seed users:
- Admin: `123@test.com` / `12345678`
- User: `om2@gmail.com` / `12345678`

## Notes about current behavior

- Passwords are hashed with bcrypt in model pre-save hook.
- CORS currently allows `http://localhost:5173`.
- There is no automated test suite yet (`npm test` is placeholder).
