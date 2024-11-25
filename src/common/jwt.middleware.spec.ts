import { JwtMiddleware } from './jwt.middleware';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

describe('JwtMiddleware', () => {
  let jwtMiddleware: JwtMiddleware;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(() => {
    configService = mockConfigService as unknown as ConfigService;
    jwtMiddleware = new JwtMiddleware(configService);
  });

  it('should throw an error if no token is provided', () => {
    const req = { headers: {} } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    expect(() => jwtMiddleware.use(req, res, next)).toThrow('Unauthorize');
  });

  it('should throw an error if token is expired', () => {
    const req = {
      headers: { authorization: 'Bearer expiredToken' },
    } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new jwt.TokenExpiredError('jwt expired', new Date());
    });

    expect(() => jwtMiddleware.use(req, res, next)).toThrow(
      'Token has expired',
    );
  });

  it('should throw an error if token is invalid', () => {
    const req = {
      headers: { authorization: 'Bearer invalidToken' },
    } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('invalid token');
    });

    expect(() => jwtMiddleware.use(req, res, next)).toThrow('Unauthorize');
  });

  it('should call next if token is valid', () => {
    const req = { headers: { authorization: 'Bearer validToken' } } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    jest.spyOn(jwt, 'verify').mockReturnValue({ sub: 'userId' });
    mockConfigService.get.mockReturnValue('test-secret');

    jwtMiddleware.use(req, res, next);

    expect(req['user']).toEqual({ sub: 'userId' });
    expect(next).toHaveBeenCalled();
  });
});
