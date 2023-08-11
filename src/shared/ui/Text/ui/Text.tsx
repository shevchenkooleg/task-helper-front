import cls from './Text.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

export enum TextAlign {
    START = 'start',
    END = 'end',
    CENTER = 'center',
    JUSTIFY = 'justify'
}

export enum TextSize {
    SIZE_S = 'size_s',
    SIZE_M = 'size_m',
    SIZE_L = 'size_l',
    SIZE_XL = 'size_xl'
}

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'inverted'
}

interface TextProps {
    className?: string
    title?: string
    text?: string
    align?: TextAlign
    size?: TextSize
    theme?: TextTheme
    inverted?: boolean
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.SIZE_S]: 'h4',
    [TextSize.SIZE_M]: 'h3',
    [TextSize.SIZE_L]: 'h2',
    [TextSize.SIZE_XL]: 'h1',
};

export const Text = memo((props: TextProps) => {
    const { className, text, title, size = TextSize.SIZE_M, align = TextAlign.START, theme = TextTheme.PRIMARY, inverted } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
        [cls.inverted]: inverted
    };
    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title &&
                <HeaderTag
                    className={cls.title}
                >
                    {title}
                </HeaderTag>
            }
            {text &&
                <p
                    className={cls.text}
                >
                    {text}
                </p>
            }
        </div>
    );
});

Text.displayName = 'Text';