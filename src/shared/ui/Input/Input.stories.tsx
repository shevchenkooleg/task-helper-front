import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from "@/shared/config/storybook/Decorators/ThemeDecorator";
import { Input } from './Input';
import { Theme } from "@/shared/const/theme";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/Input',
    component: Input,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    placeholder: 'Placeholder:'
};

export const Primary_Dark = Template.bind({});
Primary_Dark.args = {
    placeholder: 'Placeholder:'
};
Primary_Dark.decorators = [ThemeDecorator(Theme.DARK)]
