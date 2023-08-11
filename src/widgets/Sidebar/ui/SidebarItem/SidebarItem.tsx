import cls from './SidebarItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { memo, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { getUserAuthData } from '@/entities/User';
import { SidebarItemTypes } from '../../model/types/sidebar';

interface SidebarItemProps {
    collapsed: boolean
    item: SidebarItemTypes
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { collapsed, item } = props;
    // consts isAuth = useSelector(getUserAuthData);

    const [show, setShow] = useState(true);


    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (collapsed) {
            setShow(false);
        } else {
            timer = setTimeout(() => {
                setShow(true);
            }, 250);
        }

        return () => { clearTimeout(timer); };
    }, [collapsed]);

    // if (item.authOnly && !isAuth?.id) {
    //     return null;
    // }

    return (
        <div className={classNames('', { [cls.collapsed]: collapsed })}>
            <AppLink
                theme={AppLinkTheme.SECONDARY}
                to={item.path}
            >
                <item.Icon className={cls.icon}/>
                {show && <span className={classNames(cls.link)}>{`${item.text}`}</span>}
            </AppLink>
        </div>
    );
});


SidebarItem.displayName = 'SidebarItem';
