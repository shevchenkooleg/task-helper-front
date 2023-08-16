import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { OrderStatusSelect } from './OrderStatusSelect';


export default {
    title: 'widgets/OrderStatusSelect',
    component: OrderStatusSelect,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof OrderStatusSelect>;

const Template: ComponentStory<typeof OrderStatusSelect> = (args) => <OrderStatusSelect {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
