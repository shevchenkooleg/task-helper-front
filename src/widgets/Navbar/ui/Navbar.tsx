import cls from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

interface NavbarProps {
    className?: string
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            My_APP
        </div>
    );
});

Navbar.displayName = 'Navbar';