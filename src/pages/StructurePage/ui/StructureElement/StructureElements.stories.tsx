import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StructureElements } from './StructureElements';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/StructureElement',
    component: StructureElements,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof StructureElements>;

const Template: ComponentStory<typeof StructureElements> = (args) => <StructureElements {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
