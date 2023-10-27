import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { OrdersYearsOfExecutionSelect } from './OrdersYearsOfExecutionSelect';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/OrdersYearsOfExecutionSelect',
    component: OrdersYearsOfExecutionSelect,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof OrdersYearsOfExecutionSelect>;

const Template: ComponentStory<typeof OrdersYearsOfExecutionSelect> = (args) =>
    <OrdersYearsOfExecutionSelect {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
