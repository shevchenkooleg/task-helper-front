import cls from './ReportsPageLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';


import { ReportPanelContentMode } from '../../model/types/reportsPage';
import { MaterialsReportPage } from '../MaterialsReportsPage/MaterialsReportPage';



interface ReportsPageLayoutProps {
    className?: string
    contentMode?: ReportPanelContentMode
}

export const ReportsPageLayout = memo((props: ReportsPageLayoutProps) => {
    const { className, contentMode = ReportPanelContentMode.ORDERS_REPORTS } = props;


    if (contentMode === ReportPanelContentMode.MATERIALS_REPORTS){
        return <MaterialsReportPage/>;
    }
    

    return (
        <div className={classNames(cls.ReportsPageLayout, {}, [className])}>
                OrdersReport
        </div>
    );
});

ReportsPageLayout.displayName = 'ReportsPageLayout';