import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tasks, TaskStatus } from './entities/tasks.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateTask } from './dto/createTask.dto';
import { v4 as uuidv4 } from 'uuid';

describe('TasksService', () => {
  let service: TasksService;
  let tasksRepository: Repository<Tasks>;

  const mockTasksRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Tasks),
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    tasksRepository = module.get<Repository<Tasks>>(getRepositoryToken(Tasks));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return list of tasks', async () => {
      const mockListOfTasks: Tasks[] = [
        {
          id: '1',
          title: 'task1',
          description: 'description1',
          status: TaskStatus.COMPLETED,
          userId: '1',
        },
        {
          id: '2',
          title: 'task2',
          description: 'description2',
          status: TaskStatus.COMPLETED,
          userId: '2',
        },
      ];

      mockTasksRepository.find.mockResolvedValue(mockListOfTasks);

      const result = await service.getTasks();

      expect(result).toEqual(mockListOfTasks);
    });
  });

  describe('getTaskById', () => {
    it('should return task by id', async () => {
      const taskId = uuidv4();
      const mockTask: Tasks = {
        id: taskId,
        title: 'task1',
        description: 'description1',
        status: TaskStatus.COMPLETED,
        userId: '1',
      };

      mockTasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await service.getTaskById(taskId);

      expect(result).toEqual(mockTask);
    });

    it('should throw error if task id is invalid', async () => {
      const taskId = 'invalid-uuid';

      await expect(service.getTaskById(taskId)).rejects.toThrow(
        new HttpException('Invalid UUID format', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw error if task not found', async () => {
      const taskId = uuidv4();
      mockTasksRepository.findOne.mockResolvedValue(null);

      await expect(service.getTaskById(taskId)).rejects.toThrow(
        new HttpException('Not Found Task', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('updateTask', () => {
    it('should update task successfully', async () => {
      const taskId = uuidv4();
      const mockTask: Tasks = {
        id: taskId,
        title: 'task1',
        description: 'description1',
        status: TaskStatus.COMPLETED,
        userId: '1',
      };

      const updateTask = {
        title: 'task1',
        description: 'description1',
        status: TaskStatus.PENDING,
      };

      mockTasksRepository.findOne.mockResolvedValue(mockTask);
      mockTasksRepository.save.mockResolvedValue({
        ...mockTask,
        ...updateTask,
      });

      const result = await service.updateTask(taskId, updateTask);

      expect(result).toEqual({ ...mockTask, ...updateTask });
    });

    it('should update task without description', async () => {
      const taskId = uuidv4();
      const mockTask: Tasks = {
        id: taskId,
        title: 'task1',
        description: 'description1',
        status: TaskStatus.COMPLETED,
        userId: '1',
      };

      const updateTask = {
        title: 'task1',
        status: TaskStatus.PENDING,
      };

      mockTasksRepository.findOne.mockResolvedValue(mockTask);
      mockTasksRepository.save.mockResolvedValue({
        ...mockTask,
        ...updateTask,
      });

      const result = await service.updateTask(taskId, updateTask);

      expect(result).toEqual({ ...mockTask, ...updateTask });
    });

    it('should throw error if task id is invalid', async () => {
      const taskId = 'invalid-uuid';
      const updateTask = {
        title: 'task1',
        description: 'description1',
        status: TaskStatus.PENDING,
      };

      await expect(service.updateTask(taskId, updateTask)).rejects.toThrow(
        new HttpException('Invalid UUID format', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw error if task not found', async () => {
      const taskId = uuidv4();
      const updateTask = {
        title: 'task1',
        description: 'description1',
        status: TaskStatus.PENDING,
      };

      mockTasksRepository.findOne.mockResolvedValue(null);

      await expect(service.updateTask(taskId, updateTask)).rejects.toThrow(
        new HttpException('Not Found Task', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('createTask', () => {
    it('should create task successfully', async () => {
      const taskDetail = {
        title: 'task1',
        description: 'description1',
        status: TaskStatus.COMPLETED,
      };
      const userId = '1';

      const mockTask: Tasks = {
        id: uuidv4(),
        title: taskDetail.title,
        description: taskDetail.description,
        status: taskDetail.status,
        userId,
      };

      mockTasksRepository.save.mockResolvedValue(mockTask);

      const result = await service.createTask(taskDetail, userId);

      expect(result).toEqual(mockTask);
    });

    it('should create task without description', async () => {
      const taskDetail = {
        title: 'task1',
        status: TaskStatus.COMPLETED,
      };
      const userId = '1';

      const mockTask: CreateTask = {
        title: taskDetail.title,
        status: TaskStatus.COMPLETED,
      };

      mockTasksRepository.save.mockResolvedValue(mockTask);

      const result = await service.createTask(taskDetail, userId);

      expect(result).toEqual(mockTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete task successfully', async () => {
      const taskId = uuidv4();
      mockTasksRepository.findOne.mockResolvedValue({ id: taskId });
      mockTasksRepository.delete.mockResolvedValue(undefined);

      await service.deleteTask(taskId);

      expect(tasksRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskId },
      });
      expect(tasksRepository.delete).toHaveBeenCalledWith(taskId);
    });

    it('should throw error if task id is invalid', async () => {
      const taskId = 'invalid-uuid';

      await expect(service.deleteTask(taskId)).rejects.toThrow(
        new HttpException('Invalid UUID format', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw error if task not found', async () => {
      const taskId = uuidv4();
      mockTasksRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteTask(taskId)).rejects.toThrow(
        new HttpException('Not Found Task', HttpStatus.NOT_FOUND),
      );
    });
  });
});
