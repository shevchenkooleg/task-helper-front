
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
    component: ThemeSwitcher,
    args: {
    }
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Background: Story = {
    args: {
    },
};