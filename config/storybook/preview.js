import { StyleDecorator } from '../../src/shared/config/storybook/Decorators/StyleDecorator';
import { addDecorator } from '@storybook/react';
import { RouterDecorator } from '../../src/shared/config/storybook/Decorators/RouterDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/Decorators/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
