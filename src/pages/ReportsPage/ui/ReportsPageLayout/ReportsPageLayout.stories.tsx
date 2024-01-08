import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ReportsPageLayout } from './ReportsPageLayout';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/ReportsPageLayout',
    component: ReportsPageLayout,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ReportsPageLayout>;

const Template: ComponentStory<typeof ReportsPageLayout> = (args) => <ReportsPageLayout {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
