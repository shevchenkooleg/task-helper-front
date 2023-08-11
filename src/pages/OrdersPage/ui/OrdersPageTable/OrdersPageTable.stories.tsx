import type { Meta, StoryObj } from '@storybook/react';
import { OrdersPageTable } from './OrdersPageTable';

const meta: Meta<typeof OrdersPageTable> = {
    component: OrdersPageTable,
    args: {}
};

export default meta;
type Story = StoryObj<typeof OrdersPageTable>;

export const Primary: Story = {
    args: {},
};