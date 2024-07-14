import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { UnitStructureCard } from './UnitStructureCard';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/UnitStructureCard',
    component: UnitStructureCard,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof UnitStructureCard>;

const Template: ComponentStory<typeof UnitStructureCard> = (args) => <UnitStructureCard {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
