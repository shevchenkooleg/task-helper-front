import cls from './NavbarToolsItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { NavbarItemType } from '../../types/navbar';

interface NavbarToolsItemProps {
    className?: string
    item: NavbarItemType
}

export const NavbarToolsItem = memo((props: NavbarToolsItemProps) => {
    const { className, item } = props;

    return (
        <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={item.path}
        >
            <VStack justify={'center'} gap={'8px'} align={'center'}>
                <item.Icon className={classNames(cls.icon, {}, [className])}/>
            </VStack>
        </AppLink>
    );
});

NavbarToolsItem.displayName = 'NavbarToolsItem';