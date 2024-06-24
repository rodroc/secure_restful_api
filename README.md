# secure_restful_api

JWT Demo in Node.js

A RESTful API demo for a simplified task management system. The API demo is to allow users to create, read, update, and delete tasks. Additionally, users should be able to register and authenticate to ensure tasks are user-specific.

## Authentication and Authorization:
Uses JWT (JSON Web Tokens) for authentication.
Implements middleware to protect routes and ensure that users can only access their own tasks.

## Endpoints:

### User Registration and Login:
- `POST /register`: Register a new user.
- `POST /login`: Authenticate a user and return a JWT.

### Task Management:
- `POST /tasks`: Create a new task.
- `GET /tasks`: Retrieve all tasks for the authenticated user.
- `GET /tasks/:id`: Retrieve a specific task by ID.
- `PUT /tasks/:id`: Update a specific task by ID.
- `DELETE /tasks/:id`: Delete a specific task by ID.

### Task Attributes:
- `id` (auto-generated)
- `title` (string, required)
- `description` (string, optional)
- `dueDate` (date, optional)
- `completed` (boolean, default: false)
- `userId` (reference to the user who created the task)

### Validation:
- Necessary fields are validated.
- Returns appropriate HTTP status codes and error messages for validation failures.

### Database:
- Use a SQL database (e.g., sqlite)
- Set up necessary database models and relationships.

### Testing:
- Unit tests for the authentication logic.
- Integration tests for the API endpoints.
### Code Quality: Clean, readable, and well-documented code.
### Architecture: Proper separation of concerns and modularity.
### Testing: Comprehensive and meaningful tests.
### Performance: Efficient database queries and API performance.
### Security: Proper handling of authentication and authorization.

## Set Up project

  $ docker-compose up

## Run unit & integration test

Open docker/terminal under apitask.

```bash
  $ cd /app
  $ npm run all-test
```
