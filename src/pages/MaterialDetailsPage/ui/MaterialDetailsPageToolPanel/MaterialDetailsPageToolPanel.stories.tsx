import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { MaterialDetailsPageToolPanel } from './MaterialDetailsPageToolPanel';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/MaterialDetailsPageToolPanel',
    component: MaterialDetailsPageToolPanel,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof MaterialDetailsPageToolPanel>;

const Template: ComponentStory<typeof MaterialDetailsPageToolPanel> = (args) =>
    <MaterialDetailsPageToolPanel {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
