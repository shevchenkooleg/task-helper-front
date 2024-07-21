import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { BaseUnitInformation } from './BaseUnitInformation';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/BaseUnitInformation',
    component: BaseUnitInformation,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof BaseUnitInformation>;

const Template: ComponentStory<typeof BaseUnitInformation> = (args) => <BaseUnitInformation {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];