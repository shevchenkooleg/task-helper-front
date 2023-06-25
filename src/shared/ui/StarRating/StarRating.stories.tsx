import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { StarRating } from './StarRating';
import { Theme } from "@/shared/const/theme";


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/StarRating',
    component: StarRating,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args}/>;

export const UnSelected = Template.bind({});
UnSelected.args = {};

export const Selected = Template.bind({});
Selected.args = { selectedStars: 3 };
Selected.decorators = [ThemeDecorator(Theme.OLIVE)]
