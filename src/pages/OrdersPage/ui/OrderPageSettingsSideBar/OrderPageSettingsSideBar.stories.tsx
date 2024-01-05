import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { OrderPageSettingsSideBar } from './OrderPageSettingsSideBar';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/OrderPageSettingsSideBar',
    component: OrderPageSettingsSideBar,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof OrderPageSettingsSideBar>;

const Template: ComponentStory<typeof OrderPageSettingsSideBar> = (args) => <OrderPageSettingsSideBar {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
