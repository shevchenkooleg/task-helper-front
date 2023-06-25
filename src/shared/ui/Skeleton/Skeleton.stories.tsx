import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Skeleton } from './Skeleton';
import { Theme } from "@/shared/const/theme";


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args}/>;

export const Normal_Light = Template.bind({});
Normal_Light.args = {
    height: 100
};


export const Circle_Light = Template.bind({});
Circle_Light.args = {
    border: '50%',
    width: 100,
    height: 100
};

export const Normal_Dark = Template.bind({});
Normal_Dark.args = {
    height: 100
}
Normal_Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Circle_Dark = Template.bind({});
Circle_Dark.args = {
    border: '50%',
    width: 100,
    height: 100
};
Circle_Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Normal_Olive = Template.bind({});
Normal_Olive.args = {
    height: 100
};
Normal_Olive.decorators = [ThemeDecorator(Theme.OLIVE)]

export const Circle_Olive = Template.bind({});
Circle_Olive.args = {
    border: '50%',
    width: 100,
    height: 100
};
Circle_Olive.decorators = [ThemeDecorator(Theme.OLIVE)]
