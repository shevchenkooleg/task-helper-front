import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextAlign, TextSize, TextTheme } from './Text';

const meta: Meta<typeof Text> = {
    component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
    },
};

export const Inverted: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        theme: TextTheme.INVERTED
    },
};

export const Red: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        theme: TextTheme.ERROR
    },
};

export const Primary_S: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        size: TextSize.SIZE_S
    },
};

export const Primary_M: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        size: TextSize.SIZE_M
    },
};

export const Primary_L: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        size: TextSize.SIZE_L
    },
};

export const Primary_XL: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        size: TextSize.SIZE_XL
    },
};

export const Red_start: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        theme: TextTheme.ERROR,
        align: TextAlign.START
    },
};

export const Red_end: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        theme: TextTheme.ERROR,
        align: TextAlign.END
    },
};

export const Red_center: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        theme: TextTheme.ERROR,
        align: TextAlign.CENTER
    },
};

export const Red_justify: Story = {
    args: {
        title: 'Some title',
        text: 'Some text',
        theme: TextTheme.ERROR,
        align: TextAlign.JUSTIFY
    },
};