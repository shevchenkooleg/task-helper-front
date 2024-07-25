import cls from './SearchMaintenanceToUnit.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ComboBox } from '@/shared/ui/Popups/ui/ComboBox/ComboBox';
import { useSelector } from 'react-redux';
import {
    getPossibleMaintenanceList
} from '../../model/selectors/getPossibleMaintenanceList/getPossibleMaintenanceList';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';

interface SearchMaintenanceToUnitProps {
    className?: string
    query: string
    setQuery?: (value: string)=>void
    callback: (selectedMaintenanceData: AdminPanelMaintenanceItem) => void
    value?: string
}

export const SearchMaintenanceToUnit = memo((props: SearchMaintenanceToUnitProps) => {
    const { className,query , setQuery, callback , value } = props;

    const possibleMaintenanceList = useSelector(getPossibleMaintenanceList);
    const possibleMaintenanceFullNameList: Array<string> = [];
    possibleMaintenanceList?.forEach(el=>el.fullName && possibleMaintenanceFullNameList.push(el.fullName));
    // possibleMaintenanceList.push(useSelector(getPossibleMaintenanceList)?.map(el=>el.fullName));
    console.log('possibleMaintenanceList ', possibleMaintenanceFullNameList);

    const onElementSelectHandler = (selectedMaintenanceFullName: string) => {
        const selectedMaintenance = possibleMaintenanceList?.filter(el=>el.fullName === selectedMaintenanceFullName)[0];
        selectedMaintenance && callback(selectedMaintenance);
    };

    return (
        <ComboBox
            className={classNames(cls.SearchMaintenanceToUnit, {}, [className])}
            value={value}
            placeholder={'Полное/краткое название ТО:'}
            query={query}
            setQuery={setQuery}
            items={possibleMaintenanceFullNameList}
            width={'282'}
            callback={onElementSelectHandler}
        />
    );
});

SearchMaintenanceToUnit.displayName = 'SearchMaintenanceToUnit';