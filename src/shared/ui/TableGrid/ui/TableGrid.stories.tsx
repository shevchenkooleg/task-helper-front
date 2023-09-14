import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { TableGrid } from './TableGrid';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/TableGrid',
    component: TableGrid,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof TableGrid>;

const Template: ComponentStory<typeof TableGrid> = (args) => <TableGrid {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
