import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { MaintenanceUnitInformation } from './MaintenanceUnitInformation';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/MaintenanceUnitInformation',
    component: MaintenanceUnitInformation,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof MaintenanceUnitInformation>;

const Template: ComponentStory<typeof MaintenanceUnitInformation> = (args) => <MaintenanceUnitInformation {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];