import cls from './AddNewMaintenanceForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addNewMaintenanceActions, addNewMaintenanceReducer } from '../../model/slice/addNewMaintenanceSlice';
import { MListBox } from '@/shared/ui/Popups';
import { useSelector } from 'react-redux';
import { getNewMaintenanceData, getNewMaintenancePeriodicity, getNewMaintenanceReplaceableList } from '../..';
import {
    MaintenancePeriodicity,
    maintenancePeriodicityMapper,
    maintenanceSelectorOptions
} from '@/shared/const/maintenanceConsts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SearchMaintenance } from '../SearchMaintenance/SearchMaintenance';


import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import {
    fetchMaintenanceForComboBox
} from '../../model/services/fetchMaintenanceForComboBox/fetchMaintenanceForComboBox';
import { Button } from '@/shared/ui/Button';
import { addNewMaintenance } from '../../model/services/addNewMaintenance/addNewMaintenance';
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading';
// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { getMaintenanceForAdminPanel } from '@/features/getAdminPanelData';
import {
    getPossibleReplaceableItems
} from '../../model/selectors/getPossibleReplaceableItems/getPossibleReplaceableItems';

export interface AddNewMaintenanceFormProps {
    className?: string
    onSuccess: () => void
    isOpen?: boolean

}

const AddNewMaintenanceForm = memo((props: AddNewMaintenanceFormProps) => {
    const { className , onSuccess } = props;

    const initialReducer: ReducerList = {
        newMaintenance: addNewMaintenanceReducer
    };

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getIsLoading);
    const newMaintenanceData = useSelector(getNewMaintenanceData);
    const maintenancePeriodicity = useSelector(getNewMaintenancePeriodicity);
    const replaceableList = useSelector(getNewMaintenanceReplaceableList);
    const possibleReplaceableItems = useSelector(getPossibleReplaceableItems);
    // useEffect(() => {
    // dispatch(addNewMaintenanceActions.setReplaceableMaintenanceItem(replaceableList?.filter(el=>el.fullName === )));
    // }, [replaceableList]);

    console.log('replaceableList ', replaceableList);
    const [query, setQuery] = useState('');

    const onNewMaintenancePeriodicityChange = useCallback((newPeriodicity: string) => {
        dispatch(addNewMaintenanceActions.setNewMaintenancePeriodicity(newPeriodicity as MaintenancePeriodicity));
    },[dispatch]);

    const onFullNameChange = useCallback((newValue: string) => {
        dispatch(addNewMaintenanceActions.setNewMaintenanceFullName(newValue));
    },[dispatch]);

    const onShortNameChange = useCallback((newValue: string) => {
        dispatch(addNewMaintenanceActions.setNewMaintenanceShortName(newValue));
    },[dispatch]);

    const fetchMaintenanceForComboBoxHandler = useCallback(() => {
        dispatch(fetchMaintenanceForComboBox(query));
    }, [dispatch, query]);

    const debouncedFetchData = useDebounce(fetchMaintenanceForComboBoxHandler, 500);

    useEffect(()=>{
        debouncedFetchData();
    },[debouncedFetchData, query]);

    const onChangeMaintenanceComboBoxQuery = useCallback((value: string) => {
        setQuery(value);
    }, []);

    const addMaintainsIntoReplaceableList = useCallback((newItem: any) => {
        const item = possibleReplaceableItems?.filter(el=>el.fullName === newItem)[0];
        item && dispatch(addNewMaintenanceActions.setReplaceableMaintenanceItem(item));
    },[dispatch, possibleReplaceableItems]);

    const onAddMaintenanceButtonClick = useCallback(async ()=>{

        const maintenanceForDispatch = {
            fullName: newMaintenanceData?.fullName ?? '',
            shortName: newMaintenanceData?.shortName ?? '',
            periodicity: newMaintenanceData?.periodicity ?? 'once',
            replaceableMaintenance: newMaintenanceData?.replaceableMaintenanceId ?? []
        };

        try {
            await dispatch(addNewMaintenance(maintenanceForDispatch));
            await onSuccess();
            await dispatch(getMaintenanceForAdminPanel(null));

        } catch (e) {
            console.log(e);
        }
    },[dispatch, newMaintenanceData?.fullName, newMaintenanceData?.periodicity, newMaintenanceData?.replaceableMaintenanceId, newMaintenanceData?.shortName, onSuccess]);

    return (
        <DynamicModuleLoader reducers={initialReducer}>
            <VStack gap={'8px'} className={classNames(cls.AddNewMaintenanceForm, {}, [className])}>
                <Text title={'Добавление вида технического обслуживания'}/>
                <VStack gap={'8px'} align={'start'} max>
                    <Input
                        placeholder={'Полное наименование'}
                        value={newMaintenanceData?.fullName ?? ''}
                        onChange={onFullNameChange}
                    />
                    <Input
                        placeholder={'Краткое наименование'}
                        value={newMaintenanceData?.shortName ?? ''}
                        onChange={onShortNameChange}
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
                                {replaceableList?.map((el,key)=>(<div key={key}>{el.shortName}</div>))}
                            </HStack>
                        </HStack>

                        <SearchMaintenance
                            value={''}
                            query={query}
                            setQuery={onChangeMaintenanceComboBoxQuery}
                            callback={addMaintainsIntoReplaceableList}
                            maintenanceList={possibleReplaceableItems}
                        />
                    </VStack>
                    <HStack max justify={'end'}>
                        <Button onClick={onAddMaintenanceButtonClick} disabled={isLoading}>
                            Добавить
                        </Button>
                    </HStack>
                </VStack>

            </VStack>
        </DynamicModuleLoader>
    );
});

AddNewMaintenanceForm.displayName = 'AddNewMaintenanceForm';

export default AddNewMaintenanceForm;