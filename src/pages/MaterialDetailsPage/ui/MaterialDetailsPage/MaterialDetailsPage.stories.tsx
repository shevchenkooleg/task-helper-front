import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import MaterialDetailsPage from './MaterialDetailsPage';


export default {
    title: 'widgets/MaterialDetailsPage',
    component: MaterialDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof MaterialDetailsPage>;

const Template: ComponentStory<typeof MaterialDetailsPage> = (args) => <MaterialDetailsPage {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
