import {
  render,
  screen,
} from '@testing-library/react';

import '@testing-library/jest-dom';

import UserList from './UserList';

import {
  fetchUsers,
} from '../api/usersApi';

jest.mock('../api/usersApi', () => ({
  fetchUsers: jest.fn(),
}));

describe('UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading message initially', () => {
    fetchUsers.mockReturnValue(
      new Promise(() => {}),
    );

    render(<UserList />);

    expect(
      screen.getByText('Loading users...'),
    ).toBeInTheDocument();
  });

  test('fetches and displays users', async () => {
    fetchUsers.mockResolvedValue([
      {
        id: 1,
        name: 'John Doe',
      },
      {
        id: 2,
        name: 'Jane Doe',
      },
    ]);

    render(<UserList />);

    expect(
      await screen.findByText('John Doe'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Jane Doe'),
    ).toBeInTheDocument();

    expect(fetchUsers).toHaveBeenCalledTimes(1);
  });

  test('displays an error when API call fails', async () => {
    fetchUsers.mockRejectedValue(
      new Error('API failed'),
    );

    render(<UserList />);

    expect(
      await screen.findByText(
        'Failed to load users',
      ),
    ).toBeInTheDocument();

    expect(fetchUsers).toHaveBeenCalledTimes(1);
  });
});