import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { MaterialsPageToolsPanel } from './MaterialsPageToolsPanel';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/MaterialsPageToolsPanel',
    component: MaterialsPageToolsPanel,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof MaterialsPageToolsPanel>;

const Template: ComponentStory<typeof MaterialsPageToolsPanel> = (args) => <MaterialsPageToolsPanel {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
