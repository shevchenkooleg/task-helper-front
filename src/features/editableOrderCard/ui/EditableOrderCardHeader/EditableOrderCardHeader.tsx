import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { memo, useCallback } from 'react';
import { getRouteOrders } from '@/shared/const/router';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { orderDetailsSliceActions } from '@/entities/Order';

interface EditableOrderCardHeaderProps {
    className?: string
    orderId?: string
}

export const EditableOrderCardHeader = memo((props: EditableOrderCardHeaderProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const onBackToList = useCallback(() => {
        navigate(getRouteOrders());
    }, [navigate]);
    const onEditOrderClickHandler = useCallback(() => {
        dispatch(orderDetailsSliceActions.toggleEdit());
    }, [dispatch]);

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

EditableOrderCardHeader.displayName = 'EditableOrderCardHeader';