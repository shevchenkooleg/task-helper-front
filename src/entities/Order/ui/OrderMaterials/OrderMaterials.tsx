import cls from './OrderMaterials.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

interface OrderMaterialsProps {
    className?: string
}

export const OrderMaterials = memo((props: OrderMaterialsProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.OrderMaterials, {}, [className])}>
            ORDER MATERIALS
        </div>
    );
});

OrderMaterials.displayName = 'OrderMaterials';