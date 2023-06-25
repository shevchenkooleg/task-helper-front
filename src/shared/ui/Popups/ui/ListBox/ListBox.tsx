import cls from "./ListBox.module.scss"
import popupCls from './../../styles/popup.module.scss'
import { classNames } from "@/shared/lib/classNames/classNames";
import { Fragment, type ReactNode } from "react";
import { Listbox as HListbox } from '@headlessui/react'
import { Button } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { type DropdownDirection } from "../../../../types/ui";
import { mapDirectionClass } from "../../styles/styleClassMapper";

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
    onChange: <T extends string>(value: T) => void
}

export const ListBox = (props: ListBoxProps) => {
    const { className, items, value, defaultValue, readOnly, label, direction = 'bottom right', onChange } = props

    const optionClasses = [
        mapDirectionClass[direction]
    ]

    return (
        <HStack gap={'16'}>
            {label &&
                <span>
                    {label}
                </span>
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
                    <Button disabled={readOnly}>
                        {value ?? defaultValue}
                    </Button>
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
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>

    )
}



// ListBox.displayName = 'ListBox'
