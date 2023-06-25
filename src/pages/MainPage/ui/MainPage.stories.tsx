import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { StoreDecorator } from "@/shared/config/storybook/Decorators/StoreDecorator";
import MainPage from './MainPage';
import { Theme } from "@/shared/const/theme";



// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'pages/ForbiddenPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args) => <MainPage/>;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})]

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]
