import cls from './NavbarToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { HStack } from '@/shared/ui/Stack';
import HelpIcon from '@/shared/assets/icons/Help.svg';
import Mail from '@/shared/assets/icons/Mail.svg';
import Chat from '@/shared/assets/icons/Chat.svg';
import Notification from '@/shared/assets/icons/Notifications.svg';
import { NavbarItemType } from '../../types/navbar';
import { NavbarToolsItem } from '../NavbarToolsItem/NavbarToolsItem';

interface NavbarToolsPanelProps {
    className?: string
}




const navbarToolsItems: Array<NavbarItemType> = [
    {
        path: '',
        Icon: Mail
    },
    {
        path: '',
        Icon: Chat
    },
    {
        path: '',
        Icon: Notification
    },
    {
        path: '',
        Icon: HelpIcon
    },
];

export const NavbarToolsPanel = memo((props: NavbarToolsPanelProps) => {
    const { className } = props;

    return (
        <HStack gap={'16px'} className={classNames(cls.NavbarToolsPanel, {}, [className])}>
            {navbarToolsItems.map((item, index)=>(
                <NavbarToolsItem item={item} key={index}/>
            ))}
        </HStack>
    );
});

NavbarToolsPanel.displayName = 'NavbarToolsPanel';