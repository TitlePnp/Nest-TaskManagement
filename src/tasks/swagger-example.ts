export const taskExamples = {
  getTasks: [
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
  ],
  getTaskById: {
    id: 'ba484d93-aef7-4c27-a7d4-4356ab10c89f',
    title: 'Task 1',
    description: 'Description for task 1',
    status: 'pending',
    userId: '123e4567-e89b-12d3-a456-426614174000',
  },
  createTask: {
    title: 'New Task',
    status: 'pending',
    userId: 'user-uuid',
    description: 'Task description',
    id: 'uuid',
  },
  createTaskBody: {
    title: 'New Task',
    description: 'Task description',
    status: 'pending',
  },
  createAndUpdateTaskBadRequest: {
    statusCode: 400,
    message: [
      'title must be shorter than or equal to 255 characters',
      'title should not be empty',
      'title must be a string',
      'status must be one of the following values: pending, in_progress, completed',
      'id must be a UUID',
    ],
    timestamp: '2024-11-25T10:26:49.291Z',
  },
  updateTask: {
    id: 'taskId',
    title: 'Updated Task Title',
    description: 'Updated task description',
    status: 'pending',
    userId: 'user-uuid',
  },
  deleteTask: {
    statusCode: 200,
    message: 'Task deleted successfully',
    timestamp: '2024-11-24T17:31:16.401Z',
  },
  notFound: {
    statusCode: 404,
    message: 'Task not found',
    error: 'Not Found',
  },
  unauthorized: {
    statusCode: 401,
    message: 'Unauthorize',
    timestamp: '2024-11-24T17:31:16.401Z',
  },
  uuidBadRequest: {
    statusCode: 400,
    message: 'id must be a UUID',
    timestamp: '2024-11-24T17:31:16.401Z',
  },
};
