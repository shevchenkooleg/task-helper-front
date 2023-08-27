import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import {
    AddMaterialToOrderFormAsync
} from '../AddMaterialToOrderForm/AddMaterialToOrderFormAsync';
import { ModalMode } from '@/shared/const/modalConst';

interface AddMaterialToOrderModelProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    element?: HTMLElement
    mode: ModalMode
}

export const AddMaterialToOrderModal = memo((props: AddMaterialToOrderModelProps) => {

    const { className, isOpen, onClose, element, mode } = props;
    // console.log('AddMaterialToOrderModel rerender');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            element={element}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader/>}>
                <AddMaterialToOrderFormAsync onSuccess={onClose} mode={mode} onClose={onClose}/>
            </Suspense>
        </Modal>
    );
});

AddMaterialToOrderModal.displayName = 'AddMaterialToOrderModel';