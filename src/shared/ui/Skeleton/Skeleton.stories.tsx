
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    component: Skeleton,
    args: {
    }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Background: Story = {
    args: {
    },
};


// export consts Circle_Light = Template.bind({});
// Circle_Light.args = {
//     border: '50%',
//     width: 100,
//     height: 100
// };
//
// export consts Normal_Dark = Template.bind({});
// Normal_Dark.args = {
//     height: 100
// }
// Normal_Dark.decorators = [ThemeDecorator(Theme.DARK)];
//
// export consts Circle_Dark = Template.bind({});
// Circle_Dark.args = {
//     border: '50%',
//     width: 100,
//     height: 100
// };
// Circle_Dark.decorators = [ThemeDecorator(Theme.DARK)]
//
// export consts Normal_Olive = Template.bind({});
// Normal_Olive.args = {
//     height: 100
// };
// Normal_Olive.decorators = [ThemeDecorator(Theme.OLIVE)]
//
// export consts Circle_Olive = Template.bind({});
// Circle_Olive.args = {
//     border: '50%',
//     width: 100,
//     height: 100
// };
// Circle_Olive.decorators = [ThemeDecorator(Theme.OLIVE)]
