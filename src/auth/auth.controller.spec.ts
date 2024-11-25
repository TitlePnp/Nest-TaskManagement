import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import * as jwt from 'jsonwebtoken';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a new user successfully', async () => {
    const registerDto: RegisterUserDto = {
      email: 'test@test.com',
      password: 'password123',
    };

    mockAuthService.register.mockResolvedValue(undefined);

    const result = await controller.register(registerDto);

    expect(authService.register).toHaveBeenCalledWith(registerDto);
    expect(result).toBe('User registered successfully');
  });

  it('should return access token when login successful', async () => {
    const loginDto: LoginUserDto = {
      email: 'test@test.com',
      password: 'password123',
    };

    const jwtSecret = 'MOCK_SECRET';
    const tokenExpire = '1h';
    const accessToken = jwt.sign(
      { email: loginDto.email, userId: 'mockUserId' },
      jwtSecret,
      {
        expiresIn: tokenExpire,
      },
    );

    mockAuthService.login.mockResolvedValue({ accessToken });

    const result = await controller.login(loginDto);

    expect(authService.login).toHaveBeenCalledWith(loginDto);
    expect(result).toEqual({ accessToken });
  });
});
