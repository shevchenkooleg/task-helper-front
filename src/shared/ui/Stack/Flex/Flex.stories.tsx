import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Flex } from './Flex';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
