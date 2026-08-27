import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUserRepository = {
    find: jest.fn(),
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
            provide: getRepositoryToken(User),
            useValue: mockUserRepository,
          },

          {
            provide: PinoLogger,
            useValue: mockLogger,
          },
        ],
      }).compile();

    usersService =
      module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const users = [
      {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      },
    ];

    mockUserRepository.find.mockResolvedValue(
      users,
    );

    const result =
      await usersService.findAll();

    expect(result).toEqual(users);

    expect(
      mockUserRepository.find,
    ).toHaveBeenCalledTimes(1);
  });
});