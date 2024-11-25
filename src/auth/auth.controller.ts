import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loginUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: { example: 'User registered successfully' },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be shorter than or equal to 100 characters',
          'email must be an email',
          'email must be a string',
          'password must be shorter than or equal to 255 characters',
          'password should not be empty',
          'password must be a string',
        ],
        timestamp: '2024-11-24T17:13:18.073Z',
      },
    },
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.authService.register(registerUserDto);
    return 'User registered successfully';
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Return JWT token',
    schema: { example: 'access-token' },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorize',
        timestamp: '2024-11-24T17:31:16.401Z',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token has expired',
    schema: {
      example: {
        statusCode: 401,
        message: 'Token has expired',
        timestamp: '2024-11-24T17:33:03.215Z',
      },
    },
  })
  async login(@Body() registerUserDto: LoginUserDto) {
    return await this.authService.login(registerUserDto);
  }
}
