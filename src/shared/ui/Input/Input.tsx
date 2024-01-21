import cls from './Input.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo, type FC, type InputHTMLAttributes } from 'react';
import { HStack } from '../Stack';

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export enum InputTypes {
    TEXT = 'text',
    NUMBER = 'number',
}

export enum InputTheme {
    CLEAR = 'clear',
    REGULAR = 'regular'
}

interface InputProps extends InputAttributes {
    className?: string
    value?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
    readOnly?: boolean
    between?: boolean
    dataType?: InputTypes
    autoWidth?: boolean
    theme?: InputTheme
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        className,
        value,
        autoFocus,
        readOnly,
        onChange,
        between,
        dataType = InputTypes.TEXT,
        theme = InputTheme.REGULAR,
        placeholder,
        autoWidth,
        ...otherProps

    } = props;

    let keyDownValue = '1';

    const onKeyDownHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
        keyDownValue = e.key;
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('keyDownValue ', keyDownValue);
        if (dataType === InputTypes.NUMBER) {
            // console.log('e.currentTarget.value.length ', e.currentTarget.value.length);
            if (e.currentTarget.value.length > 0 && e.currentTarget.value.match(/^\d+$/)) {
                onChange?.(e.currentTarget.value);
            } else {
                onChange?.(e.currentTarget.value.replace(',', '.'));
                // onChange?.('0');
            }
        }
        if (dataType === InputTypes.TEXT) {
            onChange?.(e.currentTarget.value);
        }
    };

    const content =
        <>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder} `}
                </div>
            )}
            <div>
                <input
                    type={dataType}
                    value={value}
                    onKeyDown={onKeyDownHandler}
                    onChange={onChangeHandler}
                    disabled={readOnly}
                    style={{ width: `${autoWidth && value && value.length * 10}px` }}
                    {...otherProps}
                />
            </div>
        </>;

    if (between){
        return (
            <HStack justify={'between'} className={classNames(cls.InputWrapper, {}, [className])}>
                {content}
            </HStack>
        );
    }

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {content}
        </div>
    );

});


Input.displayName = 'Input';
