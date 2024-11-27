import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/users.entity';
import { ConfigModule } from '@nestjs/config';
import { Tasks } from './tasks/entities/tasks.entity';
import { TasksModule } from './tasks/tasks.module';
import { JwtMiddleware } from './common/jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [Users, Tasks],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('tasks')
      .apply(JwtMiddleware)
      .forRoutes('users');
  }
}
