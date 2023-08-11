
import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
    component: Loader,
    args: {
        // style: { margin: '20px' }
    }
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Background: Story = {
    args: {
    },
};
