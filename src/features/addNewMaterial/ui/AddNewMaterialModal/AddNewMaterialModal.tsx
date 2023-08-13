import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { AddNewMaterialFormAsync } from '../AddNewMaterialForm/AddNewMaterialFormAsync';

interface AddNewMaterialModelProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    element?: HTMLElement
}

export const AddNewMaterialModal = memo((props: AddNewMaterialModelProps) => {
    const { className, isOpen, onClose, element } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            element={element}
            className={classNames('', {}, [className])}
        >
            <Suspense fallback={<Loader/>}>
                <AddNewMaterialFormAsync onSuccess={onClose}/>
            </Suspense>
        </Modal>
    );
});

AddNewMaterialModal.displayName = 'AddNewMaterialModal';