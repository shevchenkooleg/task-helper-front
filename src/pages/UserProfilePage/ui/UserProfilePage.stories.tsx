import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { UserProfilePage } from './UserProfilePage';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/UserProfilePage',
    component: UserProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof UserProfilePage>;

const Template: ComponentStory<typeof UserProfilePage> = (args) => <UserProfilePage {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
