import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { AppImage } from './AppImage';
import { Theme } from '@/shared/const/theme';
import { Skeleton } from "../Skeleton";
import { Icon } from '../Icon'
import errorIcon from '../../assets/tests/AvatarFallback-icon.svg'


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/AppImage',
    component: AppImage,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AppImage>;


const size = '100px'
const Template: ComponentStory<typeof AppImage> = (args) => <AppImage style={{ width: '100px', height: '100px' } } {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    fallback: <Skeleton width={size} height={size}/>,
    errorFallback: <Icon Svg={errorIcon} width={size} height={size}/>,
    src: "https://i.imgur.com/qw7CV6k.jpg"
};

export const WithLoadingError = Template.bind({});
WithLoadingError.args = {
    fallback: <Skeleton width={size} height={size}/>,
    errorFallback: <Icon Svg={errorIcon} width={size} height={size}/>,
    src: ""
};
WithLoadingError.decorators = [ThemeDecorator(Theme.DARK)]
