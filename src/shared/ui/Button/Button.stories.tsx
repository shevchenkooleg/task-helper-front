import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { ThemeDecorator } from "@/shared/config/storybook/Decorators/ThemeDecorator";
import { Theme } from "@/shared/const/theme";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: 'shared/Button',
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text'
};

export const Primary_Disabled = Template.bind({});
Primary_Disabled.args = {
    children: 'Text',
    disabled: true
};

export const Primary_Dark = Template.bind({});
Primary_Dark.args = {
    children: 'Text'
};
Primary_Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Primary_Dark_Disabled = Template.bind({});
Primary_Dark_Disabled.args = {
    children: 'Text',
    disabled: true
};
Primary_Dark_Disabled.decorators = [ThemeDecorator(Theme.DARK)]

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR_INVERTED
};

export const Clear_Dark = Template.bind({});
Clear_Dark.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR
};
Clear_Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL
};

export const Outline_Dark = Template.bind({});
Outline_Dark.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE
};
Outline_Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Background = Template.bind({});
Background.args = {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND_INVERTED
};

export const Background_Dark = Template.bind({});
Background_Dark.args = {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND
};
Background_Dark.decorators = [ThemeDecorator(Theme.DARK)]
export const BackgroundInverted_Dark = Template.bind({});
BackgroundInverted_Dark.args = {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND_INVERTED
};
BackgroundInverted_Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Square = Template.bind({});
Square.args = {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true
};

export const SquareL = Template.bind({});
SquareL.args = {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.L
};

export const SquareXL = Template.bind({});
SquareXL.args = {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.XL
};
