import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { SearchMaterial } from './SearchMaterial';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/SearchMaterial',
    component: SearchMaterial,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof SearchMaterial>;

const Template: ComponentStory<typeof SearchMaterial> = (args) => <SearchMaterial {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
