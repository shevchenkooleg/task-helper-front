import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { EditableCard } from './EditableCard';


export default {
    title: 'widgets/EditableCard',
    component: EditableCard,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof EditableCard>;

const Template: ComponentStory<typeof EditableCard> = (args) => <EditableCard {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
