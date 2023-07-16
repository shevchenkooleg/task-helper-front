import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '..';

const meta: Meta<typeof Card> = {
    component: Card,
    args: {
    }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
    args: {
    },
};