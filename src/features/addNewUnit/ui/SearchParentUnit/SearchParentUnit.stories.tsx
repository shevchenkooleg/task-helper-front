import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { SearchParentUnit } from './SearchParentUnit';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/SearchParentUnit',
    component: SearchParentUnit,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof SearchParentUnit>;

const Template: ComponentStory<typeof SearchParentUnit> = (args) => <SearchParentUnit {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
