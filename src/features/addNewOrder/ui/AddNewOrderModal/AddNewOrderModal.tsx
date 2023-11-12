import { classNames } from '@/shared/lib/classNames/classNames';
import { Suspense, type FC } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { AddNewOrderFormAsync } from '../AddNewOrderForm/AddNewOrderFormAsync';

interface AddNewOrderModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    element?: HTMLElement
}


export const AddNewOrderModal: FC<AddNewOrderModalProps> = (props) => {
    const { className, isOpen, onClose, element } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            element={element}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader/>}>
                <AddNewOrderFormAsync onSuccess={onClose} isOpen={isOpen}/>
            </Suspense>
        </Modal>
    );
};
