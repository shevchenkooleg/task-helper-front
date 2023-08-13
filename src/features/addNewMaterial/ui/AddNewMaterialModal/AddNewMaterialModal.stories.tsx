import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AddNewMaterialModal } from './AddNewMaterialModal';


export default {
    title: 'widgets/AddNewMaterialModal',
    component: AddNewMaterialModal,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AddNewMaterialModal>;

const Template: ComponentStory<typeof AddNewMaterialModal> = (args) => <AddNewMaterialModal {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
