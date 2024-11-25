export const AuthExample = {
  register: {
    statusCode: 201,
    message: 'User registered successfully',
    timestamp: '2024-11-24T17:13:18.073Z',
  },
  userAlreadyExists: {
    statusCode: 409,
    message: 'User already exists',
    timestamp: '2024-11-24T17:13:18.073Z',
  },
  login: {
    accessToken: 'access-token',
  },
  unauthorized: {
    statusCode: 401,
    message: 'Unauthorize',
    timestamp: '2024-11-24T17:31:16.401Z',
  },
  notFoundUser: {
    statusCode: 404,
    message: 'Not Found User',
    timestamp: '2024-11-24T17:31:16.401Z',
  },
  badRequest: {
    statusCode: 400,
    message: [
      'email must be shorter than or equal to 100 characters',
      'email must be an email',
      'email must be a string',
      'password must be shorter than or equal to 255 characters',
      'password should not be empty',
      'password must be a string',
    ],
    timestamp: '2024-11-24T17:13:18.073Z',
  },
};
