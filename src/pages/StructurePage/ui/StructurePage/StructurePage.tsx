import cls from './StructurePage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StructurePageReducer } from '../../model/slice/structurePageSlice';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { StructurePageToolsPanel } from '../StructurePageToolsPanel/StructurePageToolsPanel';
import { AddNewUnitModal } from '@/features/addNewUnit';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUnitList } from '@/features/getMainParentUnits';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { fetchParentForNewUnit } from '@/features/addNewUnit';
import { useSelector } from 'react-redux';
import { getStructure } from '../..';
import { StructureElement } from '../StructureElement/StructureElement';

interface StructurePageProps {
    className?: string
}

const StructurePage = (props: StructurePageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const structure = useSelector(getStructure);

    useEffect(() => {
        dispatch(getUnitList({ 'nestingLevel': '0' }));
    }, [dispatch]);

    const reducers: ReducerList = {
        structure: StructurePageReducer
    };
    
    const mainElements = structure ? structure['null'] : [];


    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

    const onModalClose = useCallback(() => {
        console.log('request order because modal close');
        setIsNewOrderModalOpen(false);
    }, []);

    const onAddUnitBtnClickHandler = useCallback(() => {
        setIsNewOrderModalOpen(true);
    }, []);

    const [request, setRequest] = useState('');

    const onSearchButtonClick = useCallback(() => {
        dispatch(fetchParentForNewUnit(request));
    }, [dispatch, request]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack className={cls.layout} max={true} align={'start'}>
                <StructurePageToolsPanel addUnitCallback={onAddUnitBtnClickHandler}/>
                {structure
                    ? <Page data-testid={'StructurePage'} className={classNames(cls.StructurePage, {}, [className])} max>
                        <VStack align={'start'} max>
                            <HStack gap={'8px'} max>
                                <Input value={request} onChange={(newValue) => setRequest(newValue)}/>
                                <Button onClick={onSearchButtonClick}>Search</Button>
                            </HStack>
                            <StructureElement data={mainElements} structure={structure}/>
                            <AddNewUnitModal isOpen={isNewOrderModalOpen} onClose={onModalClose}/>
                        </VStack>
                    </Page>
                    : null}
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(StructurePage);