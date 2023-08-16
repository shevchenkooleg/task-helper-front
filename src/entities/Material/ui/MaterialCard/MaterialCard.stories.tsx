import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { MaterialCard } from './MaterialCard';


export default {
    title: 'widgets/MaterialCard',
    component: MaterialCard,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof MaterialCard>;

const Template: ComponentStory<typeof MaterialCard> = (args) => <MaterialCard {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
