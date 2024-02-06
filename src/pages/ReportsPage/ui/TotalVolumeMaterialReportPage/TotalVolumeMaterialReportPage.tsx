import cls from './TotalVolumeMaterialReportPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getReportPageSettings, getTotalVolumeMaterialReportData } from '../..';
import { TableGrid } from '@/shared/ui/TableGrid';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { totalVolumeMaterialReportKeysArr } from '@/shared/const/reportConsts';
import { MaterialToReportTab } from '@/entities/Material';
import {
    fetchOrdersWithExecMaterialId
} from '../../model/services/fetchOrdersWithExecMaterialId/fetchOrdersWithExecMaterialId';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { reportsPageSliceActions } from '../../model/slice/reportsPageSlice';
import { getRouteMaterialInvolvementReport } from '@/shared/const/router';

interface TotalVolumeMaterialReportPageProps {
    className?: string
}

export const TotalVolumeMaterialReportPage = (props: TotalVolumeMaterialReportPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const reportData = useSelector(getTotalVolumeMaterialReportData);
    const navigate = useNavigate();
    const yearOfExecutionForReport = useSelector(getReportPageSettings)?.reportYear ?? '2025';
    const userId = useSelector(getUserAuthData);
    console.log(reportData);

    const onMaterialTableClick = useCallback((i: MaterialToReportTab)=>{
        console.log(i._id);
        userId && i._id && dispatch(fetchOrdersWithExecMaterialId({ materialId: i._id, yearOfExecution: yearOfExecutionForReport, userId: userId })).then(({ payload })=>{
            console.log(payload);
            Array.isArray(payload) && dispatch(reportsPageSliceActions.setOrdersWithExecMaterialIdReport(payload));
            navigate(getRouteMaterialInvolvementReport());
        });

    },[dispatch, navigate, userId, yearOfExecutionForReport]);




    if (reportData){
        return (
            <VStack className={cls.layout}>
                <Page data-testid={'TotalVolumeMaterialReportPage'} className={classNames(cls.TotalVolumeMaterialReportPage, {}, [className])} max={true}>
                    <VStack max={true} gap={'8px'} align={'start'}  className={classNames(cls.ReportsPage, {}, [className])}>
                        TotalVolumeMaterialReportPage
                        <TableGrid
                            items={reportData}
                            tabKeys={totalVolumeMaterialReportKeysArr}
                            template = 'totalVolumeMaterialReportTemplate'
                            callback={(e,i)=>onMaterialTableClick(i)}
                        />
                    </VStack>
                </Page>
            </VStack>
        );
    }

    return <div>111</div>;
};

export default memo(TotalVolumeMaterialReportPage);