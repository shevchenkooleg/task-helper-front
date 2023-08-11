import { classNames } from '@/shared/lib/classNames/classNames';
import { Suspense, type FC } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Loader } from '@/shared/ui/Loader';

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    element?: HTMLElement
}


export const LoginModal: FC<LoginModalProps> = (props) => {
    const { className, isOpen, onClose, element } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            element={element}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader/>}>
                <LoginFormAsync onSuccess={onClose}/>
            </Suspense>
        </Modal>
    );
};
