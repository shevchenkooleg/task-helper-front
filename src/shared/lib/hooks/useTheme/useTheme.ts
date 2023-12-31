import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface useThemeResult {
    toggleTheme: (newTheme: Theme) => void
    theme: Theme
}

export function useTheme(): useThemeResult {

    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (newTheme: Theme) => {
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        toggleTheme,
        theme: theme || Theme.LIGHT
    };

}


