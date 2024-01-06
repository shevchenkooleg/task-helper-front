import cls from './ReportsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { reportsPageSliceReducer } from '../../model/slice/reportsPageSlice';

interface ReportsPageProps {
    className?: string
}

export const ReportsPage = (props: ReportsPageProps) => {
    const { className } = props;

    const reducers: ReducerList = {
        reports: reportsPageSliceReducer
    };

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames(cls.ReportsPage, {}, [className])}>
                ReportsPage
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ReportsPage);