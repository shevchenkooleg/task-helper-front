
import type { Meta, StoryObj } from '@storybook/react';
import { AppLink } from '..';

const meta: Meta<typeof AppLink> = {
    component: AppLink,
    args: {
        style: { margin: '20px' }
    }
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const Background: Story = {
    args: {
        children: 'qqq'
    },
};