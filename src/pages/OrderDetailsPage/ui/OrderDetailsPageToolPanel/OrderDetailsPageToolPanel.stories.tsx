import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { OrderDetailsPageToolPanel } from './OrderDetailsPageToolPanel';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/OrderDetailsPageToolPanel',
    component: OrderDetailsPageToolPanel,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof OrderDetailsPageToolPanel>;

const Template: ComponentStory<typeof OrderDetailsPageToolPanel> = (args) => <OrderDetailsPageToolPanel {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
