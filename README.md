## Description

This project is a basic CRUD API for Task Management built using Nest.js framework.

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
### Get list of tasks
**Request:**
```bash
GET /auth/register
Body: { email: 'user@demo.com', password: 'depassword'}
Authorization: Bearer <access0-token>
```
**Response:**
```bash
{
  "accessToken": 'access-token'
}
```

## License
Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
