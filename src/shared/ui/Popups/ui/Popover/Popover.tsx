import cls from "./Popover.module.scss"
import popupCls from '../../styles/popup.module.scss'
import { classNames } from "@/shared/lib/classNames/classNames";

import { Popover as HPopover } from '@headlessui/react'
import { type ReactNode } from "react";
import { type DropdownDirection } from "@/shared/types/ui";
import { mapDirectionClass } from "../../styles/styleClassMapper";

interface PopoverProps {
    className?: string
    trigger: ReactNode
    direction?: DropdownDirection
    children: ReactNode
}

export const Popover = (props: PopoverProps) => {
    const { className, trigger, direction = 'bottom right', children } = props

    const menuClasses = [
        mapDirectionClass[direction]
    ]

    return (
        <HPopover className={classNames('', {}, [className, popupCls.popup])}>
            <HPopover.Button as={'div'} className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
