import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private configService: ConfigService,
  ) {}

  async register(userData: RegisterUserDto): Promise<Users> {
    try {
      const { email, password } = userData;
      const checkUserExists = await this.usersRepository.findOne({
        where: { email },
      });

      if (checkUserExists) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const user = new Users();
      user.email = email;
      user.password = await bcrypt.hash(password, 10);

      return this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  async login(userLoginData: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = userLoginData;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Not Found User', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, sub: user.id };
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const tokenExpire = this.configService.get<string>('JWT_EXPIRE');
    const accessToken = jwt.sign(payload, jwtSecret, {
      expiresIn: tokenExpire,
    });

    return { accessToken };
  }
}
