import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getLoggerToken } from 'nestjs-pino';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          UsersService,

          {
            provide:
              getRepositoryToken(User),
            useValue:
              mockUserRepository,
          },

          {
            provide:
              getLoggerToken(
                UsersService.name,
              ),
            useValue:
              mockLogger,
          },
        ],
      }).compile();

    service =
      module.get<UsersService>(
        UsersService,
      );

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashed-password',
        },
      ];

      mockUserRepository.find
        .mockResolvedValue(users);

      const result =
        await service.findAll();

      expect(
        mockUserRepository.find,
      ).toHaveBeenCalledTimes(1);

      expect(result).toEqual(users);
    });
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const createdUser = {
        ...createUserDto,
      };

      const savedUser = {
        id: 1,
        ...createUserDto,
      };

      mockUserRepository.create
        .mockReturnValue(
          createdUser,
        );

      mockUserRepository.save
        .mockResolvedValue(
          savedUser,
        );

      const result =
        await service.create(
          createUserDto,
        );

      expect(
        mockUserRepository.create,
      ).toHaveBeenCalledWith(
        createUserDto,
      );

      expect(
        mockUserRepository.save,
      ).toHaveBeenCalledWith(
        createdUser,
      );

      expect(result).toEqual(
        savedUser,
      );
    });
  });
});