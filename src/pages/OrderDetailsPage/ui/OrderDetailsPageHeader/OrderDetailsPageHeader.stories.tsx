import type { Meta, StoryObj } from '@storybook/react';
import { OrderDetailsPageHeader } from './OrderDetailsPageHeader';

const meta: Meta<typeof OrderDetailsPageHeader> = {
    component: OrderDetailsPageHeader,
    args: {}
};

export default meta;
type Story = StoryObj<typeof OrderDetailsPageHeader>;

export const Primary: Story = {
    args: {},
};