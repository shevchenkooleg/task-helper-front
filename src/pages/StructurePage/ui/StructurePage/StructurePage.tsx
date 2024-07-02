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
import { useSelector } from 'react-redux';
import { getStructure } from '../..';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { fetchParentForNewUnit } from '@/features/addNewUnit';
import { Unit } from '@/entities/Unit';

interface StructurePageProps {
    className?: string
}

const StructurePage = (props: StructurePageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getUnitList({ 'nestingLevel':'0' }));
    },[dispatch]);

    const reducers: ReducerList = {
        structure: StructurePageReducer
    };

    const structure = useSelector(getStructure);
    const childKeysList = (structure && Object.keys(structure).filter(el=>el!=='null'));
    const mainParents = structure && structure['null'];


    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

    const onModalClose = useCallback(() => {
        console.log('request order because modal close');
        setIsNewOrderModalOpen(false);
    },[]);

    const onAddUnitBtnClickHandler = useCallback(() => {
        setIsNewOrderModalOpen(true);
    },[]);

    const [request, setRequest] = useState('');

    const onSearchButtonClick = useCallback(() => {
        console.log('request ', request);
        dispatch(fetchParentForNewUnit(request));
    },[dispatch, request]);

    const onElementClick = useCallback((parentId: string) => {
        dispatch(getUnitList({ 'parentId': parentId ?? '' }));
    },[dispatch]);

    console.log('structure ', structure);
    const structureKeys = structure && Object.keys(structure);
    console.log(structureKeys);

    interface StructureElementPropsInterface {
        data: Unit[]
        child?: string[]
    }

    const StructureElement = memo((props: StructureElementPropsInterface) => {

        const { data , child } = props;

        console.log(child);
        console.log('yoyoyo');

        return (
            <VStack max gap={'16px'} align={'start'} className={cls.structure}>
                {data?.map((unit)=>{
                    return (
                        <div key={unit._id}>
                            <div  onClick={()=> {
                                unit._id && onElementClick(unit._id);
                            }}>{unit.unitName}</div>
                            {child && structure && <div>
                                <StructureElement data={structure[child.filter(el=>unit._id === el)[0]]} child={childKeysList}/>
                            </div>}
                        </div>
                    );
                })}
            </VStack>
        );
    });

    StructureElement.displayName = 'StructureElement';

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack className={cls.layout} max align={'start'}>
                <StructurePageToolsPanel addUnitCallback={onAddUnitBtnClickHandler}/>
                <Page data-testid={'StructurePage'} className={classNames(cls.StructurePage, {}, [className])}>
                    <VStack align={'start'} max>
                        <HStack gap={'8px'}>
                            <Input value={request} onChange={(newValue)=>setRequest(newValue)}/>
                            <Button onClick={onSearchButtonClick}>Search</Button>
                        </HStack>
                        <StructureElement data={mainParents ?? []} child={childKeysList}/>
                        <AddNewUnitModal isOpen={isNewOrderModalOpen} onClose={onModalClose}/>
                    </VStack>
                </Page>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(StructurePage);