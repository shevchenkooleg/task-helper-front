import cls from './Text.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

export enum TextAlign {
    START = 'start',
    END = 'end',
    CENTER = 'center',
    JUSTIFY = 'justify'
}

export enum TextColor {
    PRIMARY = 'primary_color',
    SECONDARY = 'secondary_color',
    BLACK = 'black_color'
}

export enum TextSize {
    SIZE_XS = 'size_xs',
    SIZE_S = 'size_s',
    SIZE_M = 'size_m',
    SIZE_L = 'size_l',
    SIZE_XL = 'size_xl'
}

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'inverted',
    HIGHLIGHT = 'highlight'
}

interface TextProps {
    className?: string
    title?: string
    text?: string
    align?: TextAlign
    size?: TextSize
    theme?: TextTheme
    borderTrim?: boolean
    inverted?: boolean
    color?: TextColor
    onClick?: ()=>void
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.SIZE_XS]: 'h5',
    [TextSize.SIZE_S]: 'h4',
    [TextSize.SIZE_M]: 'h3',
    [TextSize.SIZE_L]: 'h2',
    [TextSize.SIZE_XL]: 'h1',
};

export const Text = memo((props: TextProps) => {
    const { className, text, title, size = TextSize.SIZE_M,
        align = TextAlign.START, theme = TextTheme.INVERTED, inverted,
        onClick, borderTrim = false, color= '' } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
        [cls.inverted]: inverted,
        [cls.borderTrim]: borderTrim,
    };
    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div className={classNames(cls.Text, mods, [className])} onClick={onClick}>
            {title &&
                <HeaderTag
                    className={classNames(cls.title, { [cls[color]]: color })}
                >
                    {title}
                </HeaderTag>
            }
            {text &&
                <p
                    className={classNames(cls.text, { [cls[color]]: color }, [className])}
                >
                    {text}
                </p>
            }
        </div>
    );
});

Text.displayName = 'Text';