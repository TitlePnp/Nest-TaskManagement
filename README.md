## 📖 Description

This project is a basic CRUD (Create, Read, Update, Delete) API for Task Management build using the Nest.js framework. It provides endpoints for user authentication, task creation, retrieval, updating, and deletion. The application uses a PostgreSQL database to store and manage task data.

## 🔨 Project setup

```bash
$ docker-compose build --no-cache
$ docker-compose up
```

Application should now be running on http://localhost:3000

## 🧪 Run test

For run unit test and test coverage code

```bash
$ npm run test:cov
```

## 📚 API Documentation

For Access Swagger Docs accessible at http://localhost:3000/api/docs

## 🔑 Key Architectural Decisions

### Folder Structure
1. **AuthModule**: Handle authentication and authorization.
   - Contains logic for user login and registration.
2. **UsersModule**: User-related database operation.
   - Contains user entity and repository.
3. **TasksModule**: Task management function and CRUD operations.
   - Contains task entity and repository.
   - Provides endpoints for creating, reading, updating, and deleting tasks.
4. **Common**: Shared utility and middleware.
   - **JWTMiddleware**: Middleware for validating JWT tokens.
   - **HttpExceptionFilter**: Global filter for handle and formatting HTTP exceptions.
5. **Migrations**: Database schema changes.
   - Contains migration files for creating and altering database tables.
6. **Seeders**: Initial data population.
   - Contains seeder files for populating the database with initial data.
7. **Config**: Configuration files.
   - Contains configuration files for different environments.

### Stack
1. **bcrppt**: Used for hashing passwords before storing in database. 
2. **class-validator**: Used for validate DTO and request body 
3. **Sequelize**: Used Sequelize as the ORM for interacting with the PostgreSQL database.
4. **Swagger (swagger-ui-express)**: Used for generate API documentations.
5. **JWT (jasonwebtoken)**: Used for authentication and authorization.
6. **Docker**: Used for containerizing the application and database.
7. **Nest.js**: Used as the main framework build the application.
8. **PostgreSQL**: Used as the primary database for storing application data.

## 🚀 Example Requests

### Register

**Request:**

```bash
POST /auth/register

Body:
{
  email: 'user@example.com',
  password: 'password123'
}
```

### Login

**Request:**

```bash
POST /auth/login

Body:
{
  email: 'user@example.com',
  password: 'password123'
}
```

### Get list of tasks

**Request:**

```bash
GET /tasks
Authorization: Bearer <access-token>
```

### Get task by id

**Request:**

```bash
GET /tasks/:id
Authorization: Bearer <access-token>

Params: "task-uuid"
```

### Create task

**Request:**

```bash
POST /tasks
Authorization: Bearer <access-token>

Body:
{
  title: 'NewTask1',
  description: 'NewTask Description',
  status: 'in_progress'
}
```

### Update task

**Request:**

```bash
PATCH /tasks/:id
Authorization: Bearer <access-token>

Params: "task-uuid" 
Body:
{
  title: 'UpdatedTitleTask1',
  description: 'Update Description Task1',
  status: 'completed'
}
```

### Delete task

**Request:**

```bash
DELETE /tasks/:id
Authorization: Bearer <access-token>

Params: "task-uuid" 
```