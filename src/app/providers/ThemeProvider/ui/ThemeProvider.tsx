import React, { type ReactNode, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from "@/shared/const/theme";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage";


interface ThemeProviderProps {
    initialTheme?: Theme
    children: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props

    const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)


    const defaultProps = useMemo(() => ({
        theme,
        setTheme
    }), [theme])


    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
