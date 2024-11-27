import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTask } from './dto/createTask.dto';
import { Tasks } from './entities/tasks.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateTask } from './dto/updateTask.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks)
    private readonly tasksRepository: typeof Tasks,
  ) {}

  async getTasks(): Promise<Tasks[]> {
    return await this.tasksRepository.findAll();
  }

  async getTaskById(id: string): Promise<Tasks> {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID format', HttpStatus.BAD_REQUEST);
    }
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new HttpException('Not Found Task', HttpStatus.NOT_FOUND);
    }
    return await this.tasksRepository.findOne({ where: { id } });
  }

  async updateTask(id: string, taskDetail: UpdateTask): Promise<Tasks> {
    const task = await this.getTaskById(id);
    return await task.update({ ...taskDetail, id });
  }

  async createTask(taskDetail: CreateTask, userId: string): Promise<Tasks> {
    return await this.tasksRepository.create({ ...taskDetail, userId });
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.getTaskById(id);
    await task.destroy();
  }
}
