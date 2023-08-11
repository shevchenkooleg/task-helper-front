
import type { Meta, StoryObj } from '@storybook/react';
import { PageError } from '..';

const meta: Meta<typeof PageError> = {
    component: PageError,
    args: {
    }
};

export default meta;
type Story = StoryObj<typeof PageError>;

export const Background: Story = {
    args: {
    },
};