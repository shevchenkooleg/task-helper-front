import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AddNewMaintenanceToUnitModal } from './AddNewMaintenanceToUnitModal';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/AddNewMaintenanceToUnitModal',
    component: AddNewMaintenanceToUnitModal,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AddNewMaintenanceToUnitModal>;

const Template: ComponentStory<typeof AddNewMaintenanceToUnitModal> = (args) =>
    <AddNewMaintenanceToUnitModal {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];