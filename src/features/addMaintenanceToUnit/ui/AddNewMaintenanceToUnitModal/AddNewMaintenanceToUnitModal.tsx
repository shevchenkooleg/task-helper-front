import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';


import {
    AddNewMaintenanceToUnitFormAsync
} from '../AddNewMaintenanceToUnitForm/AddNewMaintenanceToUnitFormAsync';

interface AddNewMaintenanceToUnitModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    element?: HTMLElement
}

export const AddNewMaintenanceToUnitModal = memo((props: AddNewMaintenanceToUnitModalProps) => {
    const { className , isOpen, onClose, element } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            element={element}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader/>}>
                <AddNewMaintenanceToUnitFormAsync onSuccess={onClose}/>
            </Suspense>
        </Modal>
    );
});

AddNewMaintenanceToUnitModal.displayName = 'AddNewMaintenanceToUnitModal';