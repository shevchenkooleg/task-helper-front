import cls from './MaterialsPageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Search } from '@/shared/ui/Search';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { materialsPageSliceActions } from '../../model/slice/materialsPageSlice';

interface MaterialsPageToolsPanelProps {
    className?: string
    addMaterialCallback: () => void
    refreshMaterialsCallback: () => void
}

export const MaterialsPageToolsPanel = memo((props: MaterialsPageToolsPanelProps) => {
    const { className, addMaterialCallback, refreshMaterialsCallback } = props;
    const dispatch = useAppDispatch();
    const searchCallBack = useCallback((item: string)=>{
        dispatch(materialsPageSliceActions.searchInMaterials(item));
    },[dispatch]);

    return (
        <HStack
            gap={'32px'}
            justify={'between'}
            max
            className={classNames(cls.MaterialsPageToolsPanel, {}, [className])}>
            <HStack gap={'32px'}>
                <Text text={'Material Filters block'}/>
                <Search callBack={searchCallBack}/>
            </HStack>
            <HStack gap={'32px'}>
                <Button onClick={refreshMaterialsCallback}>загрузить материалы</Button>
                <Button onClick={addMaterialCallback}>добавить материал</Button>
            </HStack>
        </HStack>
    );
});

MaterialsPageToolsPanel.displayName = 'MaterialsPageToolsPanel';