import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Theme } from "@/shared/const/theme";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage";

interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}



export function useTheme (): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        let newTheme: Theme;
        switch (theme) {
            case Theme.LIGHT:
                newTheme = Theme.DARK;
                break
            case Theme.DARK:
                newTheme = Theme.OLIVE;
                break
            case Theme.OLIVE:
                newTheme = Theme.LIGHT;
                break
            default: newTheme = Theme.LIGHT
        }
        setTheme?.(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme
    }
}
