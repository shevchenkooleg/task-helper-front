import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { UnitTypeSelect } from './UnitTypeSelect';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/UnitTypeSelect',
    component: UnitTypeSelect,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof UnitTypeSelect>;

const Template: ComponentStory<typeof UnitTypeSelect> = (args) => <UnitTypeSelect {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];