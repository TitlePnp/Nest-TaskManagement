import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../entities/tasks.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTask {
  @ApiProperty({ example: 'Updated Task Title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly title: string;

  @ApiProperty({ example: 'Updated task description' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description?: string;

  @ApiProperty({ example: 'pending' })
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}
