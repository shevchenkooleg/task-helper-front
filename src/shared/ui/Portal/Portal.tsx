import { type FC, type ReactNode } from 'react';
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode
    element?: HTMLElement
}

export const Portal: FC<PortalProps> = (props) => {
    const { children, element = document.body.firstElementChild as HTMLElement } = props

    return (
        createPortal(children, element)
    );
};
