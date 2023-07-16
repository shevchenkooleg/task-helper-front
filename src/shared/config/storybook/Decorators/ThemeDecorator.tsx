// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Theme } from '@/shared/const/theme';
import { Story } from '@storybook/react';

export function ThemeDecorator(theme: Theme) {
    return (
        // eslint-disable-next-line react/display-name
        (Story: Story) => (
            <ThemeProvider initialTheme={theme}>
                <div className={classNames('app', {}, [theme])}>
                    <Story/>
                </div>
            </ThemeProvider>
        )
    );
}
