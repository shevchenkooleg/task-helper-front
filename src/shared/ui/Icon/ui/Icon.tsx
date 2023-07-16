import cls from './Icon.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement>{
    className?: string,
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    inverted?: boolean
}

export const Icon = memo((props: IconProps) => {
    const { className, Svg, inverted, ...otherProps } = props;

    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}
            {...otherProps}
        />
    );
});

Icon.displayName = 'Icon';