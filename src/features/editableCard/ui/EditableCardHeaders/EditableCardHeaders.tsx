import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button, ButtonTheme } from '@/shared/ui/Button';

interface EditableCardHeadersProps {
    className?: string
    onBackClick?: () => void
    onEditClick?: () => void
    onDeleteClick?: () => void
    onSaveClick?: () => void
    onCancelClick?: () => void
    isLoading?: boolean
    editMode?: boolean
}

export const EditableCardHeaders = memo((props: EditableCardHeadersProps) => {
    const { className, editMode, onCancelClick, onBackClick, onEditClick, onDeleteClick, onSaveClick, isLoading } = props;

    if (editMode){
        return (
            <HStack justify={'between'} max className={classNames('', {}, [className])}>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onDeleteClick}
                    disabled={isLoading}
                >
                    {'Удалить карточку'}
                </Button>
                <HStack gap={'16px'}>
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
            </HStack>
        );
    }

    return (
        <HStack justify={'between'} max className={classNames('', {}, [className])}>
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
    );
});

EditableCardHeaders.displayName = 'EditableCardHeaders';