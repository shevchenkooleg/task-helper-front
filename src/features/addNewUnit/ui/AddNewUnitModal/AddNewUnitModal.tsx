import cls from './AddNewUnitModal.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { AddNewUnitFormAsync } from '../AddNewUnitForm/AddNewUnitFormAsync';

interface AddNewUnitModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    element?: HTMLElement
}

export const AddNewUnitModal = (props: AddNewUnitModalProps) => {
    const { className , isOpen, onClose, element } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            element={element}
            className={classNames(cls.AddNewUnitModal, {}, [className])}
        >
            <Suspense fallback={<Loader/>}>
                <AddNewUnitFormAsync onSuccess={onClose} isOpen={isOpen}/>
            </Suspense>
        </Modal>
    );
};

AddNewUnitModal.displayName = 'AddNewUnitModal';