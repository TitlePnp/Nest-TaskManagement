import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Tasks, TaskStatus } from './entities/tasks.entity';
import { UpdateTask } from './dto/updateTask.dto';
import { Request } from 'express';

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: TasksService;
  let mockListOfTasks: Tasks[];

  const mockTasksService = {
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);

    mockListOfTasks = [
      {
        id: '1',
        title: 'task1',
        description: 'description1',
        status: TaskStatus.COMPLETED,
        userId: '1',
      } as Tasks,
      {
        id: '2',
        title: 'task2',
        description: 'description2',
        status: TaskStatus.PENDING,
        userId: '2',
      } as Tasks,
    ];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list of tasks', async () => {
    mockTasksService.getTasks.mockResolvedValue(mockListOfTasks);

    const result = await controller.getTasks();

    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(result).toEqual(mockListOfTasks);
  });

  it('should return task by ID', async () => {
    const taskId = '1';
    const task = mockListOfTasks.find((t) => t.id === taskId);

    mockTasksService.getTaskById.mockResolvedValue(task);

    const result = await controller.getTaskById(taskId);

    expect(tasksService.getTaskById).toHaveBeenCalledWith(taskId);
    expect(result).toEqual(task);
  });

  it('should update task by ID', async () => {
    const taskId = '1';
    const task = mockListOfTasks.find((t) => t.id === taskId);
    const updateTaskDto: UpdateTask = {
      title: 'UpdateTask',
      description: 'description',
      status: TaskStatus.PENDING,
    };

    mockTasksService.updateTask.mockResolvedValue({
      ...task,
      ...updateTaskDto,
    });

    const result = await controller.updateTask(taskId, updateTaskDto);

    expect(tasksService.updateTask).toHaveBeenCalledWith(taskId, updateTaskDto);
    expect(result).toEqual({ ...task, ...updateTaskDto });
  });

  it('should create task successfully', async () => {
    const mockRequest = {
      user: { sub: '1' },
    } as unknown as Request;

    const newTask = {
      title: 'New Task',
      description: 'New Task Description',
      status: TaskStatus.PENDING,
    };

    mockTasksService.createTask.mockResolvedValue({ ...newTask, id: '3' });

    const result = await controller.createTask(newTask, mockRequest);

    expect(tasksService.createTask).toHaveBeenCalledWith(newTask, '1');
    expect(result).toEqual({ ...newTask, id: '3' });
  });

  it('should delete task by ID', async () => {
    const taskId = '1';

    mockTasksService.deleteTask.mockResolvedValue(undefined);

    const result = await controller.deleteTask(taskId);

    expect(tasksService.deleteTask).toHaveBeenCalledWith(taskId);
    expect(result).toEqual({
      statusCode: 200,
      message: 'Task deleted successfully',
      timestamp: expect.any(String),
    });
  });
});
