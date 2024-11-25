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
  ApiBody,
} from '@nestjs/swagger';

@ApiBearerAuth('authorization')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of tasks' })
  @ApiResponse({ status: 200, description: 'Return list of tasks' })
  async getTasks() {
    return await this.tasksService.getTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: 'ba484d93-aef7-4c27-a7d4-4356ab10c89f',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Return task detail',
    schema: {
      example: {
        id: 'ba484d93-aef7-4c27-a7d4-4356ab10c89f',
        title: 'Task 1',
        description: 'Description for task 1',
        status: 'pending',
        userId: '123e4567-e89b-12d3-a456-426614174000',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Task not found',
        error: 'Not Found',
      },
    },
  })
  async getTaskById(@Param('id') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task by ID' })
  @ApiBody({
    schema: {
      example: {
        title: 'Updated Task Title',
        description: 'Updated task description',
        status: 'pending',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  async updateTask(
    @Param('id') taskId: string,
    @Body() taskDetail: UpdateTask,
  ) {
    return await this.tasksService.updateTask(taskId, taskDetail);
  }

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiBody({
    schema: {
      example: {
        title: 'New Task',
        description: 'Task description',
        status: 'pending',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    schema: {
      example: {
        id: 'uuid',
        title: 'New Task',
        description: 'Task description',
        status: 'pending',
        userId: 'user-uuid',
      },
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
    example: 'ba484d93-aef7-4c27-a7d4-4356ab10c89f',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Return task detail',
    schema: { example: 'Task deleted successfully' },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Task not found',
        error: 'Not Found',
      },
    },
  })
  async deleteTask(@Param('id') taskId: string) {
    await this.tasksService.deleteTask(taskId);
    return 'Task deleted successfully';
  }
}
