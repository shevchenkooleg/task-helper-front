import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import {
    BillOfQuantitiesStatusSelect
} from './BillOfQuantitiesStatusSelect';


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'widgets/BillOfQuantitiesStatusSelect',
    component: BillOfQuantitiesStatusSelect,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof BillOfQuantitiesStatusSelect>;

const Template: ComponentStory<typeof BillOfQuantitiesStatusSelect> = (args) =>
    <BillOfQuantitiesStatusSelect {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
