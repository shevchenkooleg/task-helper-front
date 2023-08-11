import type { Meta, StoryObj } from '@storybook/react';
import { AdminPanelUserTable } from './AdminPanelUserTable';

const meta: Meta<typeof AdminPanelUserTable> = {
    component: AdminPanelUserTable,
    args: {}
};

export default meta;
type Story = StoryObj<typeof AdminPanelUserTable>;

export const Primary: Story = {
    args: {},
};