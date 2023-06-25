import { type MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

interface UseModalProps {
    onClose?: () => void
    isOpen?: boolean
    lazy?: boolean
    animationDelay: number
}

export function useModal ({ isOpen, lazy, onClose, animationDelay }: UseModalProps) {
    const close = useCallback(() => {
        setIsClosing(true)
        if (onClose) {
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, animationDelay)
        }
    }, [animationDelay, onClose])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close()
        }
    }, [close])

    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    return {
        isClosing,
        close
    }
}
