import cls from './OrderDetailsPageToolPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { orderDetailsCardSelectorBtn, OrderDetailsCardView } from '@/shared/const/orderDetailsConsts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getOrderDetailsCardView, orderDetailsSliceActions } from '@/entities/Order';
import { useSelector } from 'react-redux';

interface OrderDetailsPageToolBarProps {
    className?: string
    onBackClick?: () => void
    onEditClick?: () => void
    onDeleteClick?: () => void
    onSaveClick?: () => void
    onCancelClick?: () => void
    isLoading?: boolean
    editMode?: boolean
    newDesign?: boolean
}

export const OrderDetailsPageToolPanel = memo((props: OrderDetailsPageToolBarProps) => {

    const { className, editMode, onCancelClick,
        onBackClick, onEditClick,
        onDeleteClick, onSaveClick,
        isLoading, newDesign = false } = props;

    const dispatch = useAppDispatch();
    const currenView = useSelector(getOrderDetailsCardView);

    const setOrderDetailsView = (newView: OrderDetailsCardView) => {
        dispatch(orderDetailsSliceActions.setOrderDetailsCardView(newView));
    };


    if (newDesign){
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
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onDeleteClick}
                                size={ButtonSize.SIZE_S}
                                disabled={isLoading}
                                className={cls.btn}
                            >
                                {'Удалить карточку'}
                            </Button>
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

    }


    return (
        <HStack justify={'between'} max className={classNames(cls.OrderDetailsPageToolBar, { }, [className])}>
            {
                editMode
                    ? <HStack max justify={'between'}>
                        <HStack gap={'24px'}>
                            <Button
                                theme={ButtonTheme.OUTLINE_GREEN}
                                onClick={onSaveClick}
                                disabled={isLoading}
                            >
                                {'Сохранить'}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancelClick}
                                disabled={isLoading}
                            >
                                {'Отменить'}
                            </Button>
                        </HStack>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onDeleteClick}
                            disabled={isLoading}
                        >
                            {'Удалить карточку'}
                        </Button>
                    </HStack>
                    :
                    <HStack gap={'24px'}>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onBackClick}
                            disabled={isLoading}
                        >
                            {'Назад к списку'}
                        </Button>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEditClick}
                            disabled={isLoading}
                        >
                            {'Редактировать'}
                        </Button>
                    </HStack>

            }

        </HStack>
    );

    // return (
    //     <HStack justify={'between'} max className={classNames(cls.OrderDetailsPageToolBar, {}, [className])}>
    //
    //
    //     </HStack>
    // );
});

OrderDetailsPageToolPanel.displayName = 'OrderDetailsPageToolPanel';