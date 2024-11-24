import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../entities/tasks.entity';

export class UpdateTask {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description?: string;

  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}
