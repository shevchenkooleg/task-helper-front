import cls from './AddNewUnitForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { Text, TextSize } from '@/shared/ui/Text/index';
import { HStack, VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AddNewUnitSliceActions, AddNewUnitSliceReducer } from '../../model/slice/addNewUnitSlice';
import { Button, ButtonTheme } from '@/shared/ui/Button/ui/Button';
import { useSelector } from 'react-redux';
import { getNewUnitData } from '../../model/selectors/getNewUnitData/getNewUnitData';
import { UnitType, unitTypeMapper, unitTypeOptions } from '@/shared/const/unitConsts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getValidationError } from '../../model/selectors/getValidationError/getValidationError';
import { MListBox } from '@/shared/ui/Popups';
import { SearchParentUnit } from '../SearchParentUnit/SearchParentUnit';
import { Input } from '@/shared/ui/Input';
import { addNewUnit } from '../../model/services/addNewUnit/addNewUnit';
import { fetchParentForNewUnit, getParentUnitData, getPossibleParentUnits } from '../..';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { Unit } from '@/entities/Unit';



export interface AddNewUnitFormProps {
    className?: string
    onSuccess: () => void
    isOpen?: boolean
}

const AddNewUnitForm = (props: AddNewUnitFormProps) => {
    const { className, onSuccess } = props;
    const dispatch = useAppDispatch();

    const reducers: ReducerList = {
        newUnit: AddNewUnitSliceReducer
    };

    const [query, setQuery] = useState('');
    const validationError = useSelector(getValidationError);
    const newUnit = useSelector(getNewUnitData);
    const newUnitName = newUnit?.unitName ?? '';
    const newUnitType = newUnit?.unitType ?? UnitType.TECHNICAL_PLACE;
    const newUnitParentId = newUnit?.parentId ?? '';
    const parentUnitName = useSelector(getParentUnitData)?.unitName;
    const possibleParentUnits = useSelector(getPossibleParentUnits) ?? [];
    const parentUnitNestingLevel = useSelector(getParentUnitData)?.nestingLevel;
    const nextNestingLevel = parentUnitNestingLevel !== undefined ? parentUnitNestingLevel + 1 : undefined;

    console.log('parentUnitNestingLevel ', parentUnitNestingLevel);
    console.log('nextNestingLevel ', nextNestingLevel);

    const onNewUnitTypeChange = useCallback((newValue: string) => {
        dispatch(AddNewUnitSliceActions.setUnitType(newValue as UnitType));
    },[dispatch]);
    const onNewUnitNameChange = useCallback((newValue: string) => {
        dispatch(AddNewUnitSliceActions.setUnitName(newValue));
    },[dispatch]);

    const onAddBtnClick = useCallback(() => {
        const newUnitData = {
            unitName: newUnitName,
            unitType: newUnitType,
            parentId: newUnitParentId === '' ? null : newUnitParentId,
            nestingLevel: nextNestingLevel
        };
        console.log(newUnitData);
        dispatch(addNewUnit(newUnitData));
        onSuccess();
    },[dispatch, newUnitName, newUnitParentId, newUnitType, nextNestingLevel, onSuccess]);

    useEffect(()=>{
        const status = newUnitName.length > 0 && newUnitType.length > 0;
        dispatch(AddNewUnitSliceActions.setValidationError(!status));},[dispatch, newUnitName.length, newUnitParentId.length, newUnitType.length]);

    const fetchParentUnitForComboBoxHandler = useCallback(() => {
        dispatch(fetchParentForNewUnit(query));
    }, [dispatch, query]);


    const debouncedFetchData = useDebounce(fetchParentUnitForComboBoxHandler, 500);

    useEffect(()=>{
        debouncedFetchData();
    },[debouncedFetchData, query]);

    const onChangeParentForNewUnitComboBoxQuery = useCallback((value: string) => {
        setQuery(value);
    }, []);

    const onChangeNewUnitParentId = useCallback((value: Unit)=>{
        console.log(value);
        dispatch(AddNewUnitSliceActions.setParentUnit(value));
    },[dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <VStack
                gap={'24px'}
                align={'start'}
                className={classNames(cls.AddNewUnitForm, {}, [className])}
            >
                <Text title={'Добавление нового элемента в структуру объекта'}/>
                <HStack gap={'8px'}>
                    <div className={cls.title}>
                        <Text text={'Наименование элемента'}/>
                    </div>
                    <Input
                        value={newUnit?.unitName ?? ''}
                        width={'242'}
                        onChange={onNewUnitNameChange}
                        fontSize={TextSize.SIZE_M}
                    />
                </HStack>
                <HStack gap={'8px'}>
                    <div className={cls.title}>
                        <Text text={'Тип нового объекта'}/>
                    </div>
                    <MListBox
                        onChange={onNewUnitTypeChange}
                        items={unitTypeOptions}
                        value={ newUnitType ? unitTypeMapper[newUnitType] : ''}
                        width={'242'}
                    />
                </HStack>
                <HStack gap={'8px'} justify={'between'}>
                    <div className={cls.title}>
                        <Text text={'Родительский элемент'}/>
                    </div>
                    <div>
                        <SearchParentUnit
                            value={parentUnitName}
                            query={query}
                            unitList={possibleParentUnits}
                            setQuery={onChangeParentForNewUnitComboBoxQuery}
                            callback={onChangeNewUnitParentId}
                        />
                    </div>
                </HStack>
                <HStack>
                    <Button
                        theme={ButtonTheme.BACKGROUND_GREEN}
                        rounded
                        disabled={validationError}
                        onClick={onAddBtnClick}
                    >
                        Добавить элемент
                    </Button>
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(AddNewUnitForm);