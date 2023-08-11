import type { Meta, StoryObj } from '@storybook/react';
import AddNewOrderForm from './AddNewOrderForm';

const meta: Meta<typeof AddNewOrderForm> = {
    component: AddNewOrderForm,
    args: {}
};

export default meta;
type Story = StoryObj<typeof AddNewOrderForm>;

export const Primary: Story = {
    args: {},
};