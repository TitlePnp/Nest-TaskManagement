/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository;
  let configService;

  const mockUsersRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get(getRepositoryToken(Users));
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData: RegisterUserDto = {
        email: 'test@test.com',
        password: 'password123',
      };

      mockUsersRepository.findOne.mockResolvedValue(null);
      mockUsersRepository.save.mockResolvedValue({ ...userData, id: 1 });

      const result = await authService.register(userData);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userData.email);
    });

    it('should throw error if user already exists', async () => {
      const userData: RegisterUserDto = {
        email: 'test@test.com',
        password: 'password123',
      };

      mockUsersRepository.findOne.mockResolvedValue({ id: 1 });

      await expect(authService.register(userData)).rejects.toThrow(
        new HttpException('User already exists', HttpStatus.CONFLICT),
      );
    });
  });

  describe('login', () => {
    it('should return access token when login successful', async () => {
      const jwtSecret = 'test-secret';
      const tokenExpire = '1h';
      const loginData = {
        email: 'test@test.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        email: loginData.email,
        password: await bcrypt.hash(loginData.password, 10),
      };

      const accessToken = jwt.sign(
        { email: loginData.email, sub: mockUser.id },
        jwtSecret,
        { expiresIn: tokenExpire },
      );

      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      mockConfigService.get.mockImplementation((key) => {
        if (key === 'JWT_SECRET') return jwtSecret;
        if (key === 'JWT_EXPIRE') return tokenExpire;
      });

      jest.spyOn(jwt, 'sign').mockImplementation(() => accessToken);

      const result = await authService.login(loginData);

      expect(result).toHaveProperty('accessToken');
      expect(result.accessToken).toEqual(accessToken);
    });

    it('should throw error if user not found', async () => {
      const loginData: LoginUserDto = {
        email: 'test@test.com',
        password: 'password123',
      };

      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(authService.login(loginData)).rejects.toThrow(
        new HttpException('Not Found User', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw error if password invalid', async () => {
      const loginData: LoginUserDto = {
        email: 'test@test.com',
        password: 'wrongpassword',
      };

      const mockUser = {
        id: 1,
        email: loginData.email,
        password: await bcrypt.hash('correctpassword', 10),
      };

      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      await expect(authService.login(loginData)).rejects.toThrow(
        new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
      );
    });
  });
});
