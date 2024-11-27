import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Table
export class Tasks extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(TaskStatus),
    defaultValue: TaskStatus.PENDING,
    allowNull: false,
  })
  status: TaskStatus;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
}
