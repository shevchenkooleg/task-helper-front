import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AddMaterialToOrderModal } from '../..';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/AddMaterialToOrderModal',
    component: AddMaterialToOrderModal,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AddMaterialToOrderModal>;

const Template: ComponentStory<typeof AddMaterialToOrderModal> = (args) => <AddMaterialToOrderModal {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
