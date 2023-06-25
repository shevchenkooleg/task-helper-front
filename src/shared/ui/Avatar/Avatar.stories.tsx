import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Avatar } from "./Avatar";
import avatarImg from '../../assets/tests/storybook.png'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    size: 150,
    avatar: avatarImg
};
export const Small = Template.bind({});
Small.args = {
    size: 50,
    avatar: avatarImg
};

