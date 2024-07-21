import cls from './SearchMaintenance.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ComboBox } from '@/shared/ui/Popups/ui/ComboBox/ComboBox';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';

interface SearchMaintenanceProps {
    className?: string
    value?: string
    maintenanceList?: Array<AdminPanelMaintenanceItem>
    query?: string
    setQuery?: (value: string)=>void
    callback?: (item:string)=>void
}

export const SearchMaintenance = memo((props: SearchMaintenanceProps) => {
    const { className , maintenanceList, setQuery,
        callback, query = '', value } = props;

    const maintenanceFullNameList: Array<string> = [];
    maintenanceList?.forEach(el=>el.fullName && maintenanceFullNameList.push(el.fullName));

    // const setMaterialItem = (itemName: string) => {
    //     const item = materialList?.filter(el=>el.materialName === itemName)[0];
    //     callback && item && callback(item);
    // };

    return (
        <ComboBox
            className={classNames(cls.SearchMaintenance, {}, [className])}
            value={value}
            placeholder={'Название ТО'}
            query={query}
            setQuery={setQuery}
            items={maintenanceFullNameList}
            callback={callback}
        />
    );
});

SearchMaintenance.displayName = 'SearchMaintenance';