# Workspace Task Manager API

A secure REST API built with **Node.js, Express and MongoDB** that lets users sign up, create workspaces, and manage tasks inside them. Authentication uses **JWT**, inputs are validated with **Zod**, and every workspace and task is protected by ownership checks, so users can only access their own data.

## Features

- User signup and signin with hashed passwords (bcrypt)
- JWT-based authentication middleware
- Input validation with Zod
- Workspace CRUD (create, list, delete)
- Task CRUD (create, list, mark complete, delete)
- Ownership checks on every workspace and task operation
- Consistent error handling for invalid input, missing tokens, bad credentials and nonexistent IDs

## Tech Stack

| Layer          | Technology            |
| -------------- | --------------------- |
| Runtime        | Node.js               |
| Framework      | Express               |
| Database       | MongoDB (Mongoose)    |
| Auth           | JSON Web Tokens (JWT) |
| Validation     | Zod                   |
| Password hash  | bcrypt                |
| API testing    | Postman               |

## Data Models

**User**
| Field    | Type   | Notes            |
| -------- | ------ | ---------------- |
| name     | String |                  |
| email    | String | unique           |
| password | String | hashed           |

**Workspace**
| Field  | Type     | Notes                |
| ------ | -------- | -------------------- |
| name   | String   |                      |
| owner  | ObjectId | ref: `User`          |

**Task**
| Field     | Type     | Notes                 |
| --------- | -------- | --------------------- |
| title     | String   |                       |
| completed | Boolean  | default `false`       |
| workspace | ObjectId | ref: `Workspace`      |


## Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB database (local or MongoDB Atlas)
- Postman (optional, for testing)

### Installation

```bash
git clone https://github.com/partha2003-unofficial/user-workspace.git
cd user-workspace
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=port_name
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the server

```bash
node index.js
```

The API runs at `http://localhost:<PORT>`.

## API Endpoints

### Auth

| Method | Endpoint  | Description                      | Auth |
| ------ | --------- | -------------------------------- | ---- |
| POST   | `/signup` | Register a new user              | No   |
| POST   | `/signin` | Log in and receive a JWT         | No   |

### Workspaces

| Method | Endpoint           | Description                  | Auth |
| ------ | ------------------ | ---------------------------- | ---- |
| POST   | `/workspaces`      | Create a workspace           | Yes  |
| GET    | `/workspaces`      | List your workspaces         | Yes  |
| DELETE | `/workspaces/:id`  | Delete a workspace you own   | Yes  |

### Tasks

| Method | Endpoint       | Description                              | Auth |
| ------ | -------------- | ---------------------------------------- | ---- |
| POST   | `/tasks`       | Create a task in a workspace             | Yes  |
| GET    | `/tasks`       | List tasks of a workspace                | Yes  |
| PATCH  | `/tasks/:id`   | Update task completion status            | Yes  |
| DELETE | `/tasks/:id`   | Delete a task                            | Yes  |


### Authentication

Protected routes require the JWT in the `Authorization` header:

```
Authorization: <your_jwt_token>
```

(Use `Bearer <token>` if your middleware expects that format.)

### Example Requests

**Signup**
```http
POST /signup
Content-Type: application/json

{
  "name": "John Doe",
  "password": "securePassword123"
}
```

**Signin**
```http
POST /signin
Content-Type: application/json

{
  "name": "john",
  "password": "securePassword123"
}
```
Response:
```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

**Create workspace**
```http
POST /workspaces
Authorization: <token>
Content-Type: application/json

{ "name": "College Projects" }
```

## Project Structure

```
.
├── src
│   ├── config        # DB connection and env setup
│   ├── models        # User, Workspace, Task schemas
│   ├── middleware    # JWT auth middleware
│   ├── routes        # auth, workspace, task routes
│   ├── validators    # Zod schemas
│   └── index.js      # App entry point
├── .env
├── package.json
└── README.md
```

## Security

- Passwords are hashed before being stored and never returned in responses
- JWT is verified on every protected route and the user is loaded from MongoDB into `req.user`
- Every workspace and task operation verifies that the resource belongs to the logged-in user

## Testing

All endpoints were tested manually with Postman, covering:

- Invalid or missing input
- Missing or invalid tokens
- Incorrect credentials
- Nonexistent IDs
- Attempts to access another user's workspaces or tasks

## Contributing

Contributions, issues and feature requests are welcome. Fork the repo, create a branch, and open a pull request.

