import cls from './Input.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo, type FC, type InputHTMLAttributes } from 'react';
import { HStack } from '../Stack';
import { TextSize } from '../Text';

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
    fontSize?: TextSize
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
        width,
        fontSize,
        ...otherProps

    } = props;

    let keyDownValue = '1';

    const onKeyDownHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
        keyDownValue = e.key;
    };

    const inputWidth = width ? width : autoWidth ? autoWidth && value && value.length * 11 : '175';

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
                    className={classNames('', {}, [fontSize ? cls[fontSize] : ''])}
                    type={dataType}
                    value={value}
                    onKeyDown={onKeyDownHandler}
                    onChange={onChangeHandler}
                    disabled={readOnly}
                    style={{ width: `${inputWidth}px`, paddingLeft: '5px' }}
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
