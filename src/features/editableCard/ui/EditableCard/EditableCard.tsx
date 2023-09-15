import { memo, ReactNode } from 'react';
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
    const { children, reducer, isLoading, removeAfterUnmount = true } = props;

    if (reducer){
        return (
            <DynamicModuleLoader reducers={reducer} removeAfterUnmount={removeAfterUnmount}>
                <VStack gap={'8px'} max>
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