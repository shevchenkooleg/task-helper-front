import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import AddNewMaintenanceToUnitForm
    from './AddNewMaintenanceToUnitForm';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/AddNewMaintenanceToUnitForm',
    component: AddNewMaintenanceToUnitForm,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AddNewMaintenanceToUnitForm>;

const Template: ComponentStory<typeof AddNewMaintenanceToUnitForm> = (args) => <AddNewMaintenanceToUnitForm {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];