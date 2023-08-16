import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { MaterialsPageTable } from './MaterialsPageTable';


export default {
    title: 'widgets/MaterialsPageTable',
    component: MaterialsPageTable,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof MaterialsPageTable>;

const Template: ComponentStory<typeof MaterialsPageTable> = (args) => <MaterialsPageTable {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
