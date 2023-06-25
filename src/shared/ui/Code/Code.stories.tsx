import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Code } from './Code';
import { Theme } from "@/shared/const/theme";


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Code>;

const text = 'import { types ComponentMeta, types ComponentStory } from \'@storybook/react\';\n' +
    'import { ThemeDecorator } from \'shared/config/storybook/Decorators/ThemeDecorator\';\n' +
    'import { Theme } from "app/providers/ThemeProvider";\n' +
    '\n' +
    '\n' +
    '// eslint-disable-next-line @typescript-eslint/consistent-types-assertions\n' +
    'export default {\n' +
    '    title: \'widgets/Code\',\n' +
    '    component: Code,\n' +
    '    argTypes: {\n' +
    '        backgroundColor: { control: \'color\' }\n' +
    '    }\n' +
    '} as ComponentMeta<typeof Code>;\n' +
    '\n' +
    'const Template: ComponentStory<typeof Code> = (args) => <Code/>;\n' +
    '\n' +
    'export const Primary = Template.bind({});'

const Template: ComponentStory<typeof Code> = (args) => <Code {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    text
};

export const Dark = Template.bind({});
Dark.args = {
    text
};
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Olive = Template.bind({});
Olive.args = {
    text
};
Olive.decorators = [ThemeDecorator(Theme.OLIVE)]
