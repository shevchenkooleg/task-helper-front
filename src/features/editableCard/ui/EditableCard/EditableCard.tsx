import { memo, ReactNode } from 'react';
import { EditableCardHeaders } from '../EditableCardHeaders/EditableCardHeaders';
import { VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Loader } from '@/shared/ui/Loader';

interface EditableCardProps {
    className?: string
    children: ReactNode
    onBackClick?: () => void
    onEditClick?: () => void
    onDeleteClick?: () => void
    onSaveClick?: () => void
    onCancelClick?: () => void
    reducer: ReducerList
    isLoading?: boolean
    editMode?: boolean
    removeAfterUnmount?: boolean
}

export const EditableCard = memo((props: EditableCardProps) => {
    const { className, children, onEditClick, onBackClick, onSaveClick,
        onCancelClick, onDeleteClick, reducer, isLoading, editMode, removeAfterUnmount = true } = props;

    if (reducer){
        return (
            <DynamicModuleLoader reducers={reducer} removeAfterUnmount={removeAfterUnmount}>
                <VStack gap={'8px'} max>
                    <EditableCardHeaders
                        editMode={editMode}
                        onBackClick={onBackClick}
                        onCancelClick={onCancelClick}
                        onDeleteClick={onDeleteClick}
                        onEditClick={onEditClick}
                        onSaveClick={onSaveClick}
                        isLoading={isLoading}
                        className={className}
                    />
                    {isLoading ? <Loader/> : children}
                </VStack>
            </DynamicModuleLoader>
        );
    }

    return (
        <></>
    );
});

EditableCard.displayName = 'EditableCard';