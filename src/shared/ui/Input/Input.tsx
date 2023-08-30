import cls from './Input.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo, type FC, type InputHTMLAttributes } from 'react';
import { HStack } from '../Stack';

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export const enum InputTypes {
    TEXT = 'text',
    NUMBER = 'number',
}

interface InputProps extends InputAttributes {
    className?: string
    value?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
    readOnly?: boolean
    between?: boolean
    type?: InputTypes
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        className,
        value,
        autoFocus,
        readOnly,
        onChange,
        between,
        type = InputTypes.TEXT,
        placeholder,
        ...otherProps

    } = props;

    let keyDownValue = '1';

    const onKeyDownHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
        keyDownValue = e.key;
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('keyDownValue ', keyDownValue);
        if (type === InputTypes.NUMBER) {
            console.log('e.currentTarget.value.length ', e.currentTarget.value.length);
            if (e.currentTarget.value.length > 0 && e.currentTarget.value.match(/^\d+$/)) {
                onChange?.(e.currentTarget.value);
            } else {
                onChange?.(e.currentTarget.value.replace(',', '.'));
                // onChange?.('0');
            }
        }
        if (type === InputTypes.TEXT) {
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
            <input type={type} value={value} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} disabled={readOnly} {...otherProps}/>
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
