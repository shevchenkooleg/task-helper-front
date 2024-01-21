import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { BaseOrderInformation } from './BaseOrderInformation';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/BaseOrderInformation',
    component: BaseOrderInformation,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof BaseOrderInformation>;

const Template: ComponentStory<typeof BaseOrderInformation> = (args) => <BaseOrderInformation {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
