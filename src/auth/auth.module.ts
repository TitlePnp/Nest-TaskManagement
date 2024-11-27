import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
