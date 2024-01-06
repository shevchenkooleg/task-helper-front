import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { OrderPageTableSettings } from './OrderPageTableSettings';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/OrderPageTableSettings',
    component: OrderPageTableSettings,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof OrderPageTableSettings>;

const Template: ComponentStory<typeof OrderPageTableSettings> = (args) => <OrderPageTableSettings {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
