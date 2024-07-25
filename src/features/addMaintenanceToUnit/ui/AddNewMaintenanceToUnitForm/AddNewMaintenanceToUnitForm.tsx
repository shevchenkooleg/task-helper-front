import cls from './AddNewMaintenanceToUnitForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import {
    SearchMaintenanceToUnit
} from '../SearchMaintenanceToUnit/SearchMaintenanceToUnit';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';


import {
    fetchMaintenanceForUnitAdd
} from '../../model/services/fetchMaintenanceForUnitAdd/fetchMaintenanceForUnitAdd';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AddMaintenanceToUnitActions, AddMaintenanceToUnitReducer } from '../../model/slice/addMaintenanceToUnitSlice';
import { useSelector } from 'react-redux';
import {
    getMaintenanceToUnitData
} from '../../model/selectors/getMaintenanceToUnitData/getMaintenanceToUnitData';
import {
    MaintenancePeriodicity,
    maintenancePeriodicityMapper,
    maintenanceSelectorOptions
} from '@/shared/const/maintenanceConsts';
import { MListBox } from '@/shared/ui/Popups';
import { Button } from '@/shared/ui/Button';
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';
import { getUnitDetailsFormData } from '@/entities/Unit';
import { updateUnitById } from '@/entities/Unit';

export interface AddNewMaintenanceToUnitFormProps {
    className?: string
    onSuccess: () => void
    isOpen?: boolean
}

const AddNewMaintenanceToUnitForm = memo((props: AddNewMaintenanceToUnitFormProps) => {
    const { className , onSuccess } = props;
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();

    const initialReducer = {
        addMaintenanceToUnit: AddMaintenanceToUnitReducer
    };

    const newMaintenanceData = useSelector(getMaintenanceToUnitData);
    const isLoading = useSelector(getIsLoading);
    const unitId = useSelector(getUnitDetailsFormData)?._id;

    const fetchMaintenanceForUnitComboBoxHandler = useCallback(() => {
        dispatch(fetchMaintenanceForUnitAdd(query));
    }, [dispatch, query]);

    const debouncedFetchData = useDebounce(fetchMaintenanceForUnitComboBoxHandler, 500);

    useEffect(()=>{
        debouncedFetchData();
    },[debouncedFetchData, query]);

    const onChangeMaintenanceComboBoxQuery = useCallback((value: string) => {
        setQuery(value);
    }, []);

    const onNewMaintenancePeriodicityChange = useCallback((newPeriodicity: string) => {
        dispatch(AddMaintenanceToUnitActions.setNewMaintenancePeriodicity(newPeriodicity as MaintenancePeriodicity));
    },[dispatch]);

    const setSelectedMaintenanceData = useCallback((selectedMaintenanceData: AdminPanelMaintenanceItem)=>{
        dispatch(AddMaintenanceToUnitActions.setSelectedMaintenanceBasicData(selectedMaintenanceData));
    },[dispatch]);

    const addMaintenanceToUnitButtonClick = useCallback(async ()=>{

        const maintenanceForDispatch = {
            _id: newMaintenanceData?._id,
            fullName: newMaintenanceData?.fullName ?? '',
            shortName: newMaintenanceData?.shortName ?? '',
            periodicity: newMaintenanceData?.periodicity as MaintenancePeriodicity ?? 'once',
            replaceableMaintenance: newMaintenanceData?.replaceableMaintenanceId ?? []
        };

        try {
            // await dispatch(UnitDetailsSliceActions.setScheduledMaintenanceListItem(maintenanceForDispatch));
            if (unitId) {
                await dispatch(updateUnitById({ unitId: unitId, updatedUnit: { scheduledMaintenanceList : [maintenanceForDispatch] } }));
                onSuccess();
                // if (updatedUnit.payload && typeof updatedUnit.payload !== 'string'){
                //     dispatch(getUnitList({ 'parentId': updatedUnit.payload.parentId ?? '' }));
                // }
                // updatedUnit.payload && typeof updatedUnit.payload !== 'string' && dispatch(StructurePageActions.updateStructureItems(updatedUnit.payload));
                // await dispatch(fetchUnitById(unitId));
                // await onSuccess();

            }
            // await dispatch(getMaintenanceForAdminPanel(null));

        } catch (e) {
            console.log(e);
        }
    },[dispatch, newMaintenanceData?._id, newMaintenanceData?.fullName, newMaintenanceData?.periodicity, newMaintenanceData?.replaceableMaintenanceId, newMaintenanceData?.shortName, onSuccess, unitId]);


    return (
        <DynamicModuleLoader reducers={initialReducer}>
            <VStack gap={'12px'} max align={'start'} className={classNames(cls.AddNewMaintenanceToUnitForm, {}, [className])}>
                <SearchMaintenanceToUnit
                    value={newMaintenanceData?.fullName}
                    query={query}
                    setQuery={onChangeMaintenanceComboBoxQuery}
                    callback={setSelectedMaintenanceData}
                />
                <HStack gap={'8px'}>
                    <div>Периодичность ТО:</div>
                    <MListBox
                        value={newMaintenanceData && newMaintenanceData.periodicity && maintenancePeriodicityMapper[newMaintenanceData?.periodicity] || maintenancePeriodicityMapper.once}
                        onChange={onNewMaintenancePeriodicityChange}
                        items={maintenanceSelectorOptions}
                    />
                </HStack>
                <VStack gap={'8px'} max align={'start'}>
                    <HStack gap={'8px'} max>
                        <div>Заменяемое ТО:</div>
                        <HStack gap={'8px'}>
                            {/*{replaceableList?.map((el,key)=>(<div key={key}>{el.shortName}</div>))}*/}
                        </HStack>
                    </HStack>

                    {/*<SearchMaintenance*/}
                    {/*    value={''}*/}
                    {/*    query={query}*/}
                    {/*    setQuery={onChangeMaintenanceComboBoxQuery}*/}
                    {/*    callback={addMaintainsIntoReplaceableList}*/}
                    {/*    maintenanceList={possibleReplaceableItems}*/}
                    {/*/>*/}
                    <HStack max justify={'end'}>
                        <Button onClick={addMaintenanceToUnitButtonClick} disabled={isLoading}>
                            Добавить
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </DynamicModuleLoader>

    );
});

AddNewMaintenanceToUnitForm.displayName = 'AddNewMaintenanceToUnitForm';

export default AddNewMaintenanceToUnitForm;