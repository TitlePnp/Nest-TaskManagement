## Description

This project is a basic CRUD API for Task Management by Nest.js framework.

## Project setup

```bash
$ docker-compose build --no-cache
$ docker-compose up
```

Application should now be running on `http://localhost:3000`.

## Run test

```bash
# For coverage test
$ npm run test:cov
```

## API Documentation

For Access Swagger Docs accessible at http://localhost:3000/api/docs.

## Example Requests

### Register

**Request:**

```bash
POST /auth/register
Body: { email: 'user@demo.com', password: 'depassword'}
Authorization: Bearer <access-token>
```

**Response:**

```bash
{
  "statusCode": 201,
  "message": "User registered successfully",
  "timestamp": 2024-11-24T17:13:18.073Z
}
```

### Login

**Request:**

```bash
POST /auth/login
Body: { email: 'user@demo.com', password: 'depassword'}
Authorization: Bearer <access-token>
```

**Response:**

```bash
{
  "accessToken": "access-token"
}
```

### Get list of tasks

**Request:**

```bash
GET /tasks
Authorization: Bearer <access-token>
```

**Response:**

```bash
[
  {
    id: 'ba484d93-aef7-4c27-a7d4-4356ab10c89f',
    title: 'Task 1',
    description: 'Description for task 1',
    status: 'pending',
    userId: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    id: 'f3b9b5b7-1b3f-4a6f-8f5b-1f3b4a6f8f5b',
    title: 'Task 2',
    description: 'Description for task 2',
    status: 'completed',
    userId: '123e4567-e89b-12d3-a456-426614174000',
  },
]
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
