import cls from './ReportsPageLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';


import { ReportPanelActiveTabValues, ReportPanelContentType } from '../../model/types/reportsPage';
import { MaterialsReportPage } from '../MaterialsReportsPage/MaterialsReportPage';
import { useSearchParams } from 'react-router-dom';
import { TotalVolumeMaterialReportPage } from '../../index';
import { MaterialInvolvementReportPage } from '../../index';



interface ReportsPageLayoutProps {
    className?: string
    activeTab?: ReportPanelActiveTabValues
}

export const ReportsPageLayout = memo((props: ReportsPageLayoutProps) => {
    const { className, activeTab = ReportPanelActiveTabValues.ORDERS_REPORTS } = props;
    
    const [searchParams] = useSearchParams();
    const contentType = searchParams.get('content-type');

    console.log(contentType);

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