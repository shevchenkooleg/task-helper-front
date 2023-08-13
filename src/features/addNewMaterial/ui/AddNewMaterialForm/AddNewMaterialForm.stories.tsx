import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import AddNewMaterialForm from './AddNewMaterialForm';



export default {
    title: 'widgets/AddNewMaterialForm',
    component: AddNewMaterialForm,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AddNewMaterialForm>;

const Template: ComponentStory<typeof AddNewMaterialForm> = (args) => <AddNewMaterialForm {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
