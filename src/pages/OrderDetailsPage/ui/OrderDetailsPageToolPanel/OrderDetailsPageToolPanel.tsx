import cls from './OrderDetailsPageToolPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button, ButtonTheme } from '@/shared/ui/Button';

interface OrderDetailsPageToolBarProps {
    className?: string
    onBackClick?: () => void
    onEditClick?: () => void
    onDeleteClick?: () => void
    onSaveClick?: () => void
    onCancelClick?: () => void
    isLoading?: boolean
    editMode?: boolean
}

export const OrderDetailsPageToolPanel = memo((props: OrderDetailsPageToolBarProps) => {

    const { className, editMode, onCancelClick, onBackClick, onEditClick, onDeleteClick, onSaveClick, isLoading } = props;
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