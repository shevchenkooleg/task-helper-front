import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, Suspense } from 'react';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { AddNewMaintenanceFormAsync } from '../AddNewMaintenanceForm/AddNewMaintenanceFormAsync';

interface AddNewMaintenanceModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    element?: HTMLElement
}

export const AddNewMaintenanceModal = memo((props: AddNewMaintenanceModalProps) => {
    const { className , isOpen, onClose , element } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            element={element}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader/>}>
                <AddNewMaintenanceFormAsync onSuccess={onClose}/>
            </Suspense>
        </Modal>
    );
});

AddNewMaintenanceModal.displayName = 'AddNewMaintenanceModal';