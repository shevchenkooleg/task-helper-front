import cls from "./Tabs.module.scss"
import { classNames } from "@/shared/lib/classNames/classNames";
import React, { type ReactNode, useCallback } from "react";
import { Card, CardTheme } from "../Card/Card";

export interface TabItem<T extends string> {
    value: T
    content: ReactNode
}

interface TabsProps<T extends string> {
    className?: string
    tabs: Array<TabItem<T>>
    value: T
    onTabClick: (tab: TabItem<T>) => void
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const { className, tabs, value, onTabClick } = props

    const clickHandler = useCallback((tab: TabItem<T>) => {
        return () => { onTabClick(tab) }
    }, [onTabClick])

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    className={cls.tab}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    key={tab.value}
                    onClick={clickHandler(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};

Tabs.displayName = 'Tabs'
