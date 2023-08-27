import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import AddMaterialToOrderForm from './AddMaterialToOrderForm';


export default {
    title: 'widgets/AddMaterialToOrderForm',
    component: AddMaterialToOrderForm,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AddMaterialToOrderForm>;

const Template: ComponentStory<typeof AddMaterialToOrderForm> = (args) => <AddMaterialToOrderForm {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
