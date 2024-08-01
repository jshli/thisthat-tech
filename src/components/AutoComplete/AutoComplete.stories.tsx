import type { Meta, StoryObj } from '@storybook/react';

import { AutoComplete } from './AutoComplete';
import Providers from '../../providers';
import { handlers } from '../../mocks/handlers';
import { userEvent, within } from '@storybook/test';

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
