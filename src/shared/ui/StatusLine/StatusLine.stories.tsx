import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StatusLine } from './StatusLine';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/StatusLine',
    component: StatusLine,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof StatusLine>;

const Template: ComponentStory<typeof StatusLine> = (args) => <StatusLine {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
