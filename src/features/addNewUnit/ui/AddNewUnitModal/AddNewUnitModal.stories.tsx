import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AddNewUnitModal } from './AddNewUnitModal';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/AddNewUnitModal',
    component: AddNewUnitModal,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AddNewUnitModal>;

const Template: ComponentStory<typeof AddNewUnitModal> = (args) => <AddNewUnitModal {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
