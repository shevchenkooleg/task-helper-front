import type { Meta, StoryObj } from '@storybook/react';
import OrderDetailsPage from './OrderDetailsPage';

const meta: Meta<typeof OrderDetailsPage> = {
    component: OrderDetailsPage,
    args: {}
};

export default meta;
type Story = StoryObj<typeof OrderDetailsPage>;

export const Primary: Story = {
    args: {},
};