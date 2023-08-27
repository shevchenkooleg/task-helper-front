import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ComboBox } from './ComboBox';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/ComboBox',
    component: ComboBox,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ComboBox>;

const Template: ComponentStory<typeof ComboBox> = (args) => <ComboBox {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
