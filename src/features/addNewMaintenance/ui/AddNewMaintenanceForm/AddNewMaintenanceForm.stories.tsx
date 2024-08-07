import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import AddNewMaintenanceForm from './AddNewMaintenanceForm';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/AddNewMaintenanceForm',
    component: AddNewMaintenanceForm,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AddNewMaintenanceForm>;

const Template: ComponentStory<typeof AddNewMaintenanceForm> = (args) => <AddNewMaintenanceForm {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];