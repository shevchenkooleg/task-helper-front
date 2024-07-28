import cls from './AddNewMaintenanceToUnitForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { SearchMaintenanceToUnit } from '../SearchMaintenanceToUnit/SearchMaintenanceToUnit';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';


import { fetchMaintenanceForUnitAdd } from '../../model/services/fetchMaintenanceForUnitAdd/fetchMaintenanceForUnitAdd';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AddMaintenanceToUnitActions, AddMaintenanceToUnitReducer } from '../../model/slice/addMaintenanceToUnitSlice';
import { useSelector } from 'react-redux';
import { getMaintenanceToUnitData } from '../../model/selectors/getMaintenanceToUnitData/getMaintenanceToUnitData';
import {
    MaintenancePeriodicity,
    maintenancePeriodicityMapper,
    maintenanceSelectorOptions
} from '@/shared/const/maintenanceConsts';
import { MListBox } from '@/shared/ui/Popups';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';
import { getUnitDetailsFormData, getUnitDetailsFormScheduledMaintenanceList, updateUnitById } from '@/entities/Unit';

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
    const maintenanceList = useSelector(getUnitDetailsFormScheduledMaintenanceList);
    const replaceableMaintenanceIdList = useSelector(getMaintenanceToUnitData)?.replaceableMaintenanceId;

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

    const onMaintenanceClick = useCallback((maintenanceId: string, active: boolean) => {
        if (!active) {
            dispatch(AddMaintenanceToUnitActions.addReplaceableMaintenanceId(maintenanceId));
        }
        else {
            dispatch(AddMaintenanceToUnitActions.deleteReplaceableMaintenanceId(maintenanceId));
        }
    },[]);

    const addMaintenanceToUnitButtonClick = useCallback(async ()=>{

        const maintenanceForDispatch = {
            _id: newMaintenanceData?._id,
            fullName: newMaintenanceData?.fullName ?? '',
            shortName: newMaintenanceData?.shortName ?? '',
            periodicity: newMaintenanceData?.periodicity as MaintenancePeriodicity ?? 'once',
            replaceableMaintenanceId: newMaintenanceData?.replaceableMaintenanceId ?? []
        };

        console.log('maintenanceForDispatch ', maintenanceForDispatch);

        try {
            if (unitId) {
                await dispatch(updateUnitById({ unitId: unitId, updatedUnit: { scheduledMaintenanceList : [maintenanceForDispatch] } }));
                onSuccess();

            }

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
                            {
                                maintenanceList?.map((el,key)=>{
                                    console.log('el ', el);
                                    const activeReplace = replaceableMaintenanceIdList?.includes(el._id!);
                                    console.log('activeReplace ', activeReplace);
                                    return (
                                        <Button
                                            className={classNames('', { [cls.active]: activeReplace }, [])}
                                            key={key}
                                            theme={ButtonTheme.OUTLINE}
                                            rounded
                                            onClick={() => {
                                                el._id && activeReplace !== undefined && onMaintenanceClick(el._id, activeReplace);
                                            }}
                                        >
                                            {el.shortName}
                                        </Button>
                                    );
                                })}
                        </HStack>
                    </HStack>
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