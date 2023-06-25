import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Card } from './Card';
import { Text } from "../Text/Text";
import { Theme } from '@/shared/const/theme';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    children: <Text title={'Some title'} text={'Some text'}/>
};

export const Dark = Template.bind({});
Dark.args = {
    children: <Text title={'Some title'} text={'Some text'}/>
};
Dark.decorators = [ThemeDecorator(Theme.DARK)]
