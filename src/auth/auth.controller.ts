import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthExample } from './swgger-example';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: { example: AuthExample.register },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: AuthExample.badRequest,
    },
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    schema: {
      example: AuthExample.userAlreadyExists,
    },
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.authService.register(registerUserDto);
    return {
      statusCode: 201,
      message: 'User registered successfully',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Return JWT token',
    schema: { example: AuthExample.login },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: AuthExample.badRequest,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: AuthExample.unauthorized,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found User',
    schema: {
      example: AuthExample.notFoundUser,
    },
  })
  async login(@Body() registerUserDto: LoginUserDto) {
    return await this.authService.login(registerUserDto);
  }
}
