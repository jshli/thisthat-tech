import type { Meta, StoryObj } from '@storybook/react';

import { AutoComplete } from './AutoComplete';
import Providers from '../../providers';
import { handlers } from '../../mocks/handlers';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { http, HttpResponse } from 'msw';

const meta: Meta<typeof AutoComplete> = {
  component: AutoComplete,
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const autoCompleteInput = canvas.getByLabelText(
      'Select your favourite movies'
    );
    await userEvent.type(autoCompleteInput, 'Spi');
  },
};

export const SelectAndRemoveItem: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const autoCompleteInput = canvas.getByLabelText(
      'Select your favourite movies'
    );
    await userEvent.type(autoCompleteInput, 'Spi');
    waitFor(async () => {
      await expect(canvas.queryByText('Loading...')).toBeNull();
    });
    await step('Select an item', async () => {
      waitFor(async () => {
        await userEvent.click(
          canvas.getByRole('option', { name: 'Spirited Away' })
        );
      });
    });
    await step('Remove selected item', async () => {
      waitFor(async () => {
        await userEvent.click(
          canvas.getByRole('button', { name: 'Remove Spirited Away' })
        );
      });
    });
    waitFor(async () => {
      expect(
        canvas.queryByRole('listitem', { name: 'Spirited Away' })
      ).toBeNull();
    });
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.themoviedb.org/3/search/movie', () => {
          return new Promise(() => {});
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const autoCompleteInput = canvas.getByLabelText(
      'Select your favourite movies'
    );
    await userEvent.type(autoCompleteInput, 'Sp');
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.themoviedb.org/3/search/movie', () => {
          return new HttpResponse(null, { status: 401 });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const autoCompleteInput = canvas.getByLabelText(
      'Select your favourite movies'
    );
    await userEvent.type(autoCompleteInput, 'Sp');
  },
};

export const KeyboardUse: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const autoCompleteInput = canvas.getByLabelText(
      'Select your favourite movies'
    );
    await userEvent.type(autoCompleteInput, 'Spi');
    await waitFor(() => {
      expect(canvas.queryByText('Loading...')).toBeNull();
    });
    await step('Use keyboard to focus on items', async () => {
      await userEvent.keyboard('[ArrowDown]');
      await userEvent.keyboard('[ArrowDown]');
      await userEvent.keyboard('[ArrowUp]');
    });
    await step('User enter to select item', async () => {
      await userEvent.keyboard('[Enter]');
    });
    await step('Use escape to close list box', async () => {
      await userEvent.keyboard('[Escape]');
    });
    await waitFor(() => {
      expect(canvas.queryByRole('listbox')).toBeNull();
    });
    await waitFor(() => {
      expect(
        canvas.getByRole('listitem', {
          name: 'Spider-Man: Across the Spider-Verse',
        })
      ).toBeVisible();
    });
  },
};
