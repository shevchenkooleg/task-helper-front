import cls from './ListBox.module.scss';
import popupCls from './../../styles/popup.module.scss';
import { Fragment, type ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { type DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/styleClassMapper';
import { HStack } from '../../../Stack';
import { ButtonSize, ButtonTheme } from '../../../Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '../../../Text';

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface ListBoxProps {
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

export const  ListBox = (props: ListBoxProps) => {
    const { className, items, value, defaultValue, readOnly,
        label, labelMapper, direction = 'bottom right', onChange, buttonTheme = ButtonTheme.OUTLINE, size = ButtonSize.SIZE_M } = props;

    const optionClasses = [
        mapDirectionClass[direction]
    ];

    return (
        <HStack gap={'16px'}>
            {label &&
                <Text text={label} borderTrim={true} size={TextSize.SIZE_S}/>
            }
            <HListbox
                as={'div'}
                disabled={readOnly}
                className={classNames(popupCls.popup, {}, [className])}
                value={value}
                onChange={onChange}
            >
                <HListbox.Button
                    className={cls.trigger}
                    as={'div'}
                >
                    {/*<Button disabled={readOnly} theme={buttonTheme} size={size} trimPadding={true}>*/}
                    {/*    {labelMapper && value && defaultValue ? (labelMapper[value] ?? labelMapper[defaultValue]) : (value || defaultValue)}*/}
                    {/*</Button>*/}
                    <Text borderTrim={true} size={TextSize.SIZE_M} text={labelMapper && value && defaultValue ? (labelMapper[value] ?? labelMapper[defaultValue]) : (value || defaultValue)}/>
                </HListbox.Button>
                <HListbox.Options className={classNames(cls.options, {}, optionClasses)}>
                    {items?.map((item, id) => (
                        <HListbox.Option
                            key={id}
                            value={item.value}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [popupCls.active]: active,
                                            [popupCls.disabled]: item.disabled
                                        }, []
                                    )}
                                >
                                    {selected && '!!! '}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>

    );
};



// ListBox.displayName = 'ListBox'
