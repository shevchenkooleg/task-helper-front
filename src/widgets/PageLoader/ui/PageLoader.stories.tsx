
import type { Meta, StoryObj } from '@storybook/react';
import { PageLoader } from './PageLoader';

const meta: Meta<typeof PageLoader> = {
    component: PageLoader,
    args: {
        // style: { margin: '20px' }
    }
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

export const Background: Story = {
    args: {
    },
};
