import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { SearchMaintenance } from './SearchMaintenance';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/SearchMaintenance',
    component: SearchMaintenance,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof SearchMaintenance>;

const Template: ComponentStory<typeof SearchMaintenance> = (args) => <SearchMaintenance {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];