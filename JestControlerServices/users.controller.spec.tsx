import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
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
        ],
      }).compile();

    controller =
      module.get<UsersController>(
        UsersController,
      );

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return users from the service', async () => {
      const users = [
        {
          id: 1,
          name: 'John',
          email: 'john@example.com',
          password: 'hashed-password',
        },
      ];

      mockUsersService.findAll
        .mockResolvedValue(users);

      const result =
        await controller.findAll();

      expect(
        mockUsersService.findAll,
      ).toHaveBeenCalledTimes(1);

      expect(result).toEqual(users);
    });
  });

  describe('create', () => {
    it('should create a user through the service', async () => {
      const createUserDto = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      };

      const savedUser = {
        id: 1,
        ...createUserDto,
      };

      mockUsersService.create
        .mockResolvedValue(savedUser);

      const result =
        await controller.create(
          createUserDto,
        );

      expect(
        mockUsersService.create,
      ).toHaveBeenCalledWith(
        createUserDto,
      );

      expect(result).toEqual(
        savedUser,
      );
    });
  });
});