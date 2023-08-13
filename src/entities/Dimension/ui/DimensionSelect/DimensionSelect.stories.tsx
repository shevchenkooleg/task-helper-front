import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { DimensionSelect } from './DimensionSelect';



export default {
    title: 'widgets/DimensionSelect',
    component: DimensionSelect,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof DimensionSelect>;

const Template: ComponentStory<typeof DimensionSelect> = (args) => <DimensionSelect {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
