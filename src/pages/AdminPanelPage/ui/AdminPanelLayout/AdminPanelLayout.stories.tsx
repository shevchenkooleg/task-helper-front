import type { Meta, StoryObj } from '@storybook/react';
import { AdminPanelLayout } from './AdminPanelLayout';

const meta: Meta<typeof AdminPanelLayout> = {
    component: AdminPanelLayout,
    args: {}
};

export default meta;
type Story = StoryObj<typeof AdminPanelLayout>;

export const Primary: Story = {
    args: {},
};