
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonTheme } from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
    args: {
        style: { margin: '20px' }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Background: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND,
        children: 'Button'
    },
};

export const Background_Disabled: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND,
        children: 'Button',
        disabled: true
    },
};

export const Outline: Story = {
    args: {
        ...Background.args,
        theme: ButtonTheme.OUTLINE
    },
};

export const Outline_Rounded: Story = {
    args: {
        ...Background.args,
        theme: ButtonTheme.OUTLINE,
        rounded: true
    },
};

export const Clear: Story = {
    args: {
        ...Background.args,
        theme: ButtonTheme.CLEAR
    },
};

export const Square: Story = {
    args: {
        ...Background.args,
        theme: ButtonTheme.OUTLINE,
        children: 'A'
    },
};

export const Square_Rounded: Story = {
    args: {
        ...Background.args,
        theme: ButtonTheme.OUTLINE,
        rounded: true,
        children: 'A'
    },
};