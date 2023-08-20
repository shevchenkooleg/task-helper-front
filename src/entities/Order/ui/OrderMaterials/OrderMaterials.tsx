import cls from './OrderMaterials.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { OrderMaterialsTable } from '../OrderMaterialsTable/OrderMaterialsTable';
import { VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';

interface OrderMaterialsProps {
    className?: string
}

export const OrderMaterials = memo((props: OrderMaterialsProps) => {
    const { className } = props;
    const editMode = useSelector(getOrderDetailsEditMode);

    return (
        <VStack gap={'32px'} max className={classNames(cls.OrderMaterials, {}, [className])}>
            Материалы для заказа
            {editMode && <Button className={cls.addMaterialBtn}>Добавить материал</Button>}
            <OrderMaterialsTable/>
        </VStack>
    );
});

OrderMaterials.displayName = 'OrderMaterials';