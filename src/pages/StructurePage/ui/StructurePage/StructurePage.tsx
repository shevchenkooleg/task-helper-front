import cls from './StructurePage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StructurePageReducer } from '../../model/slice/structurePageSlice';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { StructurePageToolsPanel } from '../StructurePageToolsPanel/StructurePageToolsPanel';
import { AddNewUnitModal, AddNewUnitSliceActions } from '@/features/addNewUnit';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUnitList } from '@/features/getMainParentUnits';
import { useSelector } from 'react-redux';
import { getStructure } from '../..';
import { StructureElements } from '../StructureElement/StructureElements';
import { Unit } from '@/entities/Unit';
import { UnitDataCard } from '@/entities/Unit';
import { UnitDetailsSliceReducer } from '@/entities/Unit';
import { Text } from '@/shared/ui/Text';
import { getUnitDetailsFormData } from '@/entities/Unit';
import {
    AddNewMaintenanceToUnitModal
} from '@/features/addMaintenanceToUnit';

interface StructurePageProps {
    className?: string
}

const StructurePage = (props: StructurePageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const structure = useSelector(getStructure);
    const unitDetailsFormData = useSelector(getUnitDetailsFormData);

    useEffect(() => {
        dispatch(getUnitList({ 'nestingLevel': '0' }));
    }, [dispatch]);

    const reducers: ReducerList = {
        structure: StructurePageReducer,
        unitDetails: UnitDetailsSliceReducer
    };

    const mainElements = structure ? structure['null'] : [];


    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [isAddMaintenanceModalOpen, setIsAddMaintenanceModalOpen] = useState(false);

    const onAddUnitModalClose = useCallback(() => {
        console.log('request order because modal close');
        setIsNewOrderModalOpen(false);
        dispatch(AddNewUnitSliceActions.setParentUnit({} as Unit));
    }, [dispatch]);

    const onAddMaintenanceModalClose = useCallback(() => {
        console.log('request order because addMaintenance modal close');
        setIsAddMaintenanceModalOpen(false);
        // dispatch(AddNewUnitSliceActions.setParentUnit({}));
    }, []);

    const onAddUnitBtnClickHandler = useCallback(() => {
        setIsNewOrderModalOpen(true);
    }, []);
    

    const fastAddCallback = useCallback((unitData: Unit) => {
        console.log('fastAddCallback');
        dispatch(AddNewUnitSliceActions.setParentUnit(unitData));
        setIsNewOrderModalOpen(true);
    },[dispatch]);

    const setIsAddMaintenanceModalOpenHandler = useCallback((isOpen: boolean)=>{
        setIsAddMaintenanceModalOpen(isOpen);
    },[]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack className={cls.layout} align={'start'} gap={'12px'}>
                <StructurePageToolsPanel addUnitCallback={onAddUnitBtnClickHandler}/>
                {structure
                    ? <Page data-testid={'StructurePage'} className={classNames(cls.StructurePage, {}, [className])} max>
                        <HStack max gap={'32px'} align={'start'}>
                            <VStack max gap={'12px'} className={cls.dataFrame}>
                                <Text title={'Структура технических объектов'}/>
                                <StructureElements data={mainElements} structure={structure} fastAddCallback={fastAddCallback}/>
                            </VStack>
                            <VStack max gap={'12px'} className={cls.dataFrame}>
                                <Text title={'Сведения об объекте'}/>
                                {unitDetailsFormData?.unitName ? <UnitDataCard setModalOpen={setIsAddMaintenanceModalOpenHandler}/> : <Text text={'Информация о техническом объекте'}/>}
                            </VStack>
                        </HStack>
                        <AddNewUnitModal
                            isOpen={isNewOrderModalOpen}
                            onClose={onAddUnitModalClose}
                        />
                        <AddNewMaintenanceToUnitModal
                            isOpen={isAddMaintenanceModalOpen}
                            onClose={onAddMaintenanceModalClose}
                        />
                    </Page>
                    :
                    null
                }
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(StructurePage);