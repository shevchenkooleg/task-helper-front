import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { UnitDataCard } from './UnitDataCard';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/UnitDataCard',
    component: UnitDataCard,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof UnitDataCard>;

const Template: ComponentStory<typeof UnitDataCard> = (args) => <UnitDataCard {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];