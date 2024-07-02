import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StructurePageToolsPanel } from './StructurePageToolsPanel';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/StructurePageToolsPanel',
    component: StructurePageToolsPanel,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof StructurePageToolsPanel>;

const Template: ComponentStory<typeof StructurePageToolsPanel> = (args) => <StructurePageToolsPanel {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
