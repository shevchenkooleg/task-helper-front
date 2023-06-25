import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Dropdown } from './Dropdown';
import { Button } from "../../../Button/Button";
import { Theme } from "@/shared/const/theme";


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    decorators: [
        Story => <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%'
        }}><Story/></div>
    ]
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args}/>;

const DropdownProps = {
    trigger: <Button>Open</Button>,
    items: [
        { disabled: false, content: 'first element', onClick: () => { console.log('first') }, href: 'first_string' },
        { disabled: false, content: 'second element', onClick: () => { console.log('second') }, href: 'second_string' },
        { disabled: false, content: 'third element', onClick: () => { console.log('third') }, href: 'third_string' }
    ]
}

export const Primary = Template.bind({});
Primary.args = { ...DropdownProps };

export const Dark = Template.bind({});
Dark.args = { ...DropdownProps };
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Olive = Template.bind({});
Olive.args = { ...DropdownProps };
Olive.decorators = [ThemeDecorator(Theme.OLIVE)]

export const TopLeft = Template.bind({});
TopLeft.args = { ...DropdownProps, direction: "top left" };

export const TopRight = Template.bind({});
TopRight.args = { ...DropdownProps, direction: "top right" };

export const BottomLeft = Template.bind({});
BottomLeft.args = { ...DropdownProps, direction: "bottom left" };

export const BottomRight = Template.bind({});
BottomRight.args = { ...DropdownProps, direction: "bottom right" };
