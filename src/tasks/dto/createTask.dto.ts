import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../entities/tasks.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTask {
  @ApiProperty({ example: 'New Task' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly title: string;

  @ApiProperty({ example: 'Task description' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description?: string;

  @ApiProperty({ example: 'pending' })
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}
