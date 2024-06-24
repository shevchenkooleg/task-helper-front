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
}

export const MListBox = memo((props: MListBoxProps) => {

    const { items, value, onChange, label } = props;

    console.log(value);
    return (
        <HListBox value={value} onChange={onChange}>
            <ListboxButton className={cls.btn}>
                {label &&
                    <HStack gap={'8px'}>
                        <Text text={label} borderTrim={false} size={TextSize.SIZE_S}/>
                        <Text text={value === 'any' ? '---' : value} borderTrim={false} size={TextSize.SIZE_M}/>
                    </HStack>
                }
                <ChevronDownIcon
                    className={cls.dropIcon}
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
                            <CheckIcon className={classNames(cls.checkIcon, { [cls.selected]: item.value === value } , [])} />
                            <div className={cls.text}>{item.value === 'any' ? '---' : item.value}</div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Transition>
        </HListBox>
    );
}
);

MListBox.displayName = 'MListBox';