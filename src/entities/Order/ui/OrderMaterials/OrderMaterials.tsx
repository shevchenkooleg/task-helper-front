import cls from './OrderMaterials.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { OrderMaterialsTable } from '../OrderMaterialsTable/OrderMaterialsTable';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ButtonSize } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
// TODO
// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { AddMaterialToOrderModal, materialToOrderSliceActions } from '@/features/addMatarialToOrder';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ModalMode } from '@/shared/const/modalConst';

interface OrderMaterialsProps {
    className?: string
}

export const OrderMaterials = memo((props: OrderMaterialsProps) => {
    const { className } = props;
    const editMode = useSelector(getOrderDetailsEditMode);
    const dispatch = useAppDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copyMaterialMode, setCopyMaterialMode] = useState(false);
    const [modalMode, setModalMode] = useState(ModalMode.CREATE);

    const onAddMaterialBtnClickHandler = () => {
        setModalMode(ModalMode.CREATE);
        setIsModalOpen(true);
    };

    const onCopyMaterialModeBtnClickHandler = () => {
        setCopyMaterialMode((prev=>!prev));
    };

    const onModalClose = useCallback(() => {
        setIsModalOpen(false);
        dispatch(materialToOrderSliceActions.resetForm());
    },[dispatch]);

    const onModalOpen = useCallback(()=>{
        setIsModalOpen(true);
        setModalMode(ModalMode.UPDATE);
    },[]);

    return (
        <VStack gap={'12px'} max className={classNames(cls.OrderMaterials, {}, [className])}>
            <HStack justify={'start'} gap={'32px'} max={true}>
                <h4>Материалы для заказа</h4>
                {
                    editMode &&
                    <HStack gap={'12px'} className={cls.materialBtnBlock}>
                        <Button
                            onClick={onCopyMaterialModeBtnClickHandler}
                            size={ButtonSize.SIZE_S}
                        >
                            Копировать материал
                        </Button>
                        <Button
                            onClick={onAddMaterialBtnClickHandler}
                            size={ButtonSize.SIZE_S}
                        >
                            Добавить материал
                        </Button>
                    </HStack>

                }
            </HStack>
            <OrderMaterialsTable onOpen={onModalOpen} copyMaterialMode={copyMaterialMode}/>
            <AddMaterialToOrderModal isOpen={isModalOpen} onClose={onModalClose} mode={modalMode}/>
        </VStack>
    );
});

OrderMaterials.displayName = 'OrderMaterials';