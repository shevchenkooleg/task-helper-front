import cls from "./Dropdown.module.scss"
import popupCls from './../../styles/popup.module.scss'
import { classNames } from "@/shared/lib/classNames/classNames";
import { Menu } from '@headlessui/react'
import { Fragment, type ReactNode } from "react";
import { Button, ButtonTheme } from "../../../Button/Button";
import { AppLink } from "../../../AppLink/AppLink";
import { mapDirectionClass } from "../../styles/styleClassMapper";
import { type DropdownDirection } from "@/shared/types/ui";


export interface DropdownItem {
    disabled?: boolean
    content: ReactNode
    onClick?: () => void
    href?: string
}

export interface DropdownProps {
    className?: string
    items: DropdownItem[]
    trigger: ReactNode
    direction?: DropdownDirection
}

export const Dropdown = (props: DropdownProps) => {
    const { className, trigger, items, direction = 'bottom right' } = props

    const menuClasses = [
        mapDirectionClass[direction]
    ]

    return (
        <Menu as={'div'} className={classNames(popupCls.popup, {}, [className])}>
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={classNames(cls.item, { [popupCls.active]: active })}
                            onClick={item.onClick}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </Button>
                    )

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} key={index} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item as={Fragment} key={index} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    );
}
