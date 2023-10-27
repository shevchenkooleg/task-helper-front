import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { OrderStatusFilter } from './OrderStatusFilter';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/OrderStatusFilter',
    component: OrderStatusFilter,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof OrderStatusFilter>;

const Template: ComponentStory<typeof OrderStatusFilter> = (args) => <OrderStatusFilter {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
