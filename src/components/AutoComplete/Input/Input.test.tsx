import { act, render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import '@testing-library/jest-dom';
import * as hooks from '../../../hooks/useSearchMovies';

import { userEvent } from '@storybook/test';
import { Input } from './Input';
import { server } from '../../../mocks/node';
import Providers from '../../../providers';

const mockedOnSelect = vi.fn();
server.listen();

describe('Input', () => {
  it('renders the user input', async () => {
    render(
      <Providers>
        <Input onSelect={mockedOnSelect} selected={[]} />
      </Providers>
    );
    const user = userEvent.setup();
    const input = screen.getByLabelText('Select your favourite movies');
    await act(async () => {
      await user.type(input, 'Hello world');
    });
    expect(input).toHaveValue('Hello world');
  });

  it('only renders the dropdown if the user types in more than 1 letter', async () => {
    render(
      <Providers>
        <Input onSelect={mockedOnSelect} selected={[]} />
      </Providers>
    );
    const user = userEvent.setup();
    const input = screen.getByLabelText('Select your favourite movies');

    await act(async () => {
      await user.type(input, 'H');
    });

    expect(screen.queryByRole('listbox')).toBeNull();
    await act(async () => {
      await user.type(input, 'He');
    });
    expect(screen.getByRole('listbox')).toBeVisible();
  });
});
