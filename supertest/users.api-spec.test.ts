import {
  CanActivate,
  ExecutionContext,
  INestApplication,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';

@Injectable()
class TestAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context
      .switchToHttp()
      .getRequest();

    const authorization =
      request.headers.authorization;

    return authorization ===
      'Bearer test-jwt';
  }
}

describe('Users API', () => {
  let app: INestApplication;

  const mockUsersService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [
          UsersController,
        ],

        providers: [
          {
            provide: UsersService,
            useValue: mockUsersService,
          },

          {
            provide: APP_GUARD,
            useClass: TestAuthGuard,
          },
        ],
      }).compile();

    app =
      module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashed-password',
        },
      ];

      mockUsersService.findAll
        .mockResolvedValue(users);

      const response = await request(
        app.getHttpServer(),
      )
        .get('/users')
        .set(
          'Authorization',
          'Bearer test-jwt',
        )
        .expect(200);

      expect(response.body).toEqual(
        users,
      );

      expect(
        mockUsersService.findAll,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /users', () => {
    it('should create a user with valid data', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const createdUser = {
        id: 1,
        ...createUserDto,
      };

      mockUsersService.create
        .mockResolvedValue(
          createdUser,
        );

      const response = await request(
        app.getHttpServer(),
      )
        .post('/users')
        .set(
          'Authorization',
          'Bearer test-jwt',
        )
        .send(createUserDto)
        .expect(201);

      expect(response.body).toEqual(
        createdUser,
      );

      expect(
        mockUsersService.create,
      ).toHaveBeenCalledWith(
        createUserDto,
      );
    });

    it('should return 400 for invalid data', async () => {
      const invalidUser = {
        name: '',
        email: 'invalid-email',
        password: '123',
      };

      await request(
        app.getHttpServer(),
      )
        .post('/users')
        .set(
          'Authorization',
          'Bearer test-jwt',
        )
        .send(invalidUser)
        .expect(400);

      expect(
        mockUsersService.create,
      ).not.toHaveBeenCalled();
    });
  });

  describe('Authentication', () => {
    it('should reject request without test JWT', async () => {
      await request(
        app.getHttpServer(),
      )
        .get('/users')
        .expect(403);

      expect(
        mockUsersService.findAll,
      ).not.toHaveBeenCalled();
    });
  });
});