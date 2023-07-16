import cls from './Modal.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Portal } from '../../Portal/ui/Portal';
import { Overlay } from '../../Overlay';

interface ModalProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    element?: HTMLElement
}

export const Modal = memo((props: ModalProps) => {
    const { className, children, isOpen, onClose, element } = props;
    const ANIMATION_DELAY = 300;
    const { theme } = useTheme();
    const { close, isClosing } = useModal({ isOpen, onClose, animationDelay: ANIMATION_DELAY });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    };

    return (
        <Portal element={element}>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
                <Overlay onClick={close}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});

Modal.displayName = 'Modal';