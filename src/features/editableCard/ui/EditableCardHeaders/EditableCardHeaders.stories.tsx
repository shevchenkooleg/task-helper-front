import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { EditableCardHeaders } from './EditableCardHeaders';


export default {
    title: 'widgets/EditableCardHeaders',
    component: EditableCardHeaders,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof EditableCardHeaders>;

const Template: ComponentStory<typeof EditableCardHeaders> = (args) => <EditableCardHeaders {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
