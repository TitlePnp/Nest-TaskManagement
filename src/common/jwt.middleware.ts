import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpException('Unauthorize', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );
      req['user'] = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Unauthorize', HttpStatus.UNAUTHORIZED);
    }
  }
}
