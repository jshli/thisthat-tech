import type { Meta, StoryObj } from '@storybook/react';

import { AutoComplete } from './AutoComplete';
import Providers from '../../providers';
import { handlers } from '../../mocks/handlers';

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
  args: {},
};
