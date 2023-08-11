import React, { ReactNode, useMemo, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

export interface ThemeProviderProps {
    children: ReactNode,
    initialTheme?: Theme
}

const ThemeProvider = (props: ThemeProviderProps) => {

    const { initialTheme = Theme.LIGHT, children } = props;

    const restoredTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
    const [theme, setTheme] = useState<Theme>(restoredTheme ? restoredTheme : initialTheme);

    const defaultProps = useMemo(()=>({
        theme,
        setTheme
    }),[theme]);


    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;