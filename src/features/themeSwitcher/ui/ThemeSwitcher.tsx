import cls from './ThemeSwitcher.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import LightIcon from '../../../shared/assets/icons/theme-light.svg';
import DarkIcon from '../../../shared/assets/icons/theme-dark.svg';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={()=>toggleTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
        >
            {theme === Theme.LIGHT ?
                <LightIcon/> : <DarkIcon/>
            }
        </div>
    );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';