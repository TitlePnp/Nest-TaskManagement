import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';
@Module({
  imports: [SequelizeModule.forFeature([Users])],
  exports: [SequelizeModule],
})
export class UsersModule {}
