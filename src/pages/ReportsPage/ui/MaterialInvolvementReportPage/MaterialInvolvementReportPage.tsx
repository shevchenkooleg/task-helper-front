import cls from './MaterialInvolvementReportPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';


import { useSelector } from 'react-redux';
import { getMaterialInvolvementReportData } from '../../model/selectors/getMaterialInvolvementReportData/getMaterialInvolvementReportData';
import { TableGrid } from '@/shared/ui/TableGrid';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { MaterialInvolvementReportTabHeaderKeysArr } from '@/shared/const/reportConsts';
import { MaterialInvolvementReportData } from '../../model/types/reportsPage';
import {
    fetchOrdersWithExecMaterialId
} from '../../model/services/fetchOrdersWithExecMaterialId/fetchOrdersWithExecMaterialId';
import { reportsPageSliceActions } from '../../model/slice/reportsPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { getRouteOrderDetails } from '@/shared/const/router';

interface MaterialInvolvementReportPageProps {
    className?: string
}

export const MaterialInvolvementReportPage = (props: MaterialInvolvementReportPageProps) => {
    const { className } = props;
    const report = useSelector(getMaterialInvolvementReportData);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const materialId = location.state && location.state.materialId || searchParams.get('materialId') || '123456789';
    const materialName = location.state && location.state.materialName || searchParams.get('materialId') || '123456789';
    const userId = location.state && location.state.userId || searchParams.get('userId') || '101010101';
    const reportYear = location.state && location.state.reportYear || searchParams.get('reportYear') || '1987';

    useEffect(()=>{
        console.log('material ', materialId);
        userId && materialId && dispatch(fetchOrdersWithExecMaterialId({ materialId: materialId, yearOfExecution: reportYear, userId: userId })).then(({ payload })=> {
            console.log('payload ', payload);
            const materialInvolvementReportData: Array<MaterialInvolvementReportData> = [];

            Array.isArray(payload) && payload.map((order) => {
                materialInvolvementReportData.push({
                    _id: order._id,
                    orderId: order.orderId,
                    description: order.description,
                    yearOfExecution: order.yearOfExecution,
                    materials: [...order.materials!.filter(m => m.materialId === materialId)],
                    orderType: order.orderType,
                    orderExecutionType: order.orderExecutionType
                });
            });
            materialInvolvementReportData.forEach(order => order.materials?.map(m => m.materialName = materialName));

            const params = {
                ['materialId']: materialId,
                ['materialName']: materialName,
                ['reportYear']: reportYear,
                ['userId']: userId
            };
            addQueryParams(params);

            // Array.isArray(payload) && dispatch(reportsPageSliceActions.setMaterialInvolvementReportData(payload));
            dispatch(reportsPageSliceActions.setMaterialInvolvementReportData(materialInvolvementReportData));
        });
    },[dispatch, materialId, materialName, reportYear, userId]);

    const onOrderRowDoubleClick = useCallback((i: MaterialInvolvementReportData)=>{
        i._id && navigate(getRouteOrderDetails(i._id));
    },[navigate]);

    console.log('report ', report);

    return (
        <VStack className={cls.layout}>
            <Page data-testid={'MaterialInvolvementReportPage'} className={classNames(cls.MaterialInvolvementReportPage, {}, [className])} max={true}>
                <VStack max={true} gap={'8px'} align={'start'}  className={classNames(cls.ReportsPage, {}, [className])}>
                    MaterialInvolvementReportPage
                    {report && <TableGrid<MaterialInvolvementReportData, null, null>
                        items={report}
                        tabKeys={MaterialInvolvementReportTabHeaderKeysArr}
                        template={'materialInvolvementReportTemplate'}
                        callback={(e,i)=>onOrderRowDoubleClick(i)}
                    />
                    }
                </VStack>
            </Page>
        </VStack>
    );
};

export default memo(MaterialInvolvementReportPage);