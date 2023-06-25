import { type Story } from "@storybook/react";
// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { classNames } from "@/shared/lib/classNames/classNames";
import { type Theme } from "@/shared/const/theme";


// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
    return (
        <ThemeProvider initialTheme={theme}>
            <div className={classNames('app', {}, [theme])}>
                <StoryComponent/>
            </div>
        </ThemeProvider>
    )
}
