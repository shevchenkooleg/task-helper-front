import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ExecutionsInformation } from './ExecutionsInformation';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/ExecutionsInformation',
    component: ExecutionsInformation,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ExecutionsInformation>;

const Template: ComponentStory<typeof ExecutionsInformation> = (args) => <ExecutionsInformation {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
