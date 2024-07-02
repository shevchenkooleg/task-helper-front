import { memo } from 'react';
import cls from './MListBox.module.scss';
import { Listbox as HListBox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/shared/lib/classNames/classNames';
import type { DropdownDirection } from '@/shared/types/ui';
import { ButtonSize, ButtonTheme } from '../../../Button';
import { ListBoxItem } from '../ListBox/ListBox';
import { Text, TextSize } from '../../../Text';
import { HStack } from '../../../Stack';

interface MListBoxProps {
    className?: string
    items?: ListBoxItem[]
    value?: string
    defaultValue?: string
    readOnly?: boolean
    label?: string
    direction?: DropdownDirection
    labelMapper?: Record<string, string>
    onChange: <T extends string>(value: T) => void
    buttonTheme?: ButtonTheme
    size?: ButtonSize
    width?: string
}

export const MListBox = memo((props: MListBoxProps) => {

    const { items, value, onChange, label ,
        readOnly, size = ButtonSize.SIZE_M , width } = props;
    const mods = {
        [cls.readonly]: readOnly,
        [cls[size]]:true
    };

    const textSizeMapper = {
        [ButtonSize.SIZE_XL]: TextSize.SIZE_XL,
        [ButtonSize.SIZE_L]: TextSize.SIZE_L,
        [ButtonSize.SIZE_M]: TextSize.SIZE_M,
        [ButtonSize.SIZE_S]: TextSize.SIZE_S,
        [ButtonSize.SIZE_XS]: TextSize.SIZE_XS,
    };

    console.log(size);

    return (
        <HListBox value={value} onChange={onChange}>
            <ListboxButton className={classNames(cls.btn, mods,[])} disabled={readOnly} style={width ? { 'width': `${width}px` } : {}}>
                <HStack gap={'8px'}>
                    {label && <Text text={label} borderTrim={false} size={TextSize.SIZE_S}/>}
                    <Text text={value === 'any' ? '---' : value} borderTrim={false} size={textSizeMapper[size]}/>
                </HStack>
                <ChevronDownIcon
                    className={classNames(cls.dropIcon, {}, [size ? cls[size] : ''])}
                    aria-hidden="true"
                />
            </ListboxButton>
            <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <ListboxOptions
                    anchor="bottom start"
                    className={cls.option}
                >
                    {items?.map((item,id) => (
                        <ListboxOption
                            key={id}
                            value={item.value}
                            className={classNames(cls.element)}
                        >
                            <CheckIcon className={classNames(cls.checkIcon, { [cls.selected]: item.content === value } , [])} />
                            <div className={cls.text}>{item.value === 'any' ? '---' : item.content}</div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Transition>
        </HListBox>
    );
}
);

MListBox.displayName = 'MListBox';