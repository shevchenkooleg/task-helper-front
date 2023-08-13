import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { ListBox } from './ListBox';
import { Theme } from '@/shared/const/theme';


export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    decorators: [
        Story => <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw'
        }}><Story/></div>
    ]
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args}/>;

const dataSample = {
    defaultValue: 'defaultValue',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => {},
    items: [
        { value: 'active_1', content: 'active_1active_1', disabled: false },
        { value: 'disabled_2', content: 'disabledactive_1', disabled: true },
        { value: 'active_3', content: 'active_3active_1', disabled: false }
    ]
};


export const Primary = Template.bind({});
Primary.args = dataSample;

export const Dark = Template.bind({});
Dark.args = { ...dataSample, label: 'This is ListBox label' };
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const TopLeft = Template.bind({});
TopLeft.args = { ...dataSample, direction: 'top left' };

export const TopRight = Template.bind({});
TopRight.args = { ...dataSample, direction: 'top right' };

export const BottomLeft = Template.bind({});
BottomLeft.args = { ...dataSample, direction: 'bottom left' };

export const BottomRight = Template.bind({});
BottomRight.args = { ...dataSample, direction: 'bottom right' };
