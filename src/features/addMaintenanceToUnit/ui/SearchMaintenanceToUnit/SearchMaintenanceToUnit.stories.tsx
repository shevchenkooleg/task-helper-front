import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { SearchMaintenanceToUnit } from './SearchMaintenanceToUnit';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/SearchMaintenanceToUnit',
    component: SearchMaintenanceToUnit,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof SearchMaintenanceToUnit>;

const Template: ComponentStory<typeof SearchMaintenanceToUnit> = (args) => <SearchMaintenanceToUnit {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];