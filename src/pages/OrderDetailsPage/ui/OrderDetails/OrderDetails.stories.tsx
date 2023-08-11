import type { Meta, StoryObj } from '@storybook/react';
import { OrderDetails } from './OrderDetails';

const meta: Meta<typeof OrderDetails> = {
    component: OrderDetails,
    args: {}
};

export default meta;
type Story = StoryObj<typeof OrderDetails>;

export const Primary: Story = {
    args: {},
};