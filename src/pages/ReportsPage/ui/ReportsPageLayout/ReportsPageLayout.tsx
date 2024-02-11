import cls from './ReportsPageLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';


import { ReportPanelActiveTabValues, ReportPanelContentType } from '../../model/types/reportsPage';
import { MaterialsReportPage } from '../MaterialsReportsPage/MaterialsReportPage';
import { TotalVolumeMaterialReportPage } from '../../index';
import { MaterialInvolvementReportPage } from '../../index';



interface ReportsPageLayoutProps {
    className?: string
    activeTab?: ReportPanelActiveTabValues
    contentType?: ReportPanelContentType
}

export const ReportsPageLayout = memo((props: ReportsPageLayoutProps) => {
    const { className, activeTab = ReportPanelActiveTabValues.ORDERS_REPORTS, contentType = 'report-page' } = props;

    if (contentType === ReportPanelContentType.TOTAL_VOLUME_MATERIAL_REPORT){
        return <TotalVolumeMaterialReportPage/>;
    }

    if (contentType === ReportPanelContentType.MATERIAL_INVOLVEMENT_REPORT){
        return <MaterialInvolvementReportPage/>;
    }

    if (activeTab === ReportPanelActiveTabValues.MATERIALS_REPORTS){
        return <MaterialsReportPage/>;
    }
    

    return (
        <div className={classNames(cls.ReportsPageLayout, {}, [className])}>
                OrdersReport
        </div>
    );
});

ReportsPageLayout.displayName = 'ReportsPageLayout';