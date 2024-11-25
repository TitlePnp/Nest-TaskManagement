import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask } from './dto/createTask.dto';
import { UpdateTask } from './dto/updateTask.dto';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { taskExamples } from './swagger-example';

@ApiBearerAuth('authorization')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of tasks' })
  @ApiResponse({
    status: 200,
    description: 'Return list of tasks',
    schema: {
      example: taskExamples.getTasks,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: taskExamples.unauthorized,
    },
  })
  async getTasks() {
    return await this.tasksService.getTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Return task detail',
    schema: {
      example: taskExamples.getTaskById,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
    schema: {
      example: taskExamples.uuidBadRequest,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: taskExamples.unauthorized,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    schema: {
      example: taskExamples.notFound,
    },
  })
  async getTaskById(@Param('id') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    schema: { example: taskExamples.updateTask },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: { example: taskExamples.createAndUpdateTaskBadRequest },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: taskExamples.unauthorized,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    schema: { example: taskExamples.notFound },
  })
  async updateTask(
    @Param('id') taskId: string,
    @Body() taskDetail: UpdateTask,
  ) {
    return await this.tasksService.updateTask(taskId, taskDetail);
  }

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    schema: {
      example: taskExamples.createTask,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      example: taskExamples.createAndUpdateTaskBadRequest,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: taskExamples.unauthorized,
    },
  })
  async createTask(@Body() taskDetail: CreateTask, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.tasksService.createTask(taskDetail, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
    schema: { example: taskExamples.deleteTask },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      example: taskExamples.uuidBadRequest,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: taskExamples.unauthorized,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    schema: {
      example: taskExamples.notFound,
    },
  })
  async deleteTask(@Param('id') taskId: string) {
    await this.tasksService.deleteTask(taskId);
    return {
      statusCode: 200,
      message: 'Task deleted successfully',
      timestamp: new Date().toISOString(),
    };
  }
}
