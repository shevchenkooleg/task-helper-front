import cls from './MaterialsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { materialsPageSliceReducer } from '../../model/slice/materialsPageSlice';
import { AddNewMaterialModal } from '@/features/addNewMaterial';

interface MaterialsPageProps {
    className?: string
}

const reducers: ReducerList = {
    materials: materialsPageSliceReducer
};

export const MaterialsPage = memo((props: MaterialsPageProps) => {
    const { className } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onLoadClickHandler = useCallback(() => {
        console.log('loading_materials');
    },[]);

    const onAddMaterialClickHandler = useCallback(()=>{
        setIsModalOpen(true);
    },[]);

    const onModalClose = useCallback(() => {
        setIsModalOpen(false);
    },[]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page data-testid={'OrdersPage'} className={classNames(cls.MaterialsPage, {}, [className])}>
                <VStack align={'start'} gap={'16px'}>
                    <HStack gap={'32px'} justify={'between'}>
                        <div>Material Filters block</div>
                        <Button onClick={onLoadClickHandler}>загрузить материалы</Button>
                        <Button onClick={onAddMaterialClickHandler}>добавить материал</Button>
                    </HStack>
                    {/*<OrdersPageTable orders={ordersList}/>*/}
                    <AddNewMaterialModal isOpen={isModalOpen} onClose={onModalClose}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

MaterialsPage.displayName = 'MaterialsPage';