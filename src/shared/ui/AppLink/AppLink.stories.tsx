import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from "@/shared/config/storybook/Decorators/ThemeDecorator";
import { AppLink } from "./AppLink";
import { Theme } from "@/shared/const/theme";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text'
};

export const Primary_Dark = Template.bind({});
Primary_Dark.args = {
    children: 'Text'
};
Primary_Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary.args = {
    children: 'Text'
};

export const Secondary_Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary_Dark.args = {
    children: 'Text'
};
Secondary_Dark.decorators = [ThemeDecorator(Theme.DARK)]
