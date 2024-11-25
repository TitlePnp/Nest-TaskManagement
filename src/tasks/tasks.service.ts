import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTask } from './dto/createTask.dto';
import { Tasks } from './entities/tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>,
  ) {}

  async getTasks(): Promise<Tasks[]> {
    return await this.tasksRepository.find();
  }

  async getTaskById(id: string): Promise<Tasks> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new HttpException('Not Found Task', HttpStatus.NOT_FOUND);
    }
    return await this.tasksRepository.findOne({ where: { id } });
  }

  async updateTask(id: string, taskDetail: CreateTask): Promise<Tasks> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new HttpException('Not Found Task', HttpStatus.NOT_FOUND);
    }

    task.title = taskDetail.title;
    if (taskDetail.description) {
      task.description = taskDetail.description;
    }
    task.status = taskDetail.status;

    return await this.tasksRepository.save(task);
  }

  async createTask(taskDetail: CreateTask, userId: string): Promise<Tasks> {
    const task = new Tasks();
    task.title = taskDetail.title;
    if (taskDetail.description) {
      task.description = taskDetail.description;
    }
    task.status = taskDetail.status;
    task.userId = userId;

    return await this.tasksRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const checkTask = await this.tasksRepository.findOne({ where: { id } });
    if (!checkTask) {
      throw new HttpException('Not Found Task', HttpStatus.NOT_FOUND);
    }

    await this.tasksRepository.delete(id);
  }
}
