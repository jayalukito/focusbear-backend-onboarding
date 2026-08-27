import {
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import Message from './Message';

describe('Message component', () => {
  test('renders the initial message', () => {
    render(<Message />);

    expect(
      screen.getByText('Hello from React!'),
    ).toBeInTheDocument();
  });

  test('changes the message when button is clicked', async () => {
    const user = userEvent.setup();

    render(<Message />);

    const button = screen.getByRole(
      'button',
      {
        name: 'Change Message',
      },
    );

    await user.click(button);

    expect(
      screen.getByText('Button clicked!'),
    ).toBeInTheDocument();
  });
});