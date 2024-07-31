import { act, render, screen } from '@testing-library/react';
import { it, expect, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import * as stories from './AutoComplete.stories';
import { composeStories } from '@storybook/react';
import { userEvent } from '@storybook/test';

const { Default } = composeStories(stories);
describe('Auto Complete', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Default />);
    });
  });

  it('renders the user input', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Select your favourite movies');
    await act(async () => {
      await user.type(input, 'Hello world');
    });
    expect(input).toHaveValue('Hello world');
  });
});
