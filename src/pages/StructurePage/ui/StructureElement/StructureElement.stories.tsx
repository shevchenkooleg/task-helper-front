import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StructureElement } from './StructureElement';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/StructureElement',
    component: StructureElement,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof StructureElement>;

const Template: ComponentStory<typeof StructureElement> = (args) => <StructureElement {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
