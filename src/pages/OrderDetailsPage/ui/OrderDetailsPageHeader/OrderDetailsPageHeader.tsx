import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { memo, useCallback } from 'react';
import { getRouteOrderEdit, getRouteOrders } from '@/shared/const/router';
import { useNavigate } from 'react-router-dom';

interface OrderDetailsPageHeaderProps {
    className?: string
    orderId?: string
}

export const OrderDetailsPageHeader = memo((props: OrderDetailsPageHeaderProps) => {
    const { className, orderId } = props;
    const navigate = useNavigate();


    const onBackToList = useCallback(() => {
        navigate(getRouteOrders());
    }, [navigate]);
    const onEditOrderClickHandler = useCallback(() => {
        orderId && navigate(getRouteOrderEdit(orderId));
    }, [navigate, orderId]);

    return (
        <HStack justify={'between'} max className={classNames('', {}, [className])}>
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onBackToList}
            >
                {'Назад к списку'}
            </Button>
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onEditOrderClickHandler}
            >
                {'Редактировать'}
            </Button>
        </HStack>
    );
});

OrderDetailsPageHeader.displayName = 'OrderDetailsPageHeader';