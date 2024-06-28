import cls from './OrderDetailsPageToolPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { orderDetailsCardSelectorBtn, OrderDetailsCardView } from '@/shared/const/orderDetailsConsts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getOrderDetailsCardView, orderDetailsSliceActions } from '@/entities/Order';
import { useSelector } from 'react-redux';

interface OrderDetailsPageToolBarProps {
    className?: string
    onBackClick?: () => void
    onEditClick?: () => void
    onSaveClick?: () => void
    onCancelClick?: () => void
    isLoading?: boolean
    editMode?: boolean
}

export const OrderDetailsPageToolPanel = memo((props: OrderDetailsPageToolBarProps) => {

    const { className, editMode, onCancelClick,
        onBackClick, onEditClick, onSaveClick,
        isLoading = false } = props;

    const dispatch = useAppDispatch();
    const currenView = useSelector(getOrderDetailsCardView);

    const setOrderDetailsView = (newView: OrderDetailsCardView) => {
        dispatch(orderDetailsSliceActions.setOrderDetailsCardView(newView));
    };


    return (
        <VStack gap={'32px'} max className={classNames(cls.OrderDetailsPageToolBar, { }, [className])}>
            <VStack gap={'12px'}>
                { orderDetailsCardSelectorBtn.map((btn)=> {
                    return (
                        <Button
                            theme={currenView === btn.value ? ButtonTheme.BACKGROUND : ButtonTheme.OUTLINE}
                            key={btn.value}
                            size={ButtonSize.SIZE_S}
                            trimPadding={false}
                            rounded={true}
                            className={cls.btn}
                            disabled={editMode}
                            onClick={()=>setOrderDetailsView(btn.value as OrderDetailsCardView)}
                        >
                            {btn.content}
                        </Button>
                    );
                })
                }
            </VStack>
            {
                editMode
                    ? <VStack max justify={'between'} gap={'32px'}>
                        <VStack gap={'12px'}>
                            <Button
                                theme={ButtonTheme.OUTLINE_GREEN}
                                size={ButtonSize.SIZE_S}
                                onClick={onSaveClick}
                                disabled={isLoading}
                                className={cls.btn}
                                rounded={true}
                            >
                                {'Сохранить'}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancelClick}
                                size={ButtonSize.SIZE_S}
                                disabled={isLoading}
                                className={cls.btn}
                                rounded={true}
                            >
                                {'Отменить'}
                            </Button>
                        </VStack>
                    </VStack>
                    :
                    <VStack gap={'12px'} justify={'start'} align={'start'}>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onBackClick}
                            size={ButtonSize.SIZE_S}
                            disabled={isLoading}
                            rounded={true}
                            className={cls.btn}
                        >
                            {'Назад к списку'}
                        </Button>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEditClick}
                            size={ButtonSize.SIZE_S}
                            disabled={isLoading}
                            rounded={true}
                            className={cls.btn}
                        >
                            {'Редактировать'}
                        </Button>
                    </VStack>

            }

        </VStack>
    );
});

OrderDetailsPageToolPanel.displayName = 'OrderDetailsPageToolPanel';