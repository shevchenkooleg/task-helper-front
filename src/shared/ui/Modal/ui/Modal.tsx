import cls from "./Modal.module.scss"
import { classNames, type Mods } from "@/shared/lib/classNames/classNames";
import React, { type FC, type ReactNode } from 'react';
import { Portal } from "../../Portal/Portal";
import { Overlay } from "../../Overlay/Overlay";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    element?: HTMLElement
}

export const Modal: FC<ModalProps> = (props) => {
    const ANIMATION_DELAY = 300

    const {
        className,
        children,
        isOpen,
        onClose,
        element
    } = props

    const { theme } = useTheme()
    const { close, isClosing } = useModal({ isOpen, onClose, animationDelay: ANIMATION_DELAY })


    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

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
};
