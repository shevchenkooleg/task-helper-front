import type { Preview } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import '../../src/app/styles/index.scss';
import '../../src/app/styles/themes/dark.scss';
import '../../src/app/styles/themes/light.scss';
import { ThemeDecorator } from '@/shared/config/storybook/Decorators/ThemeDecorator';
import { RouterDecorator } from '@/shared/config/storybook/Decorators/RouterDecorator';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        RouterDecorator
    ]
};



export default preview;
